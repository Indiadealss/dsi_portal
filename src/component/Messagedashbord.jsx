import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Search,
  Phone,
  Send,
  Paperclip,
  FileText,
  Check,
  CheckCheck,
  Mail,
  Calendar,
  ArrowLeft,
  Info,
  Loader2,
} from "lucide-react";
import { getConvercation, getMessage, reply, openConveration } from "../api/api";

const COLORS = {
  primary: "#1677FF",
  primaryHover: "#0F5FD6",
  secondary: "#EAF4FF",
  bgLightGray: "#F8F9FA",
  border: "#E5E7EB",
  heading: "#0F172A",
  body: "#4B5563",
  muted: "#9CA3AF",
  success: "#16A34A",
  danger: "#EF4444",
};

const POLL_MS = 20000;

const AVATAR_COLORS = ["#2563EB", "#DC2626", "#16A34A", "#9333EA", "#EA580C", "#0891B2", "#BE185D", "#CA8A04"];

function initials(name = "") {
  return name.trim().split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("") || "?";
}

function colorFor(name = "") {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function Avatar({ name, size = 48 }) {
  return (
    <div
      className="rounded-full flex-shrink-0 flex items-center justify-center text-white font-semibold"
      style={{ width: size, height: size, backgroundColor: colorFor(name), fontSize: size * 0.36 }}
    >
      {initials(name)}
    </div>
  );
}

function formatTime(date) {
  if (!date) return "";
  const d = new Date(date);
  const now = new Date();
  const sameDay = d.toDateString() === now.toDateString();
  if (sameDay) return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return d.toLocaleDateString([], { day: "2-digit", month: "short" });
}

function otherParty(conversation, myId) {
  const participant = (conversation.participants || []).find((p) => (p?._id || p) !== myId);
  if (participant && typeof participant === "object") {
    return { name: participant.name || "User", phone: participant.phone, email: participant.email, isGuest: false };
  }
  if (conversation.guestName) {
    return { name: conversation.guestName, phone: conversation.guestPhone, email: null, isGuest: true };
  }
  return { name: "Unknown", phone: null, email: null, isGuest: true };
}

function propertyLabel(propertyId) {
  if (!propertyId) return "General enquiry";
  return propertyId.projectname || propertyId.apartment_name || "Property enquiry";
}

export default function Messagedashbord() {
  const user = useSelector((state) => state.user);
  const myId = user.id;

  const [conversations, setConversations] = useState([]);
  const [loadingList, setLoadingList] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingThread, setLoadingThread] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [mobileView, setMobileView] = useState("list"); // list | chat | details
  const scrollRef = useRef(null);
  const listPollRef = useRef(null);
  const threadPollRef = useRef(null);

  const selected = conversations.find((c) => c._id === selectedId);

  const loadConversations = useCallback(() => {
    if (!myId) return Promise.resolve();
    return getConvercation(myId)
      .then((res) => setConversations(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoadingList(false));
  }, [myId]);

  useEffect(() => {
    loadConversations();
    listPollRef.current = window.setInterval(loadConversations, POLL_MS);
    return () => window.clearInterval(listPollRef.current);
  }, [loadConversations]);

  const loadThread = useCallback((conversationId) => {
    return getMessage(conversationId)
      .then((res) => setMessages(res.data.data || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (threadPollRef.current) window.clearInterval(threadPollRef.current);
    if (!selectedId) {
      setMessages([]);
      return;
    }
    setLoadingThread(true);
    loadThread(selectedId).finally(() => setLoadingThread(false));
    openConveration(selectedId, myId).then(() => {
      setConversations((prev) => prev.map((c) => (c._id === selectedId ? { ...c, unread: 0 } : c)));
    });
    threadPollRef.current = window.setInterval(() => loadThread(selectedId), POLL_MS);
    return () => window.clearInterval(threadPollRef.current);
  }, [selectedId, myId, loadThread]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages.length]);

  const filtered = conversations.filter((c) => {
    const matchesTab = activeTab === "all" ? true : c.unread > 0;
    const other = otherParty(c, myId);
    const label = propertyLabel(c.property_id);
    const q = search.toLowerCase();
    const matchesSearch = other.name.toLowerCase().includes(q) || label.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  const unreadCount = conversations.filter((c) => c.unread > 0).length;

  function selectConversation(id) {
    setSelectedId(id);
    setMobileView("chat");
  }

  async function markAllRead() {
    const toMark = conversations.filter((c) => c.unread > 0);
    await Promise.all(toMark.map((c) => openConveration(c._id, myId)));
    setConversations((prev) => prev.map((c) => ({ ...c, unread: 0 })));
  }

  async function sendReply() {
    if (!draft.trim() || !selectedId || sending) return;
    setSending(true);
    const text = draft.trim();
    setDraft("");
    try {
      await reply({ conversationId: selectedId, sender: myId, senderName: user.name, message: text });
      await loadThread(selectedId);
      loadConversations();
    } catch {
      setDraft(text);
    } finally {
      setSending(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendReply();
    }
  }

  const selectedOther = selected ? otherParty(selected, myId) : null;

  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="max-w-[1600px] mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between flex-wrap gap-4 mb-5" style={{ minHeight: 90 }}>
          <div>
            <h1 className="font-bold" style={{ color: COLORS.heading, fontSize: 34, fontFamily: "Inter, sans-serif" }}>
              Messages
            </h1>
            <p style={{ color: COLORS.body, fontSize: 14 }}>
              Communicate with leads, buyers and property owners
            </p>
          </div>
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 text-white font-medium px-4 rounded-lg transition-colors"
            style={{ backgroundColor: COLORS.primary, height: 40, borderRadius: 8 }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.primaryHover)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = COLORS.primary)}
          >
            <Check size={16} />
            <span className="text-sm">Mark as all read</span>
          </button>
        </div>

        {loadingList ? (
          <div className="flex items-center justify-center py-24 gap-2 text-sm" style={{ color: COLORS.muted }}>
            <Loader2 size={18} className="animate-spin" /> Loading conversations…
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center gap-2" style={{ color: COLORS.muted }}>
            <p className="text-sm">No conversations yet.</p>
            <p className="text-xs">Messages from people interested in your listings will show up here.</p>
          </div>
        ) : (
          <div className="flex gap-5">
            {/* Left Sidebar - Conversation List */}
            <div
              className={`${mobileView === "list" ? "flex" : "hidden"} md:flex flex-col w-full md:w-[300px] flex-shrink-0 bg-white`}
              style={{ borderRadius: 12, border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}
            >
              <div className="p-4 pb-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: COLORS.muted }} />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Conversation"
                    className="w-full pl-9 pr-3 text-sm outline-none"
                    style={{ height: 44, borderRadius: 8, border: `1px solid ${COLORS.border}`, color: COLORS.heading }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-5 px-4 pt-2 pb-3" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                {[
                  { key: "all", label: "All" },
                  { key: "unread", label: `Unread(${unreadCount})` },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className="text-sm pb-2 font-medium transition-colors"
                    style={{
                      color: activeTab === tab.key ? COLORS.primary : COLORS.muted,
                      borderBottom: activeTab === tab.key ? `2px solid ${COLORS.primary}` : "2px solid transparent",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto">
                {filtered.map((c) => {
                  const other = otherParty(c, myId);
                  const time = formatTime(c.lastMessage?.createdAt || c.updatedAt);
                  return (
                    <button
                      key={c._id}
                      onClick={() => selectConversation(c._id)}
                      className="w-full flex items-start gap-3 px-4 py-3 text-left transition-colors"
                      style={{
                        minHeight: 86,
                        backgroundColor: selectedId === c._id ? COLORS.secondary : "transparent",
                        borderBottom: `1px solid ${COLORS.border}`,
                      }}
                    >
                      <Avatar name={other.name} size={48} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm truncate" style={{ color: COLORS.heading }}>
                            {other.name}
                          </span>
                          <span className="text-xs flex-shrink-0 ml-2" style={{ color: COLORS.muted }}>
                            {time}
                          </span>
                        </div>
                        <div className="text-sm font-medium truncate" style={{ color: COLORS.body }}>
                          {propertyLabel(c.property_id)}
                        </div>
                        <div className="flex items-center justify-between mt-0.5">
                          <span className="text-xs truncate" style={{ color: COLORS.muted, maxWidth: "85%" }}>
                            {c.lastMessage?.message || "No messages yet"}
                          </span>
                          {c.unread > 0 && (
                            <span
                              className="flex items-center justify-center text-white text-xs flex-shrink-0"
                              style={{ backgroundColor: COLORS.primary, width: 18, height: 18, borderRadius: "50%" }}
                            >
                              {c.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="px-4 py-3 text-xs text-center" style={{ color: COLORS.muted, borderTop: `1px solid ${COLORS.border}` }}>
                Showing {filtered.length} of {conversations.length} conversations
              </div>
            </div>

            {/* Center - Chat Window */}
            {selected ? (
              <div
                className={`${mobileView === "chat" ? "flex" : "hidden"} md:flex flex-col flex-1 min-w-0 bg-white`}
                style={{ borderRadius: 12, border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}
              >
                <div className="flex items-center justify-between px-4 flex-shrink-0" style={{ height: 70, borderBottom: `1px solid ${COLORS.border}` }}>
                  <div className="flex items-center gap-3 min-w-0">
                    <button className="md:hidden" onClick={() => setMobileView("list")}>
                      <ArrowLeft size={20} style={{ color: COLORS.heading }} />
                    </button>
                    <Avatar name={selectedOther.name} size={40} />
                    <div className="min-w-0">
                      <div className="font-bold text-sm truncate" style={{ color: COLORS.heading }}>
                        {selectedOther.name}
                      </div>
                      <div className="text-xs truncate" style={{ color: COLORS.muted }}>
                        {propertyLabel(selected.property_id)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {selectedOther.phone && (
                      <a
                        href={`tel:${selectedOther.phone}`}
                        className="w-9 h-9 flex items-center justify-center rounded-lg"
                        style={{ border: `1px solid ${COLORS.border}` }}
                        aria-label="Call"
                      >
                        <Phone size={16} style={{ color: COLORS.body }} />
                      </a>
                    )}
                    <button
                      className="w-9 h-9 flex items-center justify-center rounded-lg md:hidden"
                      style={{ border: `1px solid ${COLORS.border}` }}
                      onClick={() => setMobileView("details")}
                    >
                      <Info size={16} style={{ color: COLORS.body }} />
                    </button>
                  </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4" style={{ backgroundColor: "#FFFFFF" }}>
                  {loadingThread ? (
                    <div className="flex items-center justify-center py-8 gap-2 text-sm" style={{ color: COLORS.muted }}>
                      <Loader2 size={16} className="animate-spin" /> Loading messages…
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[18px]">
                      {messages.map((m) => {
                        const mine = (m.sender?._id || m.sender) === myId;
                        return (
                          <div key={m._id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                            {m.attachment ? (
                              <div className="flex items-center gap-3 px-3 py-2 max-w-[320px]" style={{ backgroundColor: COLORS.secondary, borderRadius: 16 }}>
                                <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: "#FFFFFF" }}>
                                  <FileText size={18} style={{ color: COLORS.primary }} />
                                </div>
                                <div className="min-w-0">
                                  <a href={m.attachment} target="_blank" rel="noopener noreferrer" className="text-sm font-medium truncate block" style={{ color: COLORS.heading }}>
                                    {m.message || "Attachment"}
                                  </a>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs" style={{ color: COLORS.muted }}>{formatTime(m.createdAt)}</span>
                                    {mine && <CheckCheck size={12} style={{ color: COLORS.primary }} />}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="max-w-[75%] sm:max-w-[420px] px-4 py-2.5"
                                style={{
                                  backgroundColor: mine ? COLORS.secondary : "#FFFFFF",
                                  border: !mine ? `1px solid ${COLORS.border}` : "none",
                                  borderRadius: 16,
                                }}
                              >
                                <div className="text-sm" style={{ color: COLORS.heading }}>{m.message}</div>
                                <div className="flex items-center justify-end gap-1 mt-1">
                                  <span className="text-xs" style={{ color: COLORS.muted }}>{formatTime(m.createdAt)}</span>
                                  {mine && (m.isRead ? <CheckCheck size={13} style={{ color: COLORS.primary }} /> : <Check size={13} style={{ color: COLORS.muted }} />)}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 px-4 flex-shrink-0" style={{ height: 70, borderTop: `1px solid ${COLORS.border}` }}>
                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message here....."
                    className="flex-1 min-w-0 px-4 text-sm outline-none"
                    style={{ height: 44, borderRadius: 8, border: `1px solid ${COLORS.border}`, color: COLORS.heading }}
                  />
                  <button
                    onClick={sendReply}
                    disabled={sending || !draft.trim()}
                    className="w-11 h-11 flex items-center justify-center flex-shrink-0 text-white disabled:opacity-50"
                    style={{ backgroundColor: COLORS.primary, borderRadius: 8 }}
                  >
                    {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
                </div>
              </div>
            ) : (
              <div className="hidden md:flex flex-1 items-center justify-center text-sm" style={{ color: COLORS.muted, borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
                Select a conversation to view messages
              </div>
            )}

            {/* Right Sidebar - Details */}
            {selected && (
              <div className={`${mobileView === "details" ? "flex" : "hidden"} md:flex flex-col w-full md:w-[300px] flex-shrink-0 gap-5`}>
                <button className="md:hidden flex items-center gap-2 text-sm" style={{ color: COLORS.primary }} onClick={() => setMobileView("chat")}>
                  <ArrowLeft size={16} /> Back to chat
                </button>

                <div className="bg-white p-4" style={{ borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
                  <h3 className="font-semibold mb-3" style={{ fontSize: 18, color: COLORS.heading }}>Contact Details</h3>
                  <div className="flex flex-col gap-3 text-sm">
                    {selectedOther.email && (
                      <div className="flex items-center gap-2" style={{ color: COLORS.body }}>
                        <Mail size={15} style={{ color: COLORS.muted }} />
                        <span className="truncate">{selectedOther.email}</span>
                      </div>
                    )}
                    {selectedOther.phone && (
                      <div className="flex items-center gap-2" style={{ color: COLORS.body }}>
                        <Phone size={15} style={{ color: COLORS.muted }} />
                        <span>{selectedOther.phone}</span>
                      </div>
                    )}
                    {selectedOther.isGuest && (
                      <div className="text-xs" style={{ color: COLORS.muted }}>Messaged without an account</div>
                    )}
                  </div>
                </div>

                <div className="bg-white p-4" style={{ borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
                  <h3 className="font-semibold mb-3" style={{ fontSize: 18, color: COLORS.heading }}>Conversation Summary</h3>
                  <div className="flex flex-col gap-2.5 text-sm">
                    <div className="flex items-center justify-between">
                      <span style={{ color: COLORS.muted }}>Total Messages</span>
                      <span style={{ color: COLORS.heading }}>{messages.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: COLORS.muted }}>First Contact</span>
                      <span style={{ color: COLORS.heading }}>{formatTime(selected.createdAt)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: COLORS.muted }}>Last Message</span>
                      <span style={{ color: COLORS.heading }}>{formatTime(selected.lastMessage?.createdAt || selected.updatedAt)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span style={{ color: COLORS.muted }}>Status</span>
                      <span
                        className="px-2 py-0.5 text-xs font-medium capitalize"
                        style={{ backgroundColor: "#DCFCE7", color: COLORS.success, borderRadius: 999 }}
                      >
                        {selected.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
