import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import MobileNavigation from "./MobileNavigation";
import { SearchContext } from "../../hooks/SearchContext";

interface AppShellProps {
  children: React.ReactNode;
}

function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
      }}
    >
      <div
  className={`min-h-screen ${
    darkMode ? "ovara-dark bg-slate-950" : "bg-slate-50"
  }`}
>
        <div className="flex min-h-screen">
          {/* Desktop Sidebar */}
          <Sidebar
            collapsed={sidebarCollapsed}
            onToggle={() =>
              setSidebarCollapsed((previous) => !previous)
            }
          />

          <main className="min-w-0 flex-1 overflow-x-hidden">
            <Topbar
              darkMode={darkMode}
              onToggleTheme={() =>
                setDarkMode((previous) => !previous)
              }
              onOpenMobileMenu={() => setMobileMenuOpen(true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            {children}
          </main>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      </div>
    </SearchContext.Provider>
  );
}

export default AppShell;