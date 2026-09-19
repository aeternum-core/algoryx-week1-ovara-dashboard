import { useState } from "react";
import {
  MoreHorizontal,
  Plus,
  Search,
  UserCheck,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { customersData } from "../data/customers";
import EmptyState from "../components/common/EmptyState";
import { useSearch } from "../hooks/SearchContext";
import SearchResults from "../components/common/SearchResults";
import type { Customer } from "../types";

const statusBadgeClasses: Record<Customer["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Onboarding: "bg-indigo-50 text-indigo-700",
  Pending: "bg-amber-50 text-amber-700",
  Inactive: "bg-slate-100 text-slate-600",
};

function Customers() {
  const { searchQuery: globalQuery } = useSearch();
  const [localSearch, setLocalSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const statuses = ["All", "Active", "Onboarding", "Pending", "Inactive"];

  const filteredCustomers = customersData.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(localSearch.toLowerCase()) ||
      customer.email.toLowerCase().includes(localSearch.toLowerCase()) ||
      customer.organization.toLowerCase().includes(localSearch.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || customer.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const activeCount = customersData.filter((c) => c.status === "Active").length;
  const onboardingCount = customersData.filter((c) => c.status === "Onboarding").length;
  const pendingCount = customersData.filter((c) => c.status === "Pending").length;

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {globalQuery.trim() && <SearchResults query={globalQuery} />}

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Directory</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Customers
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Manage client accounts, organization directories, and team partnerships.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Add Customer
        </button>
      </div>

      {/* Overview Stat Badges */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="ovara-fade-up ovara-delay-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Accounts
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {customersData.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">Across 8 client entities</p>
        </div>

        <div className="ovara-fade-up ovara-delay-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Status
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{activeCount}</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Healthy engagement</p>
        </div>

        <div className="ovara-fade-up ovara-delay-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Onboarding
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <UserPlus className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{onboardingCount}</p>
          <p className="mt-1 text-xs text-slate-500">Completing setup</p>
        </div>

        <div className="ovara-fade-up ovara-delay-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Pending Review
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{pendingCount}</p>
          <p className="mt-1 text-xs text-amber-600 font-medium">Action requested</p>
        </div>
      </div>

      {/* Filter and Table Container */}
      <div className="ovara-fade-up ovara-delay-4 mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Controls bar */}
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search customers or company..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-xs text-slate-700 outline-none transition-colors focus:border-indigo-500 focus:bg-white"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => setLocalSearch("")}
                aria-label="Clear customer search"
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Status filter pills */}
          <div className="flex flex-wrap gap-1.5">
            {statuses.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedStatus === status
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Customer Table */}
        {filteredCustomers.length === 0 ? (
          <EmptyState
            title="No customers found"
            description="Try adjusting your search criteria or switching status filters."
            actionLabel="Reset filters"
            onAction={() => {
              setLocalSearch("");
              setSelectedStatus("All");
            }}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <caption className="sr-only">Customers directory</caption>
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Customer
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Organization
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Status
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Teams
                  </th>
                  <th scope="col" className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Last Active
                  </th>
                  <th scope="col" className="px-5 py-3 text-right" aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => {
                  const initials = customer.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2);

                  return (
                    <tr
                      key={customer.id}
                      className="border-b border-slate-100 last:border-0 transition-colors hover:bg-slate-50/70"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-semibold text-slate-700">
                            {initials}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {customer.name}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        <p className="text-sm font-medium text-slate-800">
                          {customer.organization}
                        </p>
                        <p className="text-xs text-slate-500">{customer.role}</p>
                      </td>

                      <td className="px-5 py-3.5">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                            statusBadgeClasses[customer.status]
                          }`}
                        >
                          {customer.status}
                        </span>
                      </td>

                      <td className="px-5 py-3.5 text-sm text-slate-600">
                        {customer.teamsCount} teams
                      </td>

                      <td className="px-5 py-3.5 text-xs text-slate-500">
                        {customer.lastActive}
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <button
                          type="button"
                          aria-label={`Customer options for ${customer.name}`}
                          title={`Customer options for ${customer.name}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Customers;
