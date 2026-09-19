import { MoreHorizontal } from "lucide-react";
import EmptyState from "./EmptyState";

interface RecordItem {
    id: number;
    name: string;
    owner: string;
    status: "In Progress" | "Completed" | "Review";
    updated: string;
}

interface DataTableProps {
    data: RecordItem[];
}

const statusStyles = {
    "In Progress": "bg-indigo-50 text-indigo-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Review: "bg-amber-50 text-amber-700",
};

function DataTable({ data }: DataTableProps) {
    return (
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <div>
                    <h3 className="text-sm font-semibold text-slate-900">
                        Recent Records
                    </h3>

                    <p className="mt-1 text-xs text-slate-500">
                        Latest projects and workspace records
                    </p>
                </div>

                <button
                    type="button"
                    className="rounded-lg px-2 py-1 text-xs font-semibold text-indigo-600 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                >
                    View all
                </button>
            </div>

            {/* Empty state */}
            {data.length === 0 ? (
                <EmptyState
                    title="No records available"
                    description="There are currently no workspace records to display."
                />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[650px] text-left">
                        <caption className="sr-only">
                            Recent OVARA workspace records
                        </caption>

                        <thead>
                            <tr className="border-b border-slate-100 bg-slate-50/70">
                                <th
                                    scope="col"
                                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400"
                                >
                                    Record
                                </th>

                                <th
                                    scope="col"
                                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400"
                                >
                                    Owner
                                </th>

                                <th
                                    scope="col"
                                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400"
                                >
                                    Status
                                </th>

                                <th
                                    scope="col"
                                    className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400"
                                >
                                    Updated
                                </th>

                                <th
                                    scope="col"
                                    className="px-5 py-3"
                                    aria-label="Actions"
                                />
                            </tr>
                        </thead>

                        <tbody>
                            {data.map((item) => (
                                <tr
                                    key={item.id}
                                    className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/70"
                                >
                                    {/* Record */}
                                    <td className="px-5 py-4">
                                        <p className="text-sm font-medium text-slate-800">
                                            {item.name}
                                        </p>
                                    </td>

                                    {/* Owner */}
                                    <td className="px-5 py-4 text-sm text-slate-500">
                                        {item.owner}
                                    </td>

                                    {/* Status */}
                                    <td className="px-5 py-4">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[item.status]}`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>

                                    {/* Updated */}
                                    <td className="px-5 py-4 text-sm text-slate-500">
                                        {item.updated}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-5 py-4 text-right">
                                        <button
                                            type="button"
                                            aria-label={`More options for ${item.name}`}
                                            title={`More options for ${item.name}`}
                                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
                                        >
                                            <MoreHorizontal
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </article>
    );
}

export default DataTable;