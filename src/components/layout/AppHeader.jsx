import { Leaf, LockKeyhole, LogOut } from "lucide-react";

export default function AppHeader({ email, onSignOut }) {
  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="DesintoxicAÇÃO início">
        <span className="brand-mark">
          <Leaf size={19} />
        </span>
        <span>
          desintox<span>icação</span>
        </span>
      </a>

      <div className="topbar-right">
        <span className="private-pill">
          <LockKeyhole size={13} />
          {email}
        </span>

        <button
          className="signout-button"
          type="button"
          onClick={onSignOut}
          title="Sair da conta"
        >
          <LogOut size={15} />
          <span>Sair</span>
        </button>
      </div>
    </header>
  );
}
