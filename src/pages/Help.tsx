import { useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  LifeBuoy,
  MessageCircle,
  Search,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { faqCategories, faqData } from "../data/help";
import EmptyState from "../components/common/EmptyState";
import { useSearch } from "../hooks/SearchContext";
import SearchResults from "../components/common/SearchResults";

function Help() {
  const { searchQuery: globalQuery } = useSearch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const quickGuides = [
    {
      title: "Workspace Administration",
      desc: "Governance, team member roles, and project lifecycle management.",
      icon: BookOpen,
    },
    {
      title: "Security & IAM Protocols",
      desc: "Session handling, two-factor auth setup, and role assignments.",
      icon: ShieldCheck,
    },
    {
      title: "Webhook & Event Pipeline",
      desc: "Connect workspace triggers to third-party endpoints and Slack.",
      icon: Workflow,
    },
    {
      title: "Platform Audit Logging",
      desc: "Compliance data retention, activity tracking, and report exports.",
      icon: LifeBuoy,
    },
  ];

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {globalQuery.trim() && <SearchResults query={globalQuery} />}

      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-indigo-600">Knowledge Base</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Help & Support
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Documentation, operational FAQs, and dedicated support resources for OVARA.
        </p>
      </div>

      {/* Search Bar */}
      <div className="ovara-fade-up max-w-2xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides, common questions, or topics..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-9 text-xs text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:bg-white sm:text-sm"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear help search"
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {faqCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                selectedCategory === category
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Quick Guides Grid */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-slate-900 mb-4">
          Core Documentation Topics
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickGuides.map((guide, idx) => {
            const Icon = guide.icon;
            return (
              <div
                key={guide.title}
                className={`ovara-fade-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md cursor-pointer ${
                  idx === 0
                    ? "ovara-delay-1"
                    : idx === 1
                    ? "ovara-delay-2"
                    : idx === 2
                    ? "ovara-delay-3"
                    : "ovara-delay-4"
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-3">
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {guide.title}
                </h4>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                  {guide.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordion & Contact Area */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        {/* FAQs */}
        <div className="ovara-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
            <HelpCircle className="h-5 w-5 text-indigo-600" />
            <h3 className="text-base font-semibold text-slate-900">
              Frequently Asked Questions
            </h3>
          </div>

          {filteredFaqs.length === 0 ? (
            <EmptyState
              title="No answers found"
              description="We couldn't find any FAQs matching your query. Try a different term or browse all categories."
              actionLabel="Show all questions"
              onAction={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            />
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredFaqs.map((faq, idx) => {
                const isExpanded = expandedIndex === idx;

                return (
                  <div key={faq.question} className="py-4 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => toggleAccordion(idx)}
                      className="flex w-full items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
                    >
                      <span className="text-sm font-medium text-slate-900 pr-4">
                        {faq.question}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                      )}
                    </button>

                    {isExpanded && (
                      <p className="mt-2.5 text-xs text-slate-600 leading-relaxed px-1">
                        {faq.answer}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Contact Support Assistance */}
        <div className="ovara-fade-up ovara-delay-3 flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm h-fit space-y-6">
          <div>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4">
              <MessageCircle className="h-5 w-5" />
            </div>

            <h4 className="text-base font-semibold text-slate-900">
              Need Direct Assistance?
            </h4>

            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              Our enterprise support engineering team is available 24/7 to resolve technical workspace and configuration questions.
            </p>

            <div className="mt-4 rounded-xl bg-slate-50 p-3 border border-slate-100">
              <p className="text-[11px] font-medium text-slate-600">
                Average Response Time
              </p>
              <p className="mt-0.5 text-xs font-semibold text-indigo-600">
                &lt; 15 minutes • Dedicated Engineer
              </p>
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-indigo-600 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Contact Support Team
          </button>
        </div>
      </div>
    </section>
  );
}

export default Help;
