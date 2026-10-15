import { ChevronLeft, ChevronRight, Moon, Sparkles } from "lucide-react";
import { SPECIAL_DATE } from "../../config/journey";
import { formatDate } from "../../utils/dateUtils";
import TaskList from "../checklist/TaskList";
import JournalCard from "../journal/JournalCard";

export default function DailyView({ viewModel }) {
  const {
    selectedIndex,
    selectedDate,
    selectedKey,
    selectedRecord,
    loading,
    saving,
    noteDraft,
    gratitudeDraft,
    saved,
    selectDay,
    updateCheck,
    saveJournal,
    clearDay,
    updateNoteDraft,
    updateGratitudeDraft,
  } = viewModel;

  const isSpecialDay = selectedKey === SPECIAL_DATE;
  const dayNumber = String(selectedIndex + 1).padStart(2, "0");

  return (
    <div className="daily-column">
      <div className="daily-heading">
        <div>
          <div className="card-label">ACOMPANHAMENTO DIÁRIO</div>
          <h2>
            Dia {dayNumber}{" "}
            <span className="heading-date">
              /{" "}
              {formatDate(selectedDate, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </h2>
        </div>

        <div className="day-navigation">
          <button
            type="button"
            aria-label="Dia anterior"
            disabled={selectedIndex === 0}
            onClick={() => selectDay(selectedIndex - 1)}
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            aria-label="Próximo dia"
            disabled={selectedIndex === 14}
            onClick={() => selectDay(selectedIndex + 1)}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {isSpecialDay && (
        <div className="special-banner">
          <span className="special-banner-icon">
            <Sparkles size={18} />
          </span>
          <div>
            <strong>Dia de consagração</strong>
            <p>
              Sugestão do propósito: somente pão e água neste dia. Ajustem
              conforme suas condições de saúde e convicções; não é necessário
              colocar a saúde em risco.
            </p>
          </div>
        </div>
      )}

      <TaskList
        checks={selectedRecord.checks}
        disabled={loading || saving}
        onUpdateCheck={updateCheck}
      />

      <JournalCard
        note={noteDraft}
        gratitude={gratitudeDraft}
        saved={saved}
        saving={saving}
        loading={loading}
        onNoteChange={updateNoteDraft}
        onGratitudeChange={updateGratitudeDraft}
        onSave={saveJournal}
        onClear={clearDay}
      />
    </div>
  );
}
