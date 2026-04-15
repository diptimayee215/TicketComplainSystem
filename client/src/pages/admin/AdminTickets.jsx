// import { useEffect, useState } from "react";
// import api from "../../services/api";

// const MyTickets = () => {
//   const [tickets, setTickets] = useState([]);

//   useEffect(() => {
//     api.get("/tickets/my").then(res => setTickets(res.data));
//   }, []);

//   return (
//     <div>
//       {tickets.map(t => (
//         <div key={t._id}>
//           <h4>{t.subject}</h4>
//           <p>Status: {t.status}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyTickets;


import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import {
  Ticket, Search, RefreshCw, Filter, Loader2,
  AlertTriangle, CalendarDays, ChevronDown,
  Train, Bus, Plane, Film, ShoppingBag, Package, HelpCircle,
  CheckCircle2, Clock, XCircle, AlertCircle, X, Trash2,
  Eye, MessageSquare, Send,
} from "lucide-react";

const STATUS = {
  pending:       { label: "Pending",     badge: "bg-amber-500/10 text-amber-300 border border-amber-500/20",       dot: "bg-amber-400"   },
  "in-progress": { label: "In Progress", badge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",          dot: "bg-blue-400"    },
  resolved:      { label: "Resolved",    badge: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20", dot: "bg-emerald-400" },
  rejected:      { label: "Rejected",    badge: "bg-red-500/10 text-red-300 border border-red-500/20",              dot: "bg-red-400"     },
};

const PRIORITY = {
  low:    { label: "Low",    badge: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" },
  medium: { label: "Medium", badge: "bg-amber-500/10 text-amber-300 border border-amber-500/20"       },
  high:   { label: "High",   badge: "bg-red-500/10 text-red-300 border border-red-500/20"             },
};

const CATEGORY_ICONS = {
  train: Train, bus: Bus, flight: Plane, movie: Film,
  shopping: ShoppingBag, delivery: Package, other: HelpCircle,
};

const FILTERS = ["all", "pending", "in-progress", "resolved", "rejected"];
const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

const TicketCard = ({ item, index, onUpdateStatus, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const [remarkOpen, setRemarkOpen] = useState(false);
  const [remark, setRemark] = useState(item.adminRemark || "");
  const [updating, setUpdating] = useState(false);
  const s = STATUS[item.status] || STATUS.pending;
  const p = PRIORITY[item.priority] || PRIORITY.medium;
  const CatIcon = CATEGORY_ICONS[item.category] || HelpCircle;
  const isLong = item.description?.length > 140;
  const preview = isLong ? item.description.slice(0, 140) + "…" : item.description;
  const initials = item.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const handleStatus = async (newStatus) => {
    setUpdating(true);
    await onUpdateStatus(item._id, newStatus, remark);
    setUpdating(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ delay: index * 0.04 }}
      className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600/70 hover:bg-slate-800/70 transition-all duration-200"
    >
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-white font-semibold text-sm">{item.name || item.user?.name || "Unknown"}</div>
            <div className="text-slate-500 text-xs truncate">{item.email || item.user?.email}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${s.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />{s.label}
          </span>
          <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full border ${p.badge}`}>
            {p.label}
          </span>
          <div className="hidden md:flex items-center gap-1.5 bg-slate-700/50 border border-slate-600/40 rounded-xl px-3 py-1.5">
            <CatIcon size={11} className="text-slate-500" />
            <span className="text-slate-500 text-xs capitalize">{item.category || "General"}</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 bg-slate-700/50 border border-slate-600/40 rounded-xl px-3 py-1.5">
            <CalendarDays size={11} className="text-slate-500" />
            <span className="text-slate-500 text-xs">{fmt(item.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700/60 mb-4" />

      {/* Subject */}
      {item.subject && (
        <div className="text-white font-semibold text-sm mb-2">{item.subject}</div>
      )}

      {/* Description */}
      <div className="flex items-start gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg bg-slate-700/60 border border-slate-600/40 flex items-center justify-center shrink-0 mt-0.5">
          <MessageSquare size={13} className="text-slate-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-300 text-sm leading-relaxed">{expanded ? item.description : preview}</p>
          {isLong && (
            <button onClick={() => setExpanded(!expanded)} className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1 mt-1.5 font-medium">
              {expanded ? "Show less" : "Read more"}
              <ChevronDown size={11} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>
          )}
        </div>
      </div>

      {item.adminRemark && (
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-2.5 text-sm text-violet-300 mb-4">
          <span className="text-violet-400 font-semibold">Admin remark: </span>{item.adminRemark}
        </div>
      )}

      {/* Progress */}
      <div className="h-0.5 bg-slate-700 rounded-full overflow-hidden mb-4">
        <div className={`h-full rounded-full transition-all duration-700 ${s.dot} ${
          item.status === "resolved" || item.status === "rejected" ? "w-full" :
          item.status === "in-progress" ? "w-2/3" : "w-1/4"
        }`} />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {["pending", "in-progress", "resolved", "rejected"].map(action => (
          <button
            key={action}
            onClick={() => handleStatus(action)}
            disabled={updating || item.status === action}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              item.status === action
                ? `${STATUS[action].badge} cursor-default`
                : "bg-slate-700/50 text-slate-400 border-slate-600/50 hover:bg-slate-600/60 hover:text-slate-200 disabled:opacity-40"
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS[action].dot}`} />
            {STATUS[action].label}
          </button>
        ))}
        <button
          onClick={() => setRemarkOpen(!remarkOpen)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition"
        >
          <MessageSquare size={12} /> Remark
        </button>
        <button
          onClick={() => onDelete(item._id)}
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition"
        >
          <Trash2 size={12} /> Delete
        </button>
      </div>

      <AnimatePresence>
        {remarkOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden mt-3"
          >
            <div className="flex gap-2">
              <input
                value={remark}
                onChange={e => setRemark(e.target.value)}
                placeholder="Add admin remark…"
                className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
              />
              <button
                onClick={() => { handleStatus(item.status); setRemarkOpen(false); }}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition flex items-center gap-1.5"
              >
                <Send size={14} /> Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const AdminTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const res = await api.get("/tickets");
      setTickets(res.data?.data || res.data || []);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTickets(); }, []);

  const handleUpdateStatus = async (id, status, adminRemark) => {
    try {
      await api.put(`/tickets/${id}`, { status, adminRemark });
      setTickets(prev => prev.map(t => t._id === id ? { ...t, status, adminRemark } : t));
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tickets/${id}`);
      setTickets(prev => prev.filter(t => t._id !== id));
    } catch (err) { console.error(err); }
  };

  const total = tickets.length;
  const filtered = tickets
    .filter(t => filter === "all" || t.status === filter)
    .filter(t =>
      !search ||
      t.subject?.toLowerCase().includes(search.toLowerCase()) ||
      t.name?.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Ticket size={15} className="text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">TicketSystem</div>
              <div className="text-sm font-bold text-white leading-tight">Ticket Management</div>
            </div>
          </div>
          <button onClick={fetchTickets} className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-slate-800/0 border border-indigo-500/20 rounded-3xl p-7"
        >
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Ticket size={16} className="text-indigo-400" />
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Tickets</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-2">Ticket Management</h1>
              <p className="text-slate-400 text-sm">
                <span className="text-white font-bold">{total}</span> total tickets —{" "}
                <span className="text-amber-400 font-bold">{tickets.filter(t => t.status === "pending").length}</span> pending
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              {[
                { label: "Total", val: total, cls: "bg-slate-800/60 border-slate-700 text-white" },
                { label: "Pending", val: tickets.filter(t => t.status === "pending").length, cls: "bg-amber-500/10 border-amber-500/20 text-amber-400" },
                { label: "In Progress", val: tickets.filter(t => t.status === "in-progress").length, cls: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
                { label: "Resolved", val: tickets.filter(t => t.status === "resolved").length, cls: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
              ].map(({ label, val, cls }) => (
                <div key={label} className={`border rounded-2xl px-5 py-3 text-center ${cls}`}>
                  <div className="text-2xl font-black">{val}</div>
                  <div className="text-slate-500 text-xs">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search tickets by subject, name…"
              className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-800/60 border border-slate-700/60 rounded-xl p-1">
            <Filter size={13} className="text-slate-500 ml-1.5" />
            {FILTERS.map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition capitalize ${
                  filter === f ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {f === "all" ? `All (${total})` : `${STATUS[f]?.label} (${tickets.filter(t => t.status === f).length})`}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Ticket size={14} />
          Showing <span className="text-slate-300 font-semibold mx-1">{filtered.length}</span> ticket{filtered.length !== 1 ? "s" : ""}
        </div>

        {/* List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
              <Loader2 size={28} className="animate-spin text-indigo-400" />
            </div>
            <p className="text-slate-500 text-sm">Loading tickets…</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 bg-slate-800/30 border border-dashed border-slate-700 rounded-2xl text-center"
          >
            <AlertTriangle size={26} className="text-slate-600 mb-4" />
            <p className="font-bold text-slate-400 mb-1">No tickets found</p>
            <p className="text-slate-600 text-sm">{search ? `No results for "${search}"` : "No tickets match this filter."}</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <TicketCard key={item._id} item={item} index={i} onUpdateStatus={handleUpdateStatus} onDelete={handleDelete} />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTickets;