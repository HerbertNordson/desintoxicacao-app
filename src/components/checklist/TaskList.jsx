import { Check, CircleCheck } from "lucide-react";
import { tasks } from "../../config/journey";
import { calculateProgress, countCheckedTasks } from "../../models/dayModel";

export default function TaskList({ checks, disabled, onUpdateCheck }) {
  const totalChecked = countCheckedTasks(checks);
  const progress = calculateProgress(checks);

  return (
    <div className="daily-card">
      <div className="daily-card-top">
        <div>
          <h3>Práticas do dia</h3>
          <p>Marquem cada prática conforme forem concluindo.</p>
        </div>
        <span className="task-counter">
          {totalChecked}/{tasks.length}
        </span>
      </div>

      <div className="daily-progress">
        <span style={{ width: `${progress}%` }} />
      </div>

      <div className="task-list">
        {tasks.map((task) => {
          const Icon = task.icon;
          const checked = Boolean(checks?.[task.id]);

          return (
            <label
              key={task.id}
              className={`task-row ${checked ? "task-done" : ""}`}
            >
              <span
                className={`task-icon ${task.optional ? "optional-icon" : ""}`}
              >
                <Icon size={18} />
              </span>

              <span className="task-copy">
                <strong>
                  {task.title}
                  {task.optional && <em> opcional</em>}
                </strong>
                <small>{task.detail}</small>
              </span>

              <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={(event) =>
                  onUpdateCheck(task.id, event.target.checked)
                }
                aria-label={`Marcar ${task.title}`}
              />

              <span className="custom-check">
                <Check size={14} />
              </span>
            </label>
          );
        })}
      </div>

      <div className="daily-card-bottom">
        <span>
          <CircleCheck size={15} />
          Cada pequeno passo conta.
        </span>
        <span>{progress}% concluído</span>
      </div>
    </div>
  );
}
