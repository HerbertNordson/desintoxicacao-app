import { LoaderCircle } from "lucide-react";
import { useDashboard } from "../../hooks/useDashboard";
import AppHeader from "../layout/AppHeader";
import HeroSection from "../layout/HeroSection";
import AppFooter from "../layout/AppFooter";
import OverviewCards from "./OverviewCards";
import JourneySidebar from "./JourneySidebar";
import DailyView from "./DailyView";

export default function Dashboard({ user, onSignOut }) {
  const viewModel = useDashboard(user.id);

  const { records, loading, error, completedCount, selectedIndex, selectDay } =
    viewModel;

  return (
    <main className="app-shell">
      <AppHeader email={user.email} onSignOut={onSignOut} />

      <HeroSection />

      {error && (
        <div className="data-alert" role="alert">
          {error}
        </div>
      )}

      {loading && (
        <div className="data-loading">
          <LoaderCircle size={16} className="spin" />
          Carregando seus registros...
        </div>
      )}

      <OverviewCards completedCount={completedCount} />

      <section className="main-layout">
        <JourneySidebar
          records={records}
          selectedIndex={selectedIndex}
          onSelectDay={selectDay}
        />

        <DailyView viewModel={viewModel} />
      </section>

      <AppFooter />
    </main>
  );
}
