import { supabase } from "../supabase";
import { createBlankDay } from "../models/dayModel";

export async function getJourneyRecords(userId, firstDate, lastDate) {
  const [progressResult, journalResult] = await Promise.all([
    supabase
      .from("daily_progress")
      .select("entry_date, checks, updated_at")
      .eq("user_id", userId)
      .gte("entry_date", firstDate)
      .lte("entry_date", lastDate),

    supabase
      .from("daily_journal")
      .select("entry_date, note, gratitude, updated_at")
      .eq("user_id", userId)
      .gte("entry_date", firstDate)
      .lte("entry_date", lastDate),
  ]);

  if (progressResult.error) throw progressResult.error;
  if (journalResult.error) throw journalResult.error;

  const records = {};

  for (const row of progressResult.data ?? []) {
    records[row.entry_date] = {
      ...createBlankDay(),
      checks: row.checks ?? {},
      updatedAt: row.updated_at,
    };
  }

  for (const row of journalResult.data ?? []) {
    records[row.entry_date] = {
      ...(records[row.entry_date] ?? createBlankDay()),
      note: row.note ?? "",
      gratitude: row.gratitude ?? "",
      updatedAt: row.updated_at ?? records[row.entry_date]?.updatedAt ?? null,
    };
  }

  return records;
}

export async function saveDailyProgress(userId, date, checks) {
  const { data, error } = await supabase
    .from("daily_progress")
    .upsert(
      {
        user_id: userId,
        entry_date: date,
        checks,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,entry_date" },
    )
    .select("updated_at")
    .single();

  if (error) throw error;

  return data;
}

export async function saveDailyJournal(userId, date, { note, gratitude }) {
  const { data, error } = await supabase
    .from("daily_journal")
    .upsert(
      {
        user_id: userId,
        entry_date: date,
        note,
        gratitude,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,entry_date" },
    )
    .select("updated_at")
    .single();

  if (error) throw error;

  return data;
}

export async function clearDailyRecord(userId, date) {
  const [progressResult, journalResult] = await Promise.all([
    supabase
      .from("daily_progress")
      .delete()
      .eq("user_id", userId)
      .eq("entry_date", date),

    supabase
      .from("daily_journal")
      .delete()
      .eq("user_id", userId)
      .eq("entry_date", date),
  ]);

  if (progressResult.error) throw progressResult.error;
  if (journalResult.error) throw journalResult.error;
}
