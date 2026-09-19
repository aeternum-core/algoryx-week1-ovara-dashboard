import {
  CheckCircle2,
  FolderKanban,
  UserPlus,
  UsersRound,
} from "lucide-react";

interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: typeof UserPlus;
  iconStyle: string;
}

const activities: Activity[] = [
  {
    id: 1,
    title: "New team member joined",
    description: "Aisha Khan joined the Design Team",
    time: "12 min ago",
    icon: UserPlus,
    iconStyle: "bg-indigo-50 text-indigo-600",
  },
  {
    id: 2,
    title: "Project updated",
    description: "Website Redesign moved to review",
    time: "28 min ago",
    icon: FolderKanban,
    iconStyle: "bg-violet-50 text-violet-600",
  },
  {
    id: 3,
    title: "Task completed",
    description: "Dashboard integration was completed",
    time: "1 hr ago",
    icon: CheckCircle2,
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    id: 4,
    title: "Team created",
    description: "Product Operations team was created",
    time: "2 hrs ago",
    icon: UsersRound,
    iconStyle: "bg-amber-50 text-amber-600",
  },
];

function ActivityList() {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Recent Activity
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            Latest workspace updates
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
        >
          View all
        </button>
      </div>

      <div className="mt-6 space-y-5">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${activity.iconStyle}`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800">
                  {activity.title}
                </p>

                <p className="mt-0.5 truncate text-xs text-slate-500">
                  {activity.description}
                </p>
              </div>

              <span className="shrink-0 text-[11px] text-slate-400">
                {activity.time}
              </span>
            </div>
          );
        })}
      </div>
    </article>
  );
}

export default ActivityList;