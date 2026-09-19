import { useState } from "react";
import {
  Boxes,
  Cpu,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { productsData } from "../data/products";
import EmptyState from "../components/common/EmptyState";
import { useSearch } from "../hooks/SearchContext";
import SearchResults from "../components/common/SearchResults";
import type { ProductModule } from "../types";

const statusClasses: Record<ProductModule["status"], string> = {
  Active: "bg-emerald-50 text-emerald-700",
  Beta: "bg-indigo-50 text-indigo-700",
  Maintenance: "bg-amber-50 text-amber-700",
};

function Products() {
  const { searchQuery: globalQuery } = useSearch();
  const [localSearch, setLocalSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Core Suite",
    "Integrations",
    "Utilities",
    "Extensions",
  ];

  const filteredProducts = productsData.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(localSearch.toLowerCase()) ||
      product.description.toLowerCase().includes(localSearch.toLowerCase()) ||
      product.id.toLowerCase().includes(localSearch.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const activeModulesCount = productsData.filter((p) => p.status === "Active").length;
  const betaCount = productsData.filter((p) => p.status === "Beta").length;

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {globalQuery.trim() && <SearchResults query={globalQuery} />}

      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-indigo-600">Platform Catalog</p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Products & Modules
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Enterprise administration modules, service connectors, and workspace extensions.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Plus className="h-4 w-4" />
          Register Module
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="ovara-fade-up ovara-delay-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Total Modules
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Boxes className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">
            {productsData.length}
          </p>
          <p className="mt-1 text-xs text-slate-500">In enterprise catalog</p>
        </div>

        <div className="ovara-fade-up ovara-delay-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Production
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Cpu className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{activeModulesCount}</p>
          <p className="mt-1 text-xs text-emerald-600 font-medium">Fully deployed</p>
        </div>

        <div className="ovara-fade-up ovara-delay-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Beta Previews
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">{betaCount}</p>
          <p className="mt-1 text-xs text-indigo-600 font-medium">In early testing</p>
        </div>

        <div className="ovara-fade-up ovara-delay-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Active Team Adoption
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <UsersRound className="h-4 w-4" />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold text-slate-900">721</p>
          <p className="mt-1 text-xs text-slate-500">Aggregate team instances</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="ovara-fade-up ovara-delay-4 mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search module or category..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-8 text-xs text-slate-700 outline-none transition-colors focus:border-indigo-500 focus:bg-white"
            />
            {localSearch && (
              <button
                type="button"
                onClick={() => setLocalSearch("")}
                aria-label="Clear product search"
                className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No modules match your query"
              description="Try changing the category or searching with a different term."
              actionLabel="Reset filters"
              onAction={() => {
                setLocalSearch("");
                setSelectedCategory("All");
              }}
            />
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 transition-all duration-200 hover:border-slate-200 hover:bg-white hover:shadow-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-md bg-slate-200/70 px-2 py-0.5 text-[10px] font-semibold text-slate-600 uppercase tracking-wider">
                      {product.category}
                    </span>
                    <button
                      type="button"
                      aria-label={`Options for ${product.name}`}
                      title={`Options for ${product.name}`}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="mt-3 text-sm font-semibold text-slate-900">
                    {product.name}
                  </h3>

                  <p className="mt-1 line-clamp-2 text-xs text-slate-500 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-5 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-slate-400">
                      {product.version}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        statusClasses[product.status]
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{product.activeTeams} teams active</span>
                    <span>{product.lastUpdated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Products;
