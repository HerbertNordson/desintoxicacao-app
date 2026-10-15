import { Check, ChevronRight, Heart } from "lucide-react";
import {
  JOURNEY_LENGTH,
  SPECIAL_DATE,
  motives,
  tasks,
} from "../../config/journey";
import { dateKey, formatDate, getJourneyDates } from "../../utils/dateUtils";
import { hasAnyCheckedTask, isDayComplete } from "../../models/dayModel";

export default function JourneySidebar({
  records,
  selectedIndex,
  onSelectDay,
}) {
  const allDays = getJourneyDates();
  const todayKey = dateKey(new Date());

  return (
    <aside className="sidebar">
      <div className="section-heading">
        <div>
          <div className="card-label">JORNADA</div>
          <h2>Seus 15 dias</h2>
        </div>
        <span className="days-count">{JOURNEY_LENGTH} DIAS</span>
      </div>

      <div className="day-list">
        {allDays.map((date, index) => {
          const key = dateKey(date);
          const record = records[key];
          const checks = record?.checks ?? {};
          const complete = isDayComplete(checks);
          const partial = hasAnyCheckedTask(checks);
          const active = index === selectedIndex;

          return (
            <button
              key={key}
              type="button"
              className={`day-item ${active ? "active" : ""}`}
              onClick={() => onSelectDay(index)}
              aria-current={active ? "date" : undefined}
            >
              <span
                className={`day-status ${
                  complete ? "complete" : partial ? "partial" : ""
                }`}
              >
                {complete ? (
                  <Check size={13} />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </span>

              <span className="day-info">
                <strong>
                  {index === 0
                    ? "Começo da jornada"
                    : index === allDays.length - 1
                      ? "Fechamento"
                      : formatDate(date, { weekday: "short" }).replace(
                          "-feira",
                          "",
                        )}
                </strong>
                <small>
                  {formatDate(date, { day: "numeric", month: "long" })}
                </small>
              </span>

              {key === SPECIAL_DATE && (
                <span className="special-dot" title="Dia especial" />
              )}

              {key === todayKey && <span className="today-label">HOJE</span>}

              {active && <ChevronRight size={16} className="day-chevron" />}
            </button>
          );
        })}
      </div>

      <div className="motives-card">
        <div className="motives-title">
          <span className="motives-icon">
            <Heart size={16} />
          </span>
          <h3>Por que começamos?</h3>
        </div>

        <ul>
          {motives.map((motive) => (
            <li key={motive}>
              <span />
              {motive}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
