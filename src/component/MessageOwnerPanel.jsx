import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { X, Send, MessageCircle, Loader2 } from "lucide-react";
import { sendMessage, getMessage } from "../api/api";

const POLL_MS = 20000;

function threadKey(propertyId) {
  return `msgThread_${propertyId}`;
}

export default function MessageOwnerPanel({
  propertyId,
  ownerId,
  ownerName,
  propertyLabel,
  className = "w-full bg-[#0D6EFD] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm flex items-center justify-center gap-2",
  children,
}) {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState("form"); // 'form' | 'thread'
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [text, setText] = useState("");

  const pollRef = useRef(null);
  const scrollRef = useRef(null);

  const loadThread = useCallback((id) => {
    setLoading(true);
    return getMessage(id)
      .then((res) => setMessages(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!open) return;
    const existing = localStorage.getItem(threadKey(propertyId));
    if (existing) {
      setConversationId(existing);
      setPhase("thread");
      loadThread(existing);
      pollRef.current = window.setInterval(() => loadThread(existing), POLL_MS);
    }
    return () => {
      if (pollRef.current) window.clearInterval(pollRef.current);
    };
  }, [open, propertyId, loadThread]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const closePanel = () => {
    setOpen(false);
    if (pollRef.current) window.clearInterval(pollRef.current);
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    if (!user.loggedIn && (!guestName.trim() || !guestPhone.trim())) {
      setError("Please enter your name and phone number");
      return;
    }
    setSending(true);
    setError("");
    try {
      const res = await sendMessage({
        conversationId: conversationId || undefined,
        sender: user.loggedIn ? user.id : undefined,
        senderName: user.loggedIn ? user.name : guestName,
        receiver: ownerId,
        property_id: propertyId,
        message: text.trim(),
        guestName: user.loggedIn ? undefined : guestName,
        guestPhone: user.loggedIn ? undefined : guestPhone,
      });
      const newConvId = res.data.conversationId;
      localStorage.setItem(threadKey(propertyId), newConvId);
      setConversationId(newConvId);
      setPhase("thread");
      setText("");
      await loadThread(newConvId);
      if (!pollRef.current) {
        pollRef.current = window.setInterval(() => loadThread(newConvId), POLL_MS);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Couldn't send your message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (!ownerId) return null;

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children || (
          <>
            <MessageCircle size={18} />
            Message {ownerName ? ownerName.split(" ")[0] : "Owner"}
          </>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4">
          <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEE]">
              <div>
                <div className="font-bold text-[#1F1F1F] text-sm">
                  Message {ownerName || "Owner"}
                </div>
                {propertyLabel && (
                  <div className="text-xs text-[#6E6E6E]">Re: {propertyLabel}</div>
                )}
              </div>
              <button onClick={closePanel} aria-label="Close" className="text-[#6E6E6E] hover:text-[#1F1F1F]">
                <X size={20} />
              </button>
            </div>

            {phase === "thread" && (
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-3 min-h-[200px]">
                {loading && messages.length === 0 && (
                  <div className="flex items-center justify-center py-8 text-[#6E6E6E] text-sm gap-2">
                    <Loader2 size={16} className="animate-spin" /> Loading conversation…
                  </div>
                )}
                {messages.map((m) => {
                  const mine = user.loggedIn ? m.sender?._id === user.id || m.sender === user.id : !m.sender;
                  return (
                    <div key={m._id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] px-3.5 py-2 rounded-2xl text-sm ${
                          mine ? "bg-[#2F73D9] text-white" : "bg-[#F3F4F6] text-[#1F1F1F]"
                        }`}
                      >
                        {m.message}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {phase === "form" && !user.loggedIn && (
              <div className="px-5 pt-4 flex flex-col gap-2.5">
                <input
                  className="border border-[#E6E6E6] rounded-lg px-3 py-2.5 text-sm outline-none"
                  placeholder="Your name"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                />
                <input
                  className="border border-[#E6E6E6] rounded-lg px-3 py-2.5 text-sm outline-none"
                  placeholder="Your phone number"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                />
              </div>
            )}

            <div className="px-5 py-4 flex flex-col gap-2 border-t border-[#EEE]">
              {error && <div className="text-xs text-red-600">{error}</div>}
              <div className="flex items-center gap-2">
                <textarea
                  rows={2}
                  className="flex-1 border border-[#E6E6E6] rounded-lg px-3 py-2.5 text-sm outline-none resize-none"
                  placeholder={
                    phase === "thread" ? "Type a reply…" : "Hi, I'm interested in this property…"
                  }
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={sending || !text.trim()}
                  className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-lg bg-[#2F73D9] text-white disabled:opacity-50"
                  aria-label="Send"
                >
                  {sending ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
