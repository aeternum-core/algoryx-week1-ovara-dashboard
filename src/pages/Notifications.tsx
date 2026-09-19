import { useState } from "react";
import {
  AlertCircle,
  Bell,
  CheckCheck,
  CheckCircle2,
  Info,
  MessageSquare,
} from "lucide-react";
import { initialNotificationsData } from "../data/notifications";
import EmptyState from "../components/common/EmptyState";
import { useSearch } from "../hooks/SearchContext";
import SearchResults from "../components/common/SearchResults";
import type { NotificationItem } from "../types";

const categoryIcons = {
  alert: AlertCircle,
  task: CheckCircle2,
  message: MessageSquare,
  workspace: Info,
};

const categoryIconStyles = {
  alert: "bg-amber-50 text-amber-600",
  task: "bg-emerald-50 text-emerald-600",
  message: "bg-indigo-50 text-indigo-600",
  workspace: "bg-violet-50 text-violet-600",
};

function Notifications() {
  const { searchQuery: globalQuery } = useSearch();
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotificationsData);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filters = ["All", "Unread", "Alerts", "Tasks", "Messages", "Workspace"];

  const filteredNotifications = notifications.filter((n) => {
    if (activeFilter === "Unread") return !n.read;
    if (activeFilter === "Alerts") return n.category === "alert";
    if (activeFilter === "Tasks") return n.category === "task";
    if (activeFilter === "Messages") return n.category === "message";
    if (activeFilter === "Workspace") return n.category === "workspace";
    return true;
  });

  const markAsRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const toggleReadStatus = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {globalQuery.trim() && <SearchResults query={globalQuery} />}

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-indigo-600">Activity Center</p>
            {unreadCount > 0 && (
              <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-semibold text-indigo-600">
                {unreadCount} unread
              </span>
            )}
          </div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Notifications
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Review workspace alerts, milestone approvals, and team activity mentions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:opacity-40"
          >
            <CheckCheck className="h-3.5 w-3.5 text-indigo-600" />
            Mark all read
          </button>
        </div>
      </div>

      {/* Notification Center Container */}
      <div className="ovara-fade-up max-w-4xl rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-slate-100 p-4">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(f)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                activeFilter === f
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <EmptyState
            title="No notifications"
            description="You are completely caught up! No notifications match the selected category."
            actionLabel="View all notifications"
            onAction={() => setActiveFilter("All")}
          />
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredNotifications.map((notification) => {
              const Icon = categoryIcons[notification.category] || Bell;
              const iconStyle = categoryIconStyles[notification.category] || "bg-indigo-50 text-indigo-600";

              return (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`group flex items-start gap-4 p-5 transition-colors cursor-pointer ${
                    notification.read
                      ? "opacity-65 hover:bg-slate-50/70"
                      : "bg-indigo-50/15 hover:bg-indigo-50/30"
                  }`}
                >
                  <div className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}>
                    <Icon className="h-5 w-5" />
                    {!notification.read && (
                      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-indigo-600 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`text-sm ${notification.read ? "font-medium text-slate-700" : "font-semibold text-slate-900"}`}>
                        {notification.title}
                      </p>
                      <span className="shrink-0 text-xs text-slate-400">
                        {notification.time}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                      {notification.description}
                    </p>

                    <div className="mt-2.5 flex items-center gap-2">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        {notification.category}
                      </span>

                      <button
                        type="button"
                        onClick={(e) => toggleReadStatus(notification.id, e)}
                        className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700"
                      >
                        {notification.read ? "Mark unread" : "Mark read"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default Notifications;
