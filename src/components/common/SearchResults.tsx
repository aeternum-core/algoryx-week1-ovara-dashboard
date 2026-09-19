import { FolderKanban, Search, User } from "lucide-react";
import { records } from "../../data/records";
import EmptyState from "./EmptyState";

interface SearchResultsProps {
    query: string;
}

function SearchResults({ query }: SearchResultsProps) {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return null;
    }

    const matchingRecords = records.filter((record) =>
        `${record.name} ${record.owner} ${record.status}`
            .toLowerCase()
            .includes(normalizedQuery),
    );

    return (
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {/* Search Results Header */}
            <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
                <Search
                    className="h-4 w-4 text-slate-400"
                    aria-hidden="true"
                />

                <p className="text-sm font-semibold text-slate-900">
                    Search results
                </p>

                <span className="text-xs text-slate-400">
                    {matchingRecords.length} found
                </span>
            </div>

            {/* Results */}
            {matchingRecords.length > 0 ? (
                <div className="divide-y divide-slate-100">
                    {matchingRecords.map((record) => (
                        <button
                            key={record.id}
                            type="button"
                            aria-label={`Open ${record.name}, owned by ${record.owner}, status ${record.status}`}
                            className="group flex w-full items-center gap-4 px-5 py-4 text-left transition-all duration-200 hover:bg-slate-50 focus:outline-none focus-visible:bg-slate-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                        >
                            {/* Icon */}
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-transform duration-200 group-hover:scale-105">
                                <FolderKanban
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                />
                            </div>

                            {/* Information */}
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-800">
                                    {record.name}
                                </p>

                                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                                    <User
                                        className="h-3 w-3 shrink-0"
                                        aria-hidden="true"
                                    />

                                    <span>{record.owner}</span>

                                    <span aria-hidden="true">•</span>

                                    <span>{record.status}</span>
                                </div>
                            </div>

                            {/* Updated time */}
                            <span className="hidden shrink-0 text-xs text-slate-400 sm:block">
                                {record.updated}
                            </span>
                        </button>
                    ))}
                </div>
            ) : (
                <EmptyState
                    title="No results found"
                    description="Try searching for a project, owner, or status."
                />
            )}
        </div>
    );
}

export default SearchResults;