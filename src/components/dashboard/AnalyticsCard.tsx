import { Activity, ArrowUpRight } from "lucide-react";

const activityData = [
  { label: "Mon", value: 42 },
  { label: "Tue", value: 58 },
  { label: "Wed", value: 51 },
  { label: "Thu", value: 74 },
  { label: "Fri", value: 63 },
  { label: "Sat", value: 81 },
  { label: "Sun", value: 68 },
];

function AnalyticsCard() {
  const maxValue = Math.max(...activityData.map((item) => item.value));

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Activity className="h-4 w-4" />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Workspace Activity
              </h3>
              <p className="text-xs text-slate-500">
                Activity across your organization
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
          <ArrowUpRight className="h-4 w-4" />
          12.8%
        </div>
      </div>

      <div className="mt-8 flex h-48 items-end gap-3">
        {activityData.map((item) => (
          <div
            key={item.label}
            className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
          >
            <div className="relative flex w-full flex-1 items-end justify-center">
              <div
                className="w-full max-w-10 rounded-t-lg bg-indigo-100 transition-all duration-300 group-hover:bg-indigo-500"
                style={{
                  height: `${(item.value / maxValue) * 100}%`,
                }}
              />
            </div>

            <span className="text-[11px] font-medium text-slate-400">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}

export default AnalyticsCard;