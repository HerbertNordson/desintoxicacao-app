import { LoaderCircle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import LoginForm from "./LoginForm";
import SetupNotice from "./SetupNotice";
import Dashboard from "../dashboard/Dashboard";

export default function AuthGate() {
  const { user, loading, error, signIn, signOut, isConfigured } = useAuth();

  if (!isConfigured) {
    return <SetupNotice />;
  }

  if (loading) {
    return (
      <main className="auth-screen">
        <div className="auth-loading">
          <LoaderCircle size={25} className="spin" />
          <span>Preparando seu espaço...</span>
        </div>
      </main>
    );
  }

  if (!user) {
    return <LoginForm onSignIn={signIn} error={error} />;
  }

  return <Dashboard user={user} onSignOut={signOut} />;
}
