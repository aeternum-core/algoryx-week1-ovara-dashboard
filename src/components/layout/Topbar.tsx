import {
  Bell,
  ChevronDown,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface TopbarProps {
  darkMode: boolean;
  onToggleTheme: () => void;
  onOpenMobileMenu: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/analytics": "Analytics",
  "/customers": "Customers",
  "/orders": "Orders",
  "/products": "Products",
  "/messages": "Messages",
  "/notifications": "Notifications",
  "/settings": "Settings",
  "/help": "Help & Support",
};

function Topbar({
  darkMode,
  onToggleTheme,
  onOpenMobileMenu,
  searchQuery,
  onSearchChange,
}: TopbarProps) {
  const location = useLocation();
  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <p className="text-xs font-medium text-slate-400">
            Workspace
          </p>

          <h1 className="text-lg font-semibold tracking-tight text-slate-900">
            {currentTitle}
          </h1>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search */}
        <div className="hidden w-56 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 md:flex lg:w-64">
          <Search
            className="h-4 w-4 shrink-0 text-slate-400"
            aria-hidden="true"
          />

          <label htmlFor="workspace-search" className="sr-only">
            Search workspace
          </label>

          <input
            id="workspace-search"
            type="text"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search..."
            autoComplete="off"
            className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          {searchQuery ? (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
              title="Clear search"
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <kbd className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-slate-400 lg:block">
              ⌘ K
            </kbd>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          title={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          {darkMode ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </button>

        {/* Notifications */}
        <Link
          to="/notifications"
          aria-label="View notifications"
          title="View notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Bell className="h-[18px] w-[18px]" />

          <span
            className="absolute right-2.5 top-2 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white"
            aria-hidden="true"
          />
        </Link>

        <div
          className="mx-1 hidden h-8 w-px bg-slate-200 sm:block"
          aria-hidden="true"
        />

        {/* Profile */}
        <Link
          to="/settings"
          aria-label="Open user profile settings"
          className="flex items-center gap-2 rounded-xl p-1.5 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white"
            aria-hidden="true"
          >
            LV
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Likith V
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            className="hidden h-4 w-4 text-slate-400 sm:block"
            aria-hidden="true"
          />
        </Link>
      </div>
    </header>
  );
}

export default Topbar;