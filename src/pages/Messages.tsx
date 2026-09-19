import { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Phone,
  Search,
  Send,
  Video,
  X,
} from "lucide-react";
import { initialConversations } from "../data/messages";
import { useSearch } from "../hooks/SearchContext";
import SearchResults from "../components/common/SearchResults";
import type { ConversationThread, MessageItem } from "../types";

function Messages() {
  const { searchQuery: globalQuery } = useSearch();
  const [conversations, setConversations] = useState<ConversationThread[]>(initialConversations);
  const [activeConvId, setActiveConvId] = useState<string>(initialConversations[0].id);
  const [searchFilter, setSearchFilter] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0];

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.role.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleSelectConversation = (id: string) => {
    setActiveConvId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: MessageItem = {
      id: `msg-${Date.now()}`,
      senderId: "self",
      senderName: "Likith V",
      text: inputMessage.trim(),
      timestamp: "Just now",
      isSelf: true,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              lastMessage: inputMessage.trim(),
              lastMessageTime: "Just now",
              messages: [...c.messages, newMessage],
            }
          : c
      )
    );

    setInputMessage("");
  };

  return (
    <section className="p-4 sm:p-6 lg:p-8">
      {globalQuery.trim() && <SearchResults query={globalQuery} />}

      {/* Header */}
      <div className="mb-6">
        <p className="text-sm font-medium text-indigo-600">Communication</p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Messages
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Direct communication channels and collaborative workspace threads.
        </p>
      </div>

      {/* Main Messaging Layout */}
      <div className="ovara-fade-up grid h-[640px] max-h-[calc(100vh-240px)] min-h-[500px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[minmax(280px,340px)_minmax(0,1fr)]">
        {/* Left: Conversation List */}
        <aside className="flex flex-col border-r border-slate-200 bg-slate-50/50">
          <div className="border-b border-slate-100 p-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search conversations..."
                className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-8 text-xs text-slate-700 outline-none transition-colors focus:border-indigo-500"
              />
              {searchFilter && (
                <button
                  type="button"
                  onClick={() => setSearchFilter("")}
                  className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredConversations.map((conv) => {
              const isSelected = conv.id === activeConvId;

              return (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`w-full rounded-xl p-3 text-left transition-colors flex items-start gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                    isSelected
                      ? "bg-white shadow-sm border border-slate-200"
                      : "hover:bg-slate-100/70 border border-transparent"
                  }`}
                >
                  <div className="relative shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                      {conv.avatarText}
                    </div>
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {conv.name}
                      </p>
                      <span className="shrink-0 text-[10px] text-slate-400">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate">
                      {conv.role}
                    </p>

                    <p className="mt-1 line-clamp-1 text-xs text-slate-600">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right: Selected Conversation Pane */}
        <main className="flex flex-col bg-white">
          {/* Active Conversation Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 px-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                  {activeConversation.avatarText}
                </div>
                {activeConversation.online && (
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {activeConversation.name}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {activeConversation.role} •{" "}
                  <span className={activeConversation.online ? "text-emerald-600 font-medium" : "text-slate-400"}>
                    {activeConversation.online ? "Online" : "Offline"}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Start voice call"
                title="Start voice call"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <Phone className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Start video sync"
                title="Start video sync"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <Video className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Thread options"
                title="Thread options"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {activeConversation.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.isSelf ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.isSelf
                      ? "bg-indigo-600 text-white rounded-tr-xs"
                      : "bg-slate-100 text-slate-800 rounded-tl-xs"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
                <span className="mt-1 text-[10px] text-slate-400 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-slate-100 p-4 bg-white"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Message ${activeConversation.name}...`}
                className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-800 outline-none transition-colors focus:border-indigo-500 focus:bg-white"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                aria-label="Send message"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white transition-all hover:bg-indigo-700 disabled:opacity-40 disabled:hover:bg-indigo-600"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </main>
      </div>
    </section>
  );
}

export default Messages;
