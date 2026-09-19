import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  FolderKanban,
  UsersRound,
} from "lucide-react";
import {
  analyticsOverviewMetrics,
  projectMilestones,
  teamEngagementBreakdown,
  weeklyActivityData,
} from "../data/analytics";
import { useSearch } from "../hooks/SearchContext";
import SearchResults from "../components/common/SearchResults";

const metricIcons = [UsersRound, Activity, FolderKanban, CheckCircle2];

function Analytics() {
  const { searchQuery } = useSearch();
  const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "30d" | "90d">("7d");
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  const periods = [
    { key: "7d", label: "Last 7 days" },
    { key: "30d", label: "Last 30 days" },
    { key: "90d", label: "Last 90 days" },
  ] as const;

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {/* Search Results if query exists */}
      {searchQuery.trim() && <SearchResults query={searchQuery} />}

      {/* Page Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Insights</p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Analytics
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Understand activity and performance across your workspace.
          </p>
        </div>

        {/* Time-Period Selector */}
        <div className="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          <Calendar className="ml-2.5 mr-1.5 h-4 w-4 text-slate-400" aria-hidden="true" />
          {periods.map((period) => (
            <button
              key={period.key}
              type="button"
              onClick={() => setSelectedPeriod(period.key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                selectedPeriod === period.key
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsOverviewMetrics.map((metric, index) => {
          const Icon = metricIcons[index % metricIcons.length];
          return (
            <div
              key={metric.label}
              className={`ovara-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                index === 0
                  ? "ovara-delay-1"
                  : index === 1
                  ? "ovara-delay-2"
                  : index === 2
                  ? "ovara-delay-3"
                  : "ovara-delay-4"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {metric.change}
                </div>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-bold tracking-tight text-slate-900">
                  {metric.value}
                </p>
                <p className="mt-1 text-sm font-medium text-slate-600">
                  {metric.label}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {metric.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visualizations: Activity Trend & Engagement Breakdown */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.9fr)_minmax(320px,1.1fr)]">
        {/* Workspace Activity Trend (CSS Chart) */}
        <article className="ovara-fade-up ovara-delay-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                  <Activity className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Workspace Activity Trend
                </h3>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Daily active participants and completed work items
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                <span>Active Users</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-200" />
                <span>Tasks Done</span>
              </div>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="mt-6">
            <div className="flex h-56 items-end gap-3 sm:gap-6 pt-6">
              {weeklyActivityData.map((item, idx) => {
                const isHovered = hoveredBarIndex === idx;
                return (
                  <div
                    key={item.day}
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                    className="group relative flex h-full flex-1 flex-col items-center justify-end"
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-10 z-20 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[11px] font-medium text-white shadow-lg">
                        {item.activeUsers.toLocaleString()} users • {item.tasksDone} tasks
                      </div>
                    )}

                    <div className="flex w-full max-w-12 items-end justify-center gap-1.5">
                      {/* Active Users bar */}
                      <div
                        className="w-1/2 rounded-t-md bg-indigo-600 transition-all duration-300 group-hover:bg-indigo-700"
                        style={{ height: `${item.heightPct}%` }}
                      />
                      {/* Tasks Done bar */}
                      <div
                        className="w-1/2 rounded-t-md bg-indigo-200 transition-all duration-300 group-hover:bg-indigo-300"
                        style={{ height: `${Math.round(item.heightPct * 0.72)}%` }}
                      />
                    </div>

                    <span className="mt-2 text-[11px] font-medium text-slate-400">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </article>

        {/* User Engagement & Workspace Progress */}
        <article className="ovara-fade-up ovara-delay-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">
            Workspace Engagement
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Current operational health and throughput benchmarks
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-600">Daily Active Ratio</span>
                <span className="font-semibold text-slate-900">88%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[88%] rounded-full bg-indigo-600" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-600">Sprint Goal Completion</span>
                <span className="font-semibold text-slate-900">92%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[92%] rounded-full bg-indigo-600" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-600">Documentation Coverage</span>
                <span className="font-semibold text-slate-900">76%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[76%] rounded-full bg-indigo-600" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-600">SLA Response Compliance</span>
                <span className="font-semibold text-slate-900">97%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-100">
                <div className="h-2 w-[97%] rounded-full bg-indigo-600" />
              </div>
            </div>
          </div>
        </article>
      </div>

      {/* Team Activity Breakdown & Project Milestones */}
      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        {/* Team Activity Table */}
        <article className="ovara-fade-up ovara-delay-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 p-5">
            <h3 className="text-sm font-semibold text-slate-900">
              Team Performance Breakdown
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Cross-functional capacity and completion velocities
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Team
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Members
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Active Projects
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Completion
                  </th>
                </tr>
              </thead>
              <tbody>
                {teamEngagementBreakdown.map((t) => (
                  <tr
                    key={t.team}
                    className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-3.5 text-sm font-medium text-slate-900">
                      {t.team}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">
                      {t.members} members
                    </td>
                    <td className="px-5 py-3.5 text-sm text-slate-500">
                      {t.activeProjects} projects
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-slate-100">
                          <div
                            className="h-2 rounded-full bg-indigo-600"
                            style={{ width: `${t.completionRate}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">
                          {t.completionRate}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* Project Milestones */}
        <article className="ovara-fade-up ovara-delay-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Project Milestones
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              High-priority workspace initiatives in current cycle
            </p>
          </div>

          <div className="mt-5 space-y-4">
            {projectMilestones.map((m) => (
              <div key={m.name} className="rounded-xl border border-slate-100 p-3.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-800">{m.name}</p>
                  <span className="text-xs font-medium text-slate-500">{m.dueDate}</span>
                </div>
                <div className="mt-2.5 flex items-center gap-3">
                  <div className="h-1.5 flex-1 rounded-full bg-slate-100">
                    <div
                      className={`h-1.5 rounded-full ${
                        m.progress === 100 ? "bg-emerald-500" : "bg-indigo-600"
                      }`}
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-slate-700">
                    {m.progress}%
                  </span>
                </div>
                <p className="mt-2 text-[11px] text-slate-400">
                  Lead: <span className="font-medium text-slate-600">{m.lead}</span>
                </p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

export default Analytics;
