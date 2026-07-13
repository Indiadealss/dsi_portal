import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  Video,
  Phone,
  MoreVertical,
  Paperclip,
  Send,
  FileText,
  Check,
  CheckCheck,
  Mail,
  MapPin,
  Calendar,
  Ban,
  ArrowLeft,
  Info,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Design tokens (from spec)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Seed data
// ---------------------------------------------------------------------------
const initialConversations = [
  {
    id: 1,
    name: "Rahul Verma",
    property: "3 BHK Apartment",
    propertyFull: "3 BHK Apartment - DLF The Crest, Gurgaon",
    time: "2:30 PM",
    unread: 2,
    important: true,
    avatar: "https://i.pravatar.cc/150?img=12",
    email: "Rahul.verma@email.com",
    phone: "+91 98765 43210",
    location: "Gurgaon, Haryana",
    joined: "15 May 2024",
    interestedProperty: {
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
      badge: "Property",
      name: "Commercial Shop",
      location: "Sushant Lok, Gurgaon",
      price: "₹1.20 Cr",
      area: "800 Sq.Ft",
    },
    firstContact: "20 May 2024",
    lastMessageDate: "20 May 2024",
    status: "Active",
    leadSource: "website",
    messages: [
      { id: 1, from: "them", text: "Hii, I'm interested in this property. Is it still available?", time: "2:30 PM" },
      { id: 2, from: "me", text: "Yes Rahul, this property is available. Would you like to know more details?", time: "2:32 PM", read: true },
      { id: 3, from: "them", text: "Yes, Please share the price details and possession date.", time: "2:33 PM" },
      { id: 4, from: "me", text: "Sure! The price is ₹ 2.45 Cr and possession is in Dec 2025. I'll also share brochure and floor plan.", time: "2:32 PM", read: true },
      { id: 5, from: "them", text: "Great, Please share the brochure.", time: "2:33 PM" },
      { id: 6, from: "me", file: { name: "3_BHK_Apartment_Brochure .PDF", size: "2.4 MB" }, time: "2:32 PM", read: true },
      { id: 7, from: "them", text: "Thanks! Can we schedule a site visit this weekend ?", time: "2:33 PM" },
    ],
  },
  {
    id: 2,
    name: "Sneha Iyer",
    property: "Office Space",
    propertyFull: "Interested in Office Space - One World Center, Noida",
    time: "11:15 AM",
    unread: 1,
    important: false,
    avatar: "https://i.pravatar.cc/150?img=32",
    email: "sneha.iyer@email.com",
    phone: "+91 91234 56780",
    location: "Noida, Uttar Pradesh",
    joined: "02 May 2024",
    interestedProperty: {
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
      badge: "Property",
      name: "Office Space",
      location: "One World Center, Noida",
      price: "₹95 Lac",
      area: "1200 Sq.Ft",
    },
    firstContact: "18 May 2024",
    lastMessageDate: "20 May 2024",
    status: "Active",
    leadSource: "referral",
    messages: [
      { id: 1, from: "them", text: "Thanks for sharing the details, can we schedule a visit ?", time: "11:15 AM" },
    ],
  },
  {
    id: 3,
    name: "Amit Singh",
    property: "2 BHK Apartment",
    propertyFull: "Interested in 2 BHK Apartment - Godrej Woods, Noida",
    time: "10:45 AM",
    unread: 0,
    important: true,
    avatar: "https://i.pravatar.cc/150?img=53",
    email: "amit.singh@email.com",
    phone: "+91 99887 76655",
    location: "Noida, Uttar Pradesh",
    joined: "10 May 2024",
    interestedProperty: {
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
      badge: "Property",
      name: "2 BHK Apartment",
      location: "Godrej Woods, Noida",
      price: "₹78 Lac",
      area: "980 Sq.Ft",
    },
    firstContact: "12 May 2024",
    lastMessageDate: "19 May 2024",
    status: "Active",
    leadSource: "website",
    messages: [
      { id: 1, from: "them", text: "Please share the price details and possession date", time: "10:45 AM" },
    ],
  },
  {
    id: 4,
    name: "Pooja Mehta",
    property: "Commercial Shop",
    propertyFull: "Interested in Commercial Shop - Sushant Lok, Gurgaon",
    time: "Yesterday",
    unread: 0,
    important: false,
    avatar: "https://i.pravatar.cc/150?img=45",
    email: "pooja.mehta@email.com",
    phone: "+91 90123 45678",
    location: "Gurgaon, Haryana",
    joined: "08 May 2024",
    interestedProperty: {
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
      badge: "Property",
      name: "Commercial Shop",
      location: "Sushant Lok, Gurgaon",
      price: "₹1.20 Cr",
      area: "800 Sq.Ft",
    },
    firstContact: "17 May 2024",
    lastMessageDate: "19 May 2024",
    status: "Active",
    leadSource: "walk-in",
    messages: [
      { id: 1, from: "them", text: "In this property on rent or for on sale?", time: "Yesterday" },
    ],
  },
  {
    id: 5,
    name: "Vikram Joshi",
    property: "4 BHK Villa",
    propertyFull: "Interested in 4 BHK Villa - Palm Meadows, Gurgaon",
    time: "Yesterday",
    unread: 0,
    important: false,
    avatar: "https://i.pravatar.cc/150?img=15",
    email: "vikram.joshi@email.com",
    phone: "+91 98123 45670",
    location: "Gurgaon, Haryana",
    joined: "01 May 2024",
    interestedProperty: {
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=250&fit=crop",
      badge: "Property",
      name: "4 BHK Villa",
      location: "Palm Meadows, Gurgaon",
      price: "₹3.10 Cr",
      area: "3200 Sq.Ft",
    },
    firstContact: "14 May 2024",
    lastMessageDate: "19 May 2024",
    status: "Active",
    leadSource: "website",
    messages: [
      { id: 1, from: "them", text: "Do you have any more photos of the property ?", time: "Yesterday" },
    ],
  },
  {
    id: 6,
    name: "Ananya Gupta",
    property: "Luxury Project Sky heights",
    propertyFull: "Interested in Luxury Project - Sky Heights, Gurgaon",
    time: "Yesterday",
    unread: 0,
    important: false,
    avatar: "https://i.pravatar.cc/150?img=25",
    email: "ananya.gupta@email.com",
    phone: "+91 97123 45671",
    location: "Gurgaon, Haryana",
    joined: "05 May 2024",
    interestedProperty: {
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=250&fit=crop",
      badge: "Property",
      name: "Sky Heights",
      location: "Golf Course Road, Gurgaon",
      price: "₹2.85 Cr",
      area: "2100 Sq.Ft",
    },
    firstContact: "16 May 2024",
    lastMessageDate: "19 May 2024",
    status: "Active",
    leadSource: "instagram",
    messages: [
      { id: 1, from: "them", text: "Please share brochure and payment plan", time: "Yesterday" },
    ],
  },
  {
    id: 7,
    name: "Rohit Bansal",
    property: "Business Park",
    propertyFull: "Interested in Business Park - Cyber City, Gurgaon",
    time: "17 May",
    unread: 0,
    important: false,
    avatar: "https://i.pravatar.cc/150?img=60",
    email: "rohit.bansal@email.com",
    phone: "+91 96123 45672",
    location: "Gurgaon, Haryana",
    joined: "28 Apr 2024",
    interestedProperty: {
      image:
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=250&fit=crop",
      badge: "Property",
      name: "Business Park",
      location: "Cyber City, Gurgaon",
      price: "₹4.50 Cr",
      area: "5000 Sq.Ft",
    },
    firstContact: "10 May 2024",
    lastMessageDate: "17 May 2024",
    status: "Active",
    leadSource: "website",
    messages: [
      { id: 1, from: "them", text: "I would like to know more about this project.", time: "17 May" },
    ],
  },
  {
    id: 8,
    name: "Vijay Singh",
    property: "3 BHK Villa",
    propertyFull: "Interested in 3 BHK Villa - Emerald Estate, Gurgaon",
    time: "15 May",
    unread: 0,
    important: false,
    avatar: "https://i.pravatar.cc/150?img=68",
    email: "vijay.singh@email.com",
    phone: "+91 95123 45673",
    location: "Gurgaon, Haryana",
    joined: "20 Apr 2024",
    interestedProperty: {
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=250&fit=crop",
      badge: "Property",
      name: "3 BHK Villa",
      location: "Emerald Estate, Gurgaon",
      price: "₹2.10 Cr",
      area: "2600 Sq.Ft",
    },
    firstContact: "05 May 2024",
    lastMessageDate: "15 May 2024",
    status: "Active",
    leadSource: "website",
    messages: [
      { id: 1, from: "them", text: "Is financing available for this villa?", time: "15 May" },
    ],
  },
];

function Avatar({ src, name, size = 48 }) {
  return (
    <img
      src={src}
      alt={name}
      className="rounded-full object-cover flex-shrink-0"
      style={{ width: size, height: size }}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}

export default function Messagedashbord() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(initialConversations[0].id);
  const [draft, setDraft] = useState("");
  const [mobileView, setMobileView] = useState("list"); // list | chat | details
  const scrollRef = useRef(null);

  const selected = conversations.find((c) => c.id === selectedId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selected?.messages?.length, selectedId]);

  const filtered = conversations.filter((c) => {
    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "unread"
        ? c.unread > 0
        : c.important;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.property.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const unreadCount = conversations.filter((c) => c.unread > 0).length;

  function selectConversation(id) {
    setSelectedId(id);
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c))
    );
    setMobileView("chat");
  }

  function markAllRead() {
    setConversations((prev) => prev.map((c) => ({ ...c, unread: 0 })));
  }

  function sendMessage() {
    if (!draft.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? {
              ...c,
              messages: [
                ...c.messages,
                { id: c.messages.length + 1, from: "me", text: draft.trim(), time, read: false },
              ],
              time,
            }
          : c
      )
    );
    setDraft("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

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

        {/* Main layout */}
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
                  style={{
                    height: 44,
                    borderRadius: 8,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.heading,
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-5 px-4 pt-2 pb-3" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              {[
                { key: "all", label: "All" },
                { key: "unread", label: `Unread(${unreadCount})` },
                { key: "important", label: "Important" },
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
              {filtered.map((c) => (
                <button
                  key={c.id}
                  onClick={() => selectConversation(c.id)}
                  className="w-full flex items-start gap-3 px-4 py-3 text-left transition-colors"
                  style={{
                    minHeight: 86,
                    backgroundColor: selectedId === c.id ? COLORS.secondary : "transparent",
                    borderBottom: `1px solid ${COLORS.border}`,
                  }}
                >
                  <Avatar src={c.avatar} name={c.name} size={48} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm truncate" style={{ color: COLORS.heading }}>
                        {c.name}
                      </span>
                      <span className="text-xs flex-shrink-0 ml-2" style={{ color: COLORS.muted }}>
                        {c.time}
                      </span>
                    </div>
                    <div className="text-sm font-medium truncate" style={{ color: COLORS.body }}>
                      {c.property}
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs truncate" style={{ color: COLORS.muted, maxWidth: "85%" }}>
                        {c.messages[c.messages.length - 1]?.text ||
                          (c.messages[c.messages.length - 1]?.file ? c.messages[c.messages.length - 1].file.name : "")}
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
              ))}
            </div>

            <div className="px-4 py-3 text-xs text-center" style={{ color: COLORS.muted, borderTop: `1px solid ${COLORS.border}` }}>
              Showing 1 to {filtered.length} of 27 conversation
            </div>
          </div>

          {/* Center - Chat Window */}
          {selected && (
            <div
              className={`${mobileView === "chat" ? "flex" : "hidden"} md:flex flex-col flex-1 min-w-0 bg-white`}
              style={{ borderRadius: 12, border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 8px rgba(0,0,0,.05)" }}
            >
              {/* Chat header */}
              <div
                className="flex items-center justify-between px-4 flex-shrink-0"
                style={{ height: 70, borderBottom: `1px solid ${COLORS.border}` }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <button className="md:hidden" onClick={() => setMobileView("list")}>
                    <ArrowLeft size={20} style={{ color: COLORS.heading }} />
                  </button>
                  <Avatar src={selected.avatar} name={selected.name} size={40} />
                  <div className="min-w-0">
                    <div className="font-bold text-sm truncate" style={{ color: COLORS.heading }}>
                      {selected.name}
                    </div>
                    <div className="text-xs truncate" style={{ color: COLORS.muted }}>
                      Interested in {selected.propertyFull.replace(/^Interested in /, "")}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg" style={{ border: `1px solid ${COLORS.border}` }}>
                    <Video size={16} style={{ color: COLORS.body }} />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg" style={{ border: `1px solid ${COLORS.border}` }}>
                    <Phone size={16} style={{ color: COLORS.body }} />
                  </button>
                  <button
                    className="w-9 h-9 flex items-center justify-center rounded-lg md:hidden"
                    style={{ border: `1px solid ${COLORS.border}` }}
                    onClick={() => setMobileView("details")}
                  >
                    <Info size={16} style={{ color: COLORS.body }} />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg" style={{ border: `1px solid ${COLORS.border}` }}>
                    <MoreVertical size={16} style={{ color: COLORS.body }} />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4" style={{ backgroundColor: "#FFFFFF" }}>
                <div className="text-center text-xs mb-4" style={{ color: COLORS.muted }}>
                  {selected.firstContact}
                </div>
                <div className="flex flex-col gap-[18px]">
                  {selected.messages.map((m) => (
                    <div key={m.id} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                      {m.file ? (
                        <div
                          className="flex items-center gap-3 px-3 py-2 max-w-[320px]"
                          style={{ backgroundColor: COLORS.secondary, borderRadius: 16 }}
                        >
                          <div className="w-9 h-9 flex items-center justify-center rounded-lg flex-shrink-0" style={{ backgroundColor: "#FFFFFF" }}>
                            <FileText size={18} style={{ color: COLORS.primary }} />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium truncate" style={{ color: COLORS.heading }}>
                              {m.file.name}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs" style={{ color: COLORS.muted }}>
                                {m.file.size}
                              </span>
                              <span className="text-xs" style={{ color: COLORS.muted }}>
                                · {m.time}
                              </span>
                              {m.from === "me" && <CheckCheck size={12} style={{ color: COLORS.primary }} />}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div
                          className="max-w-[75%] sm:max-w-[420px] px-4 py-2.5"
                          style={{
                            backgroundColor: m.from === "me" ? COLORS.secondary : "#FFFFFF",
                            border: m.from === "them" ? `1px solid ${COLORS.border}` : "none",
                            borderRadius: 16,
                          }}
                        >
                          <div className="text-sm" style={{ color: COLORS.heading }}>
                            {m.text}
                          </div>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs" style={{ color: COLORS.muted }}>
                              {m.time}
                            </span>
                            {m.from === "me" && <CheckCheck size={13} style={{ color: COLORS.primary }} />}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div
                className="flex items-center gap-3 px-4 flex-shrink-0"
                style={{ height: 70, borderTop: `1px solid ${COLORS.border}` }}
              >
                <button
                  className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{ border: `1px solid ${COLORS.border}` }}
                >
                  <Paperclip size={18} style={{ color: COLORS.body }} />
                </button>
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
                  onClick={sendMessage}
                  className="w-11 h-11 flex items-center justify-center flex-shrink-0 text-white"
                  style={{ backgroundColor: COLORS.primary, borderRadius: 8 }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          )}

          {/* Right Sidebar - Details */}
          {selected && (
            <div
              className={`${mobileView === "details" ? "flex" : "hidden"} md:flex flex-col w-full md:w-[300px] flex-shrink-0 gap-5`}
            >
              <button className="md:hidden flex items-center gap-2 text-sm" style={{ color: COLORS.primary }} onClick={() => setMobileView("chat")}>
                <ArrowLeft size={16} /> Back to chat
              </button>

              {/* Contact Details */}
              <div className="bg-white p-4" style={{ borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
                <h3 className="font-semibold mb-3" style={{ fontSize: 18, color: COLORS.heading }}>
                  Contact Details
                </h3>
                <div className="flex flex-col gap-3 text-sm">
                  <div className="flex items-center gap-2" style={{ color: COLORS.body }}>
                    <Mail size={15} style={{ color: COLORS.muted }} />
                    <span className="truncate">{selected.email}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: COLORS.body }}>
                    <Phone size={15} style={{ color: COLORS.muted }} />
                    <span>{selected.phone}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: COLORS.body }}>
                    <MapPin size={15} style={{ color: COLORS.muted }} />
                    <span>{selected.location}</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ color: COLORS.body }}>
                    <Calendar size={15} style={{ color: COLORS.muted }} />
                    <span>Joined on {selected.joined}</span>
                  </div>
                </div>
              </div>

              {/* Interested Property */}
              <div className="bg-white p-4" style={{ borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
                <h3 className="font-semibold mb-3" style={{ fontSize: 18, color: COLORS.heading }}>
                  Interested Property
                </h3>
                <div className="relative">
                  <img
                    src={selected.interestedProperty.image}
                    alt={selected.interestedProperty.name}
                    className="w-full object-cover"
                    style={{ height: 140, borderRadius: 8 }}
                  />
                  <span
                    className="absolute top-2 left-2 text-white text-xs px-2 py-0.5"
                    style={{ backgroundColor: COLORS.success, borderRadius: 999 }}
                  >
                    {selected.interestedProperty.badge}
                  </span>
                </div>
                <div className="mt-3">
                  <div className="font-semibold text-sm" style={{ color: COLORS.heading }}>
                    {selected.interestedProperty.name}
                  </div>
                  <div className="text-xs mb-1" style={{ color: COLORS.muted }}>
                    {selected.interestedProperty.location}
                  </div>
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span style={{ color: COLORS.primary }}>{selected.interestedProperty.price}</span>
                    <span style={{ color: COLORS.body, fontWeight: 400 }}>{selected.interestedProperty.area}</span>
                  </div>
                </div>
              </div>

              {/* Conversation Summary */}
              <div className="bg-white p-4" style={{ borderRadius: 12, border: `1px solid ${COLORS.border}` }}>
                <h3 className="font-semibold mb-3" style={{ fontSize: 18, color: COLORS.heading }}>
                  Conversation Summary
                </h3>
                <div className="flex flex-col gap-2.5 text-sm">
                  <div className="flex items-center justify-between">
                    <span style={{ color: COLORS.muted }}>Total Messages</span>
                    <span style={{ color: COLORS.heading }}>{selected.messages.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: COLORS.muted }}>First Contact</span>
                    <span style={{ color: COLORS.heading }}>{selected.firstContact}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: COLORS.muted }}>Last Message</span>
                    <span style={{ color: COLORS.heading }}>{selected.lastMessageDate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: COLORS.muted }}>Status</span>
                    <span
                      className="px-2 py-0.5 text-xs font-medium"
                      style={{ backgroundColor: "#DCFCE7", color: COLORS.success, borderRadius: 999 }}
                    >
                      {selected.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ color: COLORS.muted }}>Lead Source</span>
                    <span style={{ color: COLORS.heading }}>{selected.leadSource}</span>
                  </div>
                </div>
              </div>

              <button
                className="flex items-center justify-center gap-2 py-2.5 font-medium text-sm mb-2"
                style={{ border: `1px solid ${COLORS.danger}`, color: COLORS.danger, borderRadius: 8 }}
                onClick={() => alert(`${selected.name} has been blocked.`)}
              >
                <Ban size={16} />
                Block User
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
