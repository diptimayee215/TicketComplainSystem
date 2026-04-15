// import { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   PlusCircle, FileText, Clock, CheckCircle2, XCircle,
//   Loader2, MessageSquarePlus, AlertCircle, ChevronDown,
//   CalendarDays, X, Sparkles, TrendingUp, RefreshCw,
// } from "lucide-react";
// import api from "../../services/api";

// // ── Helpers ──────────────────────────────────────────────
// const STATUS = {
//   pending:     { label: "Pending",     dot: "bg-amber-400",  badge: "bg-amber-50 text-amber-700 ring-amber-200",   icon: <Clock size={13}/> },
//   "in-progress":{ label: "In Progress", dot: "bg-blue-400",   badge: "bg-blue-50 text-blue-700 ring-blue-200",     icon: <Loader2 size={13} className="animate-spin"/> },
//   resolved:    { label: "Resolved",    dot: "bg-emerald-400",badge: "bg-emerald-50 text-emerald-700 ring-emerald-200", icon: <CheckCircle2 size={13}/> },
//   rejected:    { label: "Rejected",    dot: "bg-red-400",    badge: "bg-red-50 text-red-700 ring-red-200",         icon: <XCircle size={13}/> },
// };

// const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// const FILTERS = ["all", "pending", "in-progress", "resolved", "rejected"];

// // ── Stat Card ────────────────────────────────────────────
// const StatCard = ({ icon, label, value, color, delay }) => (
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ delay }}
//     className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow"
//   >
//     <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4 shadow-sm`}>
//       {icon}
//     </div>
//     <div className="text-3xl font-extrabold text-slate-900 mb-1">{value}</div>
//     <div className="text-sm text-slate-500 font-medium">{label}</div>
//   </motion.div>
// );

// // ── Complaint Card ────────────────────────────────────────
// const ComplaintCard = ({ item, index }) => {
//   const [expanded, setExpanded] = useState(false);
//   const s = STATUS[item.status] || STATUS.pending;
//   const preview = item.message.length > 120 ? item.message.slice(0, 120) + "…" : item.message;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.06 }}
//       className="bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200 group"
//     >
//       {/* Top row */}
//       <div className="flex items-start justify-between gap-4 mb-3">
//         <div className="flex items-center gap-2 flex-wrap">
//           <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ring-1 ${s.badge}`}>
//             {s.icon} {s.label}
//           </span>
//           {item.adminRemark && (
//             <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-violet-50 text-violet-600 ring-1 ring-violet-200">
//               <MessageSquarePlus size={11}/> Remark
//             </span>
//           )}
//         </div>
//         <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
//           <CalendarDays size={12}/>
//           {fmt(item.createdAt)}
//         </div>
//       </div>

//       {/* Message */}
//       <p className="text-slate-700 text-sm leading-relaxed mb-3">
//         {expanded ? item.message : preview}
//       </p>
//       {item.message.length > 120 && (
//         <button
//           onClick={() => setExpanded(!expanded)}
//           className="text-indigo-500 text-xs font-medium hover:text-indigo-700 flex items-center gap-1 mb-3"
//         >
//           {expanded ? "Show less" : "Read more"}
//           <ChevronDown size={12} className={`transition-transform ${expanded ? "rotate-180" : ""}`}/>
//         </button>
//       )}

//       {/* Admin remark */}
//       <AnimatePresence>
//         {item.adminRemark && (
//           <motion.div
//             initial={{ opacity: 0, height: 0 }}
//             animate={{ opacity: 1, height: "auto" }}
//             exit={{ opacity: 0, height: 0 }}
//             className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-3 text-sm text-violet-800"
//           >
//             <span className="font-semibold text-violet-700">Admin:</span>{" "}
//             {item.adminRemark}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Progress bar */}
//       <div className="mt-4 h-1 rounded-full bg-slate-100 overflow-hidden">
//         <div
//           className={`h-full rounded-full transition-all duration-500 ${
//             item.status === "resolved" ? "w-full bg-emerald-400" :
//             item.status === "in-progress" ? "w-2/3 bg-blue-400" :
//             item.status === "rejected" ? "w-full bg-red-400" : "w-1/3 bg-amber-400"
//           }`}
//         />
//       </div>
//     </motion.div>
//   );
// };

// // ── Main Component ────────────────────────────────────────
// const Profile = () => {
//   const { user } = useAuth();
//   const [isOpen, setIsOpen] = useState(false);
//   const [complaint, setComplaint] = useState("");
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const [charCount, setCharCount] = useState(0);
//   const MAX_CHARS = 500;

//   const fetchComplaints = async () => {
//     try {
//       setFetching(true);
//       const { data } = await api.get("/complaints/my");
//       setComplaints(data.data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setFetching(false);
//     }
//   };

//   useEffect(() => { fetchComplaints(); }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       await api.post("/complaints", { message: complaint });
//       setComplaint("");
//       setCharCount(0);
//       setIsOpen(false);
//       fetchComplaints();
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMessageChange = (e) => {
//     setComplaint(e.target.value);
//     setCharCount(e.target.value.length);
//   };

//   const total      = complaints.length;
//   const pending    = complaints.filter(c => c.status === "pending").length;
//   const inProgress = complaints.filter(c => c.status === "in-progress").length;
//   const resolved   = complaints.filter(c => c.status === "resolved").length;

//   const filtered = filter === "all" ? complaints : complaints.filter(c => c.status === filter);

//   const initials = user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans">

//       {/* ── HERO HEADER ── */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700">
//         {/* Background effects */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-indigo-400 opacity-20 blur-3xl"/>
//           <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-purple-400 opacity-20 blur-3xl"/>
//           <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
//             <defs><pattern id="pg" width="40" height="40" patternUnits="userSpaceOnUse">
//               <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
//             </pattern></defs>
//             <rect width="100%" height="100%" fill="url(#pg)"/>
//           </svg>
//         </div>

//         <div className="relative max-w-5xl mx-auto px-6 py-10">
//           <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

//             {/* User info */}
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 rounded-2xl bg-white/20 border-2 border-white/40 backdrop-blur-sm flex items-center justify-center text-2xl font-extrabold text-white shadow-lg">
//                 {initials}
//               </div>
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <p className="text-white/70 text-sm font-medium">Welcome back</p>
//                   <span className="bg-white/15 text-white text-xs px-2 py-0.5 rounded-full border border-white/20 capitalize">
//                     {user?.role}
//                   </span>
//                 </div>
//                 <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
//                   {user?.name} 👋
//                 </h1>
//                 <p className="text-white/60 text-sm mt-0.5">{user?.email}</p>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={fetchComplaints}
//                 className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition"
//                 title="Refresh"
//               >
//                 <RefreshCw size={16} className={fetching ? "animate-spin" : ""}/>
//               </button>

//               {user?.role === "user" && (
//                 <button
//                   onClick={() => setIsOpen(true)}
//                   className="flex items-center gap-2 bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg hover:scale-105 transition-transform"
//                 >
//                   <PlusCircle size={17}/> New Complaint
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Wave */}
//         <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full -mb-1" preserveAspectRatio="none">
//           <path d="M0 0 C360 40 1080 0 1440 25 L1440 40 L0 40 Z" fill="#f8fafc"/>
//         </svg>
//       </div>

//       {/* ── CONTENT ── */}
//       <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

//         {/* ── STATS ── */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//           <StatCard icon={<FileText size={22} className="text-indigo-600"/>} label="Total Tickets" value={total} color="bg-indigo-50" delay={0}/>
//           <StatCard icon={<Clock size={22} className="text-amber-600"/>} label="Pending" value={pending} color="bg-amber-50" delay={0.05}/>
//           <StatCard icon={<TrendingUp size={22} className="text-blue-600"/>} label="In Progress" value={inProgress} color="bg-blue-50" delay={0.1}/>
//           <StatCard icon={<CheckCircle2 size={22} className="text-emerald-600"/>} label="Resolved" value={resolved} color="bg-emerald-50" delay={0.15}/>
//         </div>

//         {/* ── COMPLAINTS LIST ── */}
//         <div>
//           {/* Section header + filters */}
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
//             <div>
//               <h2 className="text-xl font-extrabold text-slate-900">My Complaints</h2>
//               <p className="text-slate-500 text-sm mt-0.5">{filtered.length} ticket{filtered.length !== 1 ? "s" : ""} found</p>
//             </div>

//             {/* Filter pills */}
//             <div className="flex flex-wrap gap-2">
//               {FILTERS.map(f => (
//                 <button
//                   key={f}
//                   onClick={() => setFilter(f)}
//                   className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150 capitalize ${
//                     filter === f
//                       ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
//                       : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
//                   }`}
//                 >
//                   {f === "all" ? "All" : (STATUS[f]?.label ?? f)}
//                   {f !== "all" && (
//                     <span className="ml-1.5 opacity-70">
//                       {complaints.filter(c => c.status === f).length}
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* List */}
//           {fetching ? (
//             <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-400">
//               <Loader2 size={32} className="animate-spin text-indigo-400"/>
//               <p className="text-sm">Loading your tickets…</p>
//             </div>
//           ) : filtered.length === 0 ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-slate-200 text-center"
//             >
//               <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
//                 <AlertCircle size={28} className="text-slate-300"/>
//               </div>
//               <p className="font-semibold text-slate-600 mb-1">No tickets found</p>
//               <p className="text-sm text-slate-400">
//                 {filter === "all"
//                   ? "You haven't submitted any complaints yet."
//                   : `No ${STATUS[filter]?.label ?? filter} tickets.`}
//               </p>
//               {filter === "all" && user?.role === "user" && (
//                 <button
//                   onClick={() => setIsOpen(true)}
//                   className="mt-5 flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-indigo-700 transition"
//                 >
//                   <PlusCircle size={16}/> Submit First Ticket
//                 </button>
//               )}
//             </motion.div>
//           ) : (
//             <div className="space-y-4">
//               {filtered.map((item, i) => (
//                 <ComplaintCard key={item._id} item={item} index={i}/>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ── MODAL ── */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
//             onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
//           >
//             <motion.div
//               initial={{ opacity: 0, scale: 0.92, y: 20 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.92, y: 20 }}
//               transition={{ type: "spring", stiffness: 300, damping: 25 }}
//               className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden"
//             >
//               {/* Modal header */}
//               <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 flex items-center justify-between">
//                 <div className="flex items-center gap-3 text-white">
//                   <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
//                     <Sparkles size={18}/>
//                   </div>
//                   <div>
//                     <h2 className="font-bold text-lg leading-tight">Submit a Complaint</h2>
//                     <p className="text-white/70 text-xs">We'll get back to you shortly</p>
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="w-8 h-8 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition"
//                 >
//                   <X size={16}/>
//                 </button>
//               </div>

//               {/* Modal body */}
//               <div className="p-6">
//                 <form onSubmit={handleSubmit} className="space-y-5">
//                   <div>
//                     <label className="block text-sm font-semibold text-slate-700 mb-2">
//                       Describe your issue
//                     </label>
//                     <div className="relative">
//                       <textarea
//                         value={complaint}
//                         onChange={handleMessageChange}
//                         required
//                         maxLength={MAX_CHARS}
//                         placeholder="Write your complaint in detail. Be as specific as possible so we can resolve it faster…"
//                         className="w-full border border-slate-200 rounded-2xl p-4 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-none transition"
//                         rows="5"
//                       />
//                       {/* Char counter */}
//                       <div className={`absolute bottom-3 right-3 text-xs font-medium ${charCount > MAX_CHARS * 0.9 ? "text-red-400" : "text-slate-300"}`}>
//                         {charCount}/{MAX_CHARS}
//                       </div>
//                     </div>
//                     {/* Progress */}
//                     <div className="mt-2 h-1 rounded-full bg-slate-100 overflow-hidden">
//                       <div
//                         className={`h-full rounded-full transition-all duration-300 ${
//                           charCount > MAX_CHARS * 0.9 ? "bg-red-400" : "bg-indigo-400"
//                         }`}
//                         style={{ width: `${(charCount / MAX_CHARS) * 100}%` }}
//                       />
//                     </div>
//                   </div>

//                   {/* Info note */}
//                   <div className="flex items-start gap-3 bg-indigo-50 rounded-xl p-4 text-sm text-indigo-700">
//                     <AlertCircle size={16} className="mt-0.5 shrink-0 text-indigo-500"/>
//                     <p>Our team will review your complaint and respond within <strong>24 hours</strong>.</p>
//                   </div>

//                   {/* Buttons */}
//                   <div className="flex gap-3 pt-1">
//                     <button
//                       type="button"
//                       onClick={() => setIsOpen(false)}
//                       className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition"
//                     >
//                       Cancel
//                     </button>
//                     <button
//                       type="submit"
//                       disabled={loading || !complaint.trim()}
//                       className="flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-indigo-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 transition-all flex items-center justify-center gap-2"
//                     >
//                       {loading ? (
//                         <><Loader2 size={16} className="animate-spin"/> Submitting…</>
//                       ) : (
//                         <><PlusCircle size={16}/> Submit Complaint</>
//                       )}
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Profile;


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import api from "../../services/api";
import {
  User, Mail, Shield, Ticket, Clock, CheckCircle2,
  XCircle, ChevronDown, Plus, RefreshCw, Loader2,
  AlertTriangle, MessageSquare, CalendarDays,
  Train, Bus, Plane, Film, ShoppingBag, Package, HelpCircle,
} from "lucide-react";

const STATUS = {
  pending:       { label: "Pending",     badge: "bg-amber-50 text-amber-700 border border-amber-200",    dot: "bg-amber-400"   },
  "in-progress": { label: "In Progress", badge: "bg-blue-50 text-blue-700 border border-blue-200",       dot: "bg-blue-500"    },
  resolved:      { label: "Resolved",    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200", dot: "bg-emerald-500" },
  rejected:      { label: "Rejected",    badge: "bg-red-50 text-red-700 border border-red-200",           dot: "bg-red-400"     },
};

const CAT_ICONS = { train: Train, bus: Bus, flight: Plane, movie: Film, shopping: ShoppingBag, delivery: Package, other: HelpCircle };

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

const TicketCard = ({ ticket, index }) => {
  const [expanded, setExpanded] = useState(false);
  const s = STATUS[ticket.status] || STATUS.pending;
  const CatIcon = CAT_ICONS[ticket.category] || HelpCircle;
  const isLong = (ticket.description || ticket.message)?.length > 120;
  const text = ticket.description || ticket.message || "";
  const preview = isLong ? text.slice(0, 120) + "…" : text;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center">
            <CatIcon size={15} className="text-indigo-500" />
          </div>
          <div>
            <div className="text-slate-900 font-semibold text-sm">{ticket.subject || "Complaint"}</div>
            <div className="text-slate-400 text-xs capitalize">{ticket.category || "General"}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${s.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
          </span>
          <div className="hidden md:flex items-center gap-1.5 text-slate-400 text-xs">
            <CalendarDays size={11} />{fmt(ticket.createdAt)}
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 mb-3" />

      <p className="text-slate-600 text-sm leading-relaxed mb-1">
        {expanded ? text : preview}
      </p>
      {isLong && (
        <button onClick={() => setExpanded(!expanded)} className="text-indigo-500 text-xs hover:text-indigo-700 flex items-center gap-1 font-medium mb-2">
          {expanded ? "Show less" : "Read more"}
          <ChevronDown size={11} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      )}

      {/* Progress bar */}
      <div className="h-1 bg-slate-100 rounded-full overflow-hidden mt-3">
        <div className={`h-full rounded-full transition-all duration-700 ${s.dot} ${
          ticket.status === "resolved" || ticket.status === "rejected" ? "w-full" :
          ticket.status === "in-progress" ? "w-2/3" : "w-1/4"
        }`} />
      </div>

      {ticket.adminRemark && (
        <div className="mt-3 bg-violet-50 border border-violet-100 rounded-xl px-4 py-2.5 text-sm text-violet-700">
          <span className="font-semibold text-violet-600">Admin: </span>{ticket.adminRemark}
        </div>
      )}
    </motion.div>
  );
};

const Profile = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const [ticketRes, complaintRes] = await Promise.allSettled([
        api.get("/tickets/my"),
        api.get("/complaints/my"),
      ]);
      const t = ticketRes.status === "fulfilled" ? (ticketRes.value.data?.data || ticketRes.value.data || []) : [];
      const c = complaintRes.status === "fulfilled" ? (complaintRes.value.data?.data || complaintRes.value.data || []) : [];
      setTickets([...t, ...c].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTickets(); }, []);

  const total    = tickets.length;
  const pending  = tickets.filter(t => t.status === "pending").length;
  const resolved = tickets.filter(t => t.status === "resolved").length;
  const inProg   = tickets.filter(t => t.status === "in-progress").length;

  const filtered = filter === "all" ? tickets : tickets.filter(t => t.status === filter);
  const initials = user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white">
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white text-2xl font-extrabold shadow-lg">
              {initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-2xl font-extrabold">{user?.name}</h1>
                <span className="text-xs font-bold bg-white/15 border border-white/20 px-2.5 py-1 rounded-full capitalize">{user?.role}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Mail size={14} />{user?.email}
              </div>
            </div>
            <Link
              to="/submit"
              className="flex items-center gap-2 bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform text-sm"
            >
              <Plus size={16} /> New Complaint
            </Link>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
            {[
              { label: "Total", val: total, color: "bg-white/10 border-white/20" },
              { label: "Pending", val: pending, color: "bg-amber-500/20 border-amber-400/30" },
              { label: "In Progress", val: inProg, color: "bg-blue-500/20 border-blue-400/30" },
              { label: "Resolved", val: resolved, color: "bg-emerald-500/20 border-emerald-400/30" },
            ].map(({ label, val, color }) => (
              <div key={label} className={`${color} border rounded-2xl px-4 py-3 text-center`}>
                <div className="text-xl font-black text-white">{val}</div>
                <div className="text-white/60 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-slate-500 text-sm mr-1">Filter:</span>
          {["all", "pending", "in-progress", "resolved", "rejected"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                filter === f
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-300"
              }`}
            >
              {f === "all" ? `All (${total})` : `${STATUS[f]?.label} (${tickets.filter(t => t.status === f).length})`}
            </button>
          ))}
          <button onClick={fetchTickets} className="ml-auto w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 flex items-center justify-center transition">
            <RefreshCw size={13} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 size={32} className="animate-spin text-indigo-400" />
            <p className="text-slate-400 text-sm">Loading your tickets…</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 bg-white border border-dashed border-slate-200 rounded-2xl text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4">
              <Ticket size={26} className="text-slate-300" />
            </div>
            <p className="font-bold text-slate-500 mb-2">No tickets yet</p>
            <p className="text-slate-400 text-sm mb-6">Submit your first complaint and track it here.</p>
            <Link to="/submit" className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-indigo-700 transition text-sm">
              <Plus size={16} /> Submit Complaint
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filtered.map((t, i) => <TicketCard key={t._id} ticket={t} index={i} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;