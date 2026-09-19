import {
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  LayoutDashboard,
  MessageSquare,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

interface NavigationItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const mainNavigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Customers",
    href: "/customers",
    icon: Users,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: ShoppingCart,
  },
  {
    label: "Products",
    href: "/products",
    icon: Package,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: MessageSquare,
  },
  {
    label: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
];

const secondaryNavigation: NavigationItem[] = [
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    label: "Help & Support",
    href: "/help",
    icon: CircleHelp,
  },
];

function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <aside
      className={`relative flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Brand */}
      <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-5">
        <NavLink
          to="/dashboard"
          className="flex min-w-0 items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-bold text-white shadow-sm">
            O
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <p className="truncate text-lg font-bold tracking-tight text-slate-900">
                OVARA
              </p>

              <p className="truncate text-[11px] font-medium tracking-wide text-slate-400">
                Admin Platform
              </p>
            </div>
          )}
        </NavLink>
      </div>

      {/* Navigation */}
      <nav
        aria-label="Primary navigation"
        className="flex-1 overflow-y-auto px-3 py-6"
      >
        {/* Workspace */}
        <p
          className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 ${
            collapsed ? "text-center" : ""
          }`}
        >
          {!collapsed ? "Workspace" : "•••"}
        </p>

        <div className="space-y-1">
          {mainNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.href}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-600 hover:translate-x-0.5 hover:bg-slate-50 hover:text-slate-900"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 transition-transform duration-200 ${
                        isActive
                          ? "text-indigo-600"
                          : "text-slate-400 group-hover:scale-105 group-hover:text-slate-600"
                      }`}
                      aria-hidden="true"
                    />

                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}

                    {!collapsed && isActive && (
                      <span
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-slate-100" />

        {/* Support */}
        <p
          className={`mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 ${
            collapsed ? "text-center" : ""
          }`}
        >
          {!collapsed ? "Support" : "•••"}
        </p>

        <div className="space-y-1">
          {secondaryNavigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.label}
                to={item.href}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm"
                      : "text-slate-600 hover:translate-x-0.5 hover:bg-slate-50 hover:text-slate-900"
                  } ${collapsed ? "justify-center" : ""}`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 transition-transform duration-200 ${
                        isActive
                          ? "text-indigo-600"
                          : "text-slate-400 group-hover:scale-105 group-hover:text-slate-600"
                      }`}
                      aria-hidden="true"
                    />

                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}

                    {!collapsed && isActive && (
                      <span
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-600"
                        aria-hidden="true"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* User profile */}
      <div className="shrink-0 border-t border-slate-200 p-3">
        <NavLink
          to="/settings"
          aria-label="Open user settings and profile"
          className={`group flex w-full items-center gap-3 rounded-xl p-2 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
            LV
          </div>

          {!collapsed && (
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-semibold text-slate-900">
                Likith V
              </p>

              <p className="truncate text-[11px] text-slate-500">
                Administrator
              </p>
            </div>
          )}
        </NavLink>
      </div>

      {/* Collapse button */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-200 hover:scale-105 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </aside>
  );
}

export default Sidebar;