import { Check, LoaderCircle, MessageCircle, Trash2 } from "lucide-react";

export default function JournalCard({
  note,
  gratitude,
  saved,
  saving,
  loading,
  onNoteChange,
  onGratitudeChange,
  onSave,
  onClear,
}) {
  return (
    <div className="journal-card">
      <div className="journal-heading">
        <div className="journal-icon">
          <MessageCircle size={18} />
        </div>
        <div>
          <h3>Diário do propósito</h3>
          <p>Registrem aprendizados, desafios e orações.</p>
        </div>
      </div>

      <label className="field-label" htmlFor="journal">
        Como foi o dia de hoje?
      </label>
      <textarea
        id="journal"
        value={note}
        onChange={(event) => onNoteChange(event.target.value)}
        placeholder="O que Deus falou ao coração de vocês? O que foi difícil? O que gostariam de registrar..."
        rows={4}
      />

      <label className="field-label gratitude-label" htmlFor="gratitude">
        Pelo que somos gratos hoje?
      </label>
      <textarea
        id="gratitude"
        value={gratitude}
        onChange={(event) => onGratitudeChange(event.target.value)}
        placeholder="Uma pequena ou grande coisa pela qual agradecer..."
        rows={2}
      />

      <div className="journal-actions">
        <button
          className="clear-button"
          type="button"
          disabled={saving || loading}
          onClick={onClear}
        >
          <Trash2 size={14} />
          Limpar dia
        </button>

        <div className="save-status">
          {saving
            ? "Salvando..."
            : saved
              ? "Registro sincronizado"
              : "Alterações não salvas"}

          <button
            className="save-button"
            type="button"
            disabled={saving || loading || saved}
            onClick={onSave}
          >
            {saving ? (
              <LoaderCircle size={16} className="spin" />
            ) : (
              <Check size={16} />
            )}
            Salvar registro
          </button>
        </div>
      </div>
    </div>
  );
}
