import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down";
    icon: LucideIcon;
    description?: string;
}

function StatCard({
    title,
    value,
    change,
    trend,
    icon: Icon,
    description = "vs. last month",
}: StatCardProps) {
    const isPositive = trend === "up";

    return (
        <article className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                        {value}
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-transform duration-200 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                </div>
            </div>

            {/* Change */}
            <div className="mt-4 flex items-center gap-2">
                <span
                    className={`inline-flex items-center gap-0.5 text-sm font-semibold ${isPositive ? "text-emerald-600" : "text-red-500"
                        }`}
                >
                    {isPositive ? (
                        <ArrowUpRight className="h-4 w-4" />
                    ) : (
                        <ArrowDownRight className="h-4 w-4" />
                    )}

                    {change}
                </span>

                <span className="text-xs text-slate-400">
                    {description}
                </span>
            </div>
        </article>
    );
}

export default StatCard;