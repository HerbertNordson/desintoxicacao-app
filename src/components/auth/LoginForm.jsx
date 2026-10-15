import { useState } from "react";
import { Leaf, LockKeyhole, LoaderCircle } from "lucide-react";

export default function LoginForm({ onSignIn, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [localError, setLocalError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;

    setBusy(true);
    setLocalError("");

    try {
      const result = await onSignIn(email, password);

      if (result?.error) {
        setLocalError(result.error);
      }
    } catch {
      setLocalError("Não foi possível entrar. Tente novamente.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="auth-screen">
      <section className="auth-card">
        <div className="auth-brand">
          <span className="brand-mark">
            <Leaf size={19} />
          </span>
          <span>
            desintox<span>icação</span>
          </span>
        </div>

        <div className="auth-symbol">
          <LockKeyhole size={24} />
        </div>

        <div className="eyebrow">
          <span className="eyebrow-dot" />
          UM ESPAÇO PRIVADO
        </div>

        <h1>Voltem ao essencial.</h1>
        <p>
          Entre com sua conta para registrar sua jornada e acompanhar suas
          práticas.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            autoComplete="username"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="voce@exemplo.com"
          />

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Sua senha"
          />

          {(localError || error) && (
            <div className="auth-error" role="alert">
              {localError || error}
            </div>
          )}

          <button
            className="save-button auth-submit"
            type="submit"
            disabled={busy}
          >
            {busy ? (
              <LoaderCircle size={16} className="spin" />
            ) : (
              <LockKeyhole size={16} />
            )}
            Entrar com segurança
          </button>
        </form>

        <div className="auth-foot">
          <LockKeyhole size={13} />
          Acesso somente para participantes autorizados
        </div>
      </section>
    </main>
  );
}
