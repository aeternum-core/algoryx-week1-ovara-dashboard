import {
    AlertCircle,
    CheckCircle2,
    Info,
    MessageSquare,
} from "lucide-react";
import { useState } from "react";

interface Notification {
    id: number;
    title: string;
    description: string;
    time: string;
    icon: typeof AlertCircle;
    iconStyle: string;
}

const initialNotifications: Notification[] = [
    {
        id: 1,
        title: "Project deadline approaching",
        description: "Website Redesign is due tomorrow",
        time: "10 min ago",
        icon: AlertCircle,
        iconStyle: "bg-amber-50 text-amber-600",
    },
    {
        id: 2,
        title: "Task completed",
        description: "Dashboard integration was completed",
        time: "32 min ago",
        icon: CheckCircle2,
        iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
        id: 3,
        title: "New message",
        description: "You received a message from Aisha",
        time: "1 hr ago",
        icon: MessageSquare,
        iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
        id: 4,
        title: "Workspace update",
        description: "A new team was added to your workspace",
        time: "2 hrs ago",
        icon: Info,
        iconStyle: "bg-violet-50 text-violet-600",
    },
];

function NotificationPanel() {
    const [notifications] = useState(
        initialNotifications,
    );

    const [readNotifications, setReadNotifications] = useState<number[]>([]);

    const unreadCount = notifications.filter(
        (notification) => !readNotifications.includes(notification.id),
    ).length;

    const markAsRead = (id: number) => {
        setReadNotifications((previous) =>
            previous.includes(id) ? previous : [...previous, id],
        );
    };

    const markAllAsRead = () => {
        setReadNotifications(notifications.map((notification) => notification.id));
    };

    return (
        <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-900">
                            Notifications
                        </h3>

                        {unreadCount > 0 && (
                            <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-600">
                                {unreadCount} new
                            </span>
                        )}
                    </div>

                    <p className="mt-1 text-xs text-slate-500">
                        Recent updates that need your attention
                    </p>
                </div>

                <button
                    type="button"
                    onClick={markAllAsRead}
                    disabled={unreadCount === 0}
                    className="text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700 disabled:cursor-default disabled:text-slate-400"
                >
                    Mark all read
                </button>
            </div>

            {/* Notifications */}
            <div className="mt-6 space-y-2">
                {notifications.map((notification) => {
                    const Icon = notification.icon;
                    const isRead = readNotifications.includes(notification.id);

                    return (
                        <button
                            key={notification.id}
                            type="button"
                            onClick={() => markAsRead(notification.id)}
                            className={`flex w-full items-start gap-3 rounded-xl p-2 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${isRead
                                ? "opacity-60 hover:bg-slate-50"
                                : "hover:bg-slate-50"
                                }`}
                        >
                            <div
                                className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${notification.iconStyle}`}
                            >
                                <Icon className="h-4 w-4" />

                                {!isRead && (
                                    <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-indigo-600 ring-2 ring-white" />
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-sm font-medium text-slate-800">
                                    {notification.title}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-500">
                                    {notification.description}
                                </p>
                            </div>

                            <span className="shrink-0 text-[11px] text-slate-400">
                                {notification.time}
                            </span>
                        </button>
                    );
                })}
            </div>
        </article>
    );
}

export default NotificationPanel;