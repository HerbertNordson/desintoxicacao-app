import { Leaf, ShieldCheck } from "lucide-react";

export default function SetupNotice() {
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
          <ShieldCheck size={25} />
        </div>

        <h1>Falta conectar o banco</h1>
        <p>
          Configure as variáveis do Supabase para ativar o login e a
          persistência na nuvem.
        </p>

        <div className="setup-steps">
          <strong>1.</strong>
          <span>
            Crie um arquivo <code>.env.local</code> na raiz do projeto.
          </span>

          <strong>2.</strong>
          <span>
            Adicione <code>VITE_SUPABASE_URL</code> e{" "}
            <code>VITE_SUPABASE_ANON_KEY</code>.
          </span>

          <strong>3.</strong>
          <span>
            Reinicie o Vite e aplique o SQL em <code>supabase/schema.sql</code>.
          </span>
        </div>
      </section>
    </main>
  );
}
