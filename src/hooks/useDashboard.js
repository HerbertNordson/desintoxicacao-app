import { useCallback, useEffect, useMemo, useState } from "react";
import { JOURNEY_LENGTH } from "../config/journey";
import { createBlankDay, isDayComplete } from "../models/dayModel";
import {
  clearDailyRecord,
  getJourneyRecords,
  saveDailyJournal,
  saveDailyProgress,
} from "../services/journeyService";
import { dateAt, dateKey, getTodayIndex } from "../utils/dateUtils";

export function useDashboard(userId) {
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const todayIndex = getTodayIndex();
    return todayIndex >= 0 ? todayIndex : 0;
  });
  const [noteDraft, setNoteDraft] = useState("");
  const [gratitudeDraft, setGratitudeDraft] = useState("");
  const [saved, setSaved] = useState(true);

  const selectedDate = useMemo(() => dateAt(selectedIndex), [selectedIndex]);

  const selectedKey = dateKey(selectedDate);

  const selectedRecord = records[selectedKey] ?? createBlankDay();

  useEffect(() => {
    let cancelled = false;

    async function loadRecords() {
      setLoading(true);
      setError("");

      try {
        const firstDate = dateKey(dateAt(0));
        const lastDate = dateKey(dateAt(JOURNEY_LENGTH - 1));

        const result = await getJourneyRecords(userId, firstDate, lastDate);

        if (!cancelled) {
          setRecords(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            "Não foi possível carregar seus registros. Confira a conexão e as políticas do Supabase.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (userId) {
      loadRecords();
    } else {
      setRecords({});
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [userId]);

  useEffect(() => {
    setNoteDraft(selectedRecord.note ?? "");
    setGratitudeDraft(selectedRecord.gratitude ?? "");
    setSaved(true);
  }, [
    selectedKey,
    selectedRecord.note,
    selectedRecord.gratitude,
    selectedRecord.updatedAt,
  ]);

  const completedCount = useMemo(
    () =>
      Object.values(records).filter((record) => isDayComplete(record.checks))
        .length,
    [records],
  );

  const updateCheck = useCallback(
    async (taskId, checked) => {
      if (!userId || saving || loading) return;

      const previousRecord = records[selectedKey] ?? createBlankDay();

      const nextChecks = {
        ...previousRecord.checks,
        [taskId]: checked,
      };

      const nextRecord = {
        ...previousRecord,
        checks: nextChecks,
        updatedAt: new Date().toISOString(),
      };

      setRecords((previous) => ({
        ...previous,
        [selectedKey]: nextRecord,
      }));

      setSaving(true);
      setError("");

      try {
        await saveDailyProgress(userId, selectedKey, nextChecks);
      } catch (err) {
        setRecords((previous) => ({
          ...previous,
          [selectedKey]: previousRecord,
        }));

        setError(
          "Não foi possível salvar a marcação. Verifique sua conexão e tente novamente.",
        );
      } finally {
        setSaving(false);
      }
    },
    [userId, saving, loading, records, selectedKey],
  );

  const saveJournal = useCallback(async () => {
    if (!userId || saving || loading) return;

    setSaving(true);
    setError("");

    try {
      const result = await saveDailyJournal(userId, selectedKey, {
        note: noteDraft,
        gratitude: gratitudeDraft,
      });

      setRecords((previous) => ({
        ...previous,
        [selectedKey]: {
          ...(previous[selectedKey] ?? createBlankDay()),
          note: noteDraft,
          gratitude: gratitudeDraft,
          updatedAt: result.updated_at,
        },
      }));

      setSaved(true);
    } catch (err) {
      setError(
        "Não foi possível salvar seu diário. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setSaving(false);
    }
  }, [userId, saving, loading, selectedKey, noteDraft, gratitudeDraft]);

  const clearDay = useCallback(async () => {
    if (!userId || saving || loading) return;

    const confirmed = window.confirm(
      "Quer mesmo limpar as marcações e as anotações deste dia?",
    );

    if (!confirmed) return;

    setSaving(true);
    setError("");

    try {
      await clearDailyRecord(userId, selectedKey);

      setRecords((previous) => {
        const next = { ...previous };
        delete next[selectedKey];
        return next;
      });

      setNoteDraft("");
      setGratitudeDraft("");
      setSaved(true);
    } catch (err) {
      setError("Não foi possível limpar este dia. Tente novamente.");
    } finally {
      setSaving(false);
    }
  }, [userId, saving, loading, selectedKey]);

  const selectDay = useCallback((index) => {
    if (index < 0 || index >= JOURNEY_LENGTH) return;
    setSelectedIndex(index);
  }, []);

  const updateNoteDraft = useCallback((value) => {
    setNoteDraft(value);
    setSaved(false);
  }, []);

  const updateGratitudeDraft = useCallback((value) => {
    setGratitudeDraft(value);
    setSaved(false);
  }, []);

  return {
    records,
    loading,
    saving,
    error,
    selectedIndex,
    selectedDate,
    selectedKey,
    selectedRecord,
    noteDraft,
    gratitudeDraft,
    saved,
    completedCount,
    selectDay,
    updateCheck,
    saveJournal,
    clearDay,
    updateNoteDraft,
    updateGratitudeDraft,
  };
}
