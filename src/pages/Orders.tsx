import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  FileCheck,
  FileSpreadsheet,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  X,
} from "lucide-react";
import { ordersData } from "../data/orders";
import EmptyState from "../components/common/EmptyState";
import { useSearch } from "../hooks/SearchContext";
import SearchResults from "../components/common/SearchResults";
import type { OrderRecord } from "../types";

const statusStyles: Record<OrderRecord["status"], string> = {
  "In Progress": "bg-indigo-50 text-indigo-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Review: "bg-amber-50 text-amber-700",
  Pending: "bg-slate-100 text-slate-700",
};

const priorityStyles: Record<OrderRecord["priority"], string> = {
  High: "text-rose-600 bg-rose-50",
  Medium: "text-amber-600 bg-amber-50",
  Low: "text-slate-600 bg-slate-100",
};

function Orders() {
  const { searchQuery: globalQuery } = useSearch();
  const [localSearch, setLocalSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const statuses = ["All", "In Progress", "Completed", "Review", "Pending"];

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch =
      order.title.toLowerCase().includes(localSearch.toLowerCase()) ||
      order.id.toLowerCase().includes(localSearch.toLowerCase()) ||
      order.requester.toLowerCase().includes(localSearch.toLowerCase()) ||
      order.department.toLowerCase().includes(localSearch.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || order.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const inProgressCount = ordersData.filter((o) => o.status === "In Progress").length;
  const reviewCount = ordersData.filter((o) => o.status === "Review").length;
  const completedCount = ordersData.filter((o) => o.status === "Completed").length;

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {globalQuery.trim() && <SearchResults query={globalQuery} />}

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Operations</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Orders
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Manage operational records and requests across your workspace.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Create Order
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="ovara-fade-up ovara-delay-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Requests
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <FileSpreadsheet className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {ordersData.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">Across active workspaces</p>
        </div>

        <div className="ovara-fade-up ovara-delay-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              In Progress
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{inProgressCount}</p>
          <p className="mt-1 text-xs text-indigo-600 font-medium">Actively executing</p>
        </div>

        <div className="ovara-fade-up ovara-delay-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              In Review
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Filter className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{reviewCount}</p>
          <p className="mt-1 text-xs text-amber-600 font-medium">Pending sign-off</p>
        </div>

        <div className="ovara-fade-up ovara-delay-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Completed
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{completedCount}</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Fulfilled this week</p>
        </div>
      </div>

      {/* Orders Table Container */}
      <div className="ovara-fade-up ovara-delay-4 mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search request ID, requester..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-xs text-slate-700 outline-none transition-colors focus:border-indigo-500 focus:bg-white"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => setLocalSearch("")}
                aria-label="Clear order search"
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Status tabs */}
          <div className="flex flex-wrap gap-1.5">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${selectedStatus === status
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                  }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        {filteredOrders.length === 0 ? (
          <EmptyState
            title="No orders found"
            description="No workspace requests matched your search query or status filter."
            actionLabel="Reset filters"
            onAction={() => {
              setLocalSearch("");
              setSelectedStatus("All");
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <caption className="sr-only">Workspace operational requests</caption>
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Order / Request
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Requester
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Priority
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Updated
                  </th>
                  <th scope="col" className="px-5 py-3 text-right" aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                          <FileCheck className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {order.title}
                          </p>
                          <p className="text-xs text-slate-400 font-mono">
                            {order.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <p className="text-sm text-slate-800">{order.requester}</p>
                      <p className="text-xs text-slate-500">{order.department}</p>
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${priorityStyles[order.priority]
                          }`}
                      >
                        {order.priority}
                      </span>
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${statusStyles[order.status]
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-xs text-slate-500">
                      {order.updatedDate}
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        aria-label={`Order actions for ${order.id}`}
                        title={`Order actions for ${order.id}`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;
