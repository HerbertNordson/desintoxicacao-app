import { ArrowDownRight, Target } from "lucide-react";

export default function OverviewCards({ completedCount }) {
  const percentage = Math.round((completedCount / 15) * 100);

  return (
    <section className="overview-grid">
      <div className="overview-card progress-card">
        <div className="card-label">SEU CAMINHO ATÉ AQUI</div>

        <div className="progress-row">
          <strong>
            {String(completedCount).padStart(2, "0")}
            <small>/15</small>
          </strong>

          <span className="progress-description">
            dias com práticas essenciais
            <br />
            concluídas
          </span>
        </div>

        <div className="overall-track">
          <span style={{ width: `${Math.min(percentage, 100)}%` }} />
        </div>

        <div className="overall-footer">
          <span>Um dia de cada vez.</span>
          <span>{percentage}%</span>
        </div>
      </div>

      <div className="overview-card intention-card">
        <div className="intention-icon">
          <Target size={20} />
        </div>

        <div>
          <div className="card-label">NOSSO FOCO</div>
          <p>
            Buscar direção, cultivar presença e cuidar do que Deus confiou a
            nós.
          </p>
        </div>

        <ArrowDownRight className="intention-arrow" size={20} />
      </div>
    </section>
  );
}
