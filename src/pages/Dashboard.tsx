import SearchResults from "../components/common/SearchResults";
import DataTable from "../components/common/DataTable";
import ActivityList from "../components/dashboard/ActivityList";
import AnalyticsCard from "../components/dashboard/AnalyticsCard";
import NotificationPanel from "../components/dashboard/NotificationPanel";
import ProfileCard from "../components/dashboard/ProfileCard";
import StatCard from "../components/dashboard/StatCard";
import { useSearch } from "../hooks/SearchContext";
import { records } from "../data/records";
import { stats } from "../data/stats";

function Dashboard() {
    const { searchQuery } = useSearch();

    return (
        <section className="p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <p className="text-sm font-medium text-indigo-600">Overview</p>

                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                    Good evening, Likith 👋
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                    Here's what's happening across your workspace today.
                </p>
            </div>

            {/* Search Results */}
            {searchQuery.trim() && (
                <SearchResults query={searchQuery} />
            )}

            {/* KPI Cards */}
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat, index) => (
                    <div
                        key={stat.title}
                        className={`ovara-fade-up ${index === 0
                                ? "ovara-delay-1"
                                : index === 1
                                    ? "ovara-delay-2"
                                    : index === 2
                                        ? "ovara-delay-3"
                                        : "ovara-delay-4"
                            }`}
                    >
                        <StatCard {...stat} />
                    </div>
                ))}
            </div>

            {/* Analytics + Performance */}
            <div className="ovara-fade-up ovara-delay-4 mt-6 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
                <AnalyticsCard />

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-slate-900">
                        Performance Overview
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                        Current workspace performance
                    </p>

                    <div className="mt-6 space-y-5">
                        {/* User Engagement */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm text-slate-600">
                                    User Engagement
                                </span>

                                <span className="text-sm font-semibold text-slate-900">
                                    84%
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-slate-100">
                                <div className="h-2 w-[84%] rounded-full bg-indigo-500" />
                            </div>
                        </div>

                        {/* Project Progress */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm text-slate-600">
                                    Project Progress
                                </span>

                                <span className="text-sm font-semibold text-slate-900">
                                    72%
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-slate-100">
                                <div className="h-2 w-[72%] rounded-full bg-indigo-500" />
                            </div>
                        </div>

                        {/* Task Completion */}
                        <div>
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm text-slate-600">
                                    Task Completion
                                </span>

                                <span className="text-sm font-semibold text-slate-900">
                                    91%
                                </span>
                            </div>

                            <div className="h-2 rounded-full bg-slate-100">
                                <div className="h-2 w-[91%] rounded-full bg-indigo-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Activity + Records */}
            <div className="ovara-fade-up ovara-delay-5 mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.9fr)]">
                <ActivityList />

                <DataTable data={records} />
            </div>

            {/* Profile + Notifications */}
            <div className="ovara-fade-up mt-6 grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)]">
                <ProfileCard />

                <NotificationPanel />
            </div>
        </section>
    );
}

export default Dashboard;