import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ticket, Users, CheckCircle2, Clock, XCircle, Loader2,
  TrendingUp, RefreshCw, ChevronDown, Search, Filter,
  AlertTriangle, MessageSquare, BarChart3, Shield,
  CalendarDays, ArrowUpRight, Zap, Eye, Send,
} from "lucide-react";
import api from "../../services/api";

// ── Status config ─────────────────────────────────────────
const STATUS = {
  pending:      { label: "Pending",     ring: "ring-amber-400/40",  badge: "bg-amber-500/10 text-amber-300 border border-amber-500/20",  dot: "bg-amber-400",  bar: "bg-amber-400"  },
  "in-progress":{ label: "In Progress", ring: "ring-blue-400/40",   badge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",     dot: "bg-blue-400",   bar: "bg-blue-400"   },
  resolved:     { label: "Resolved",    ring: "ring-emerald-400/40",badge: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20", dot: "bg-emerald-400", bar: "bg-emerald-400"},
  rejected:     { label: "Rejected",    ring: "ring-red-400/40",    badge: "bg-red-500/10 text-red-300 border border-red-500/20",         dot: "bg-red-400",    bar: "bg-red-400"    },
};

const ACTIONS = ["pending", "in-progress", "resolved", "rejected"];
const FILTERS = ["all", ...ACTIONS];

const fmt = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

// ── Mini sparkline SVG ────────────────────────────────────
const Sparkline = ({ color }) => {
  const pts = [30, 55, 40, 70, 50, 85, 60, 75, 90, 65].map((y, i) => `${i * 22},${100 - y}`).join(" ");
  return (
    <svg viewBox="0 0 198 100" className="w-full h-10 opacity-60">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// ── Stat Card ─────────────────────────────────────────────
const StatCard = ({ icon, label, value, sub, sparkColor, accent, delay, trend }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    className="relative bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 overflow-hidden hover:border-slate-600/80 transition-all duration-300 group"
  >
    <div className={`absolute top-0 left-0 w-full h-0.5 ${accent}`}/>
    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ background: sparkColor }}/>

    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent.replace("bg-gradient-to-r", "bg").replace(/from-\S+\s+to-\S+/, "")} bg-slate-700/80`}>
        {icon}
      </div>
      {trend !== undefined && (
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${trend >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
          <ArrowUpRight size={11} className={trend < 0 ? "rotate-90" : ""}/>
          {Math.abs(trend)}%
        </span>
      )}
    </div>

    <div className="text-3xl font-black text-white mb-0.5 tracking-tight">{value}</div>
    <div className="text-slate-400 text-xs font-medium mb-3">{label}</div>
    <Sparkline color={sparkColor}/>
    {sub && <div className="text-slate-500 text-xs mt-1">{sub}</div>}
  </motion.div>
);

// ── Ticket Row ────────────────────────────────────────────
const TicketRow = ({ item, index, onUpdate, updatingId }) => {
  const [remarkOpen, setRemarkOpen] = useState(false);
  const [remark, setRemark] = useState(item.adminRemark || "");
  const [expanded, setExpanded] = useState(false);
  const s = STATUS[item.status] || STATUS.pending;
  const isUpdating = updatingId === item._id;

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/70 transition-all duration-200 ring-1 ${s.ring}`}
    >
      <div className="p-5">
        {/* Header row */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3 flex-wrap">
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${s.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}/>
              {s.label}
            </span>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <CalendarDays size={11}/>
              {fmt(item.createdAt)}
            </div>
            {item.adminRemark && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20">
                <MessageSquare size={10}/> Has remark
              </span>
            )}
          </div>

          {/* User pill */}
          <div className="flex items-center gap-2 bg-slate-700/50 border border-slate-600/50 rounded-xl px-3 py-1.5">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
              {item.user?.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-slate-300 text-xs font-medium">{item.user?.name || "Unknown"}</span>
          </div>
        </div>

        {/* Message */}
        <p className="text-slate-300 text-sm leading-relaxed mb-1">
          {expanded ? item.message : (item.message.length > 150 ? item.message.slice(0, 150) + "…" : item.message)}
        </p>
        {item.message.length > 150 && (
          <button onClick={() => setExpanded(!expanded)} className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1 mb-3">
            {expanded ? "Show less" : "Read more"} <ChevronDown size={11} className={expanded ? "rotate-180 transition-transform" : "transition-transform"}/>
          </button>
        )}

        {/* Admin remark display */}
        {item.adminRemark && (
          <div className="bg-violet-500/8 border border-violet-500/20 rounded-xl px-4 py-2.5 text-sm text-violet-300 mb-3">
            <span className="text-violet-400 font-semibold">Your remark: </span>{item.adminRemark}
          </div>
        )}

        {/* Progress bar */}
        <div className="h-0.5 bg-slate-700 rounded-full overflow-hidden mb-4">
          <div className={`h-full rounded-full transition-all duration-700 ${s.bar} ${
            item.status === "resolved" || item.status === "rejected" ? "w-full" :
            item.status === "in-progress" ? "w-2/3" : "w-1/4"
          }`}/>
        </div>

        {/* Action row */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status buttons */}
          {ACTIONS.map(action => (
            <button
              key={action}
              onClick={() => onUpdate(item._id, action, remark)}
              disabled={isUpdating || item.status === action}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 border ${
                item.status === action
                  ? `${STATUS[action].badge} opacity-100 cursor-default`
                  : "bg-slate-700/50 text-slate-400 border-slate-600/50 hover:bg-slate-600/60 hover:text-slate-200 disabled:opacity-40"
              }`}
            >
              {isUpdating && item.status !== action ? (
                <Loader2 size={10} className="animate-spin"/>
              ) : (
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS[action].dot}`}/>
              )}
              {STATUS[action].label}
            </button>
          ))}

          {/* Remark toggle */}
          <button
            onClick={() => setRemarkOpen(!remarkOpen)}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition"
          >
            <MessageSquare size={12}/> {remarkOpen ? "Close" : "Add Remark"}
          </button>
        </div>

        {/* Remark input */}
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
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Type admin remark…"
                  className="flex-1 bg-slate-700/50 border border-slate-600/50 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition"
                />
                <button
                  onClick={() => { onUpdate(item._id, item.status, remark); setRemarkOpen(false); }}
                  disabled={isUpdating}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition disabled:opacity-50"
                >
                  <Send size={14}/> Save
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ── Main Admin Dashboard ──────────────────────────────────
const AdminDashboard = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const fetchComplaints = async () => {
    try {
      setFetching(true);
      const { data } = await api.get("/complaints");
      setComplaints(data.data);
    } catch (err) { console.error(err); }
    finally { setFetching(false); }
  };

  useEffect(() => { fetchComplaints(); }, []);

  const handleUpdate = async (id, status, adminRemark) => {
    try {
      setUpdatingId(id);
      await api.put(`/complaints/${id}`, { status, adminRemark });
      setComplaints(prev => prev.map(c => c._id === id ? { ...c, status, adminRemark } : c));
    } catch (err) { console.error(err); }
    finally { setUpdatingId(null); }
  };

  const total      = complaints.length;
  const pending    = complaints.filter(c => c.status === "pending").length;
  const inProgress = complaints.filter(c => c.status === "in-progress").length;
  const resolved   = complaints.filter(c => c.status === "resolved").length;
  const rejected   = complaints.filter(c => c.status === "rejected").length;
  const resolutionRate = total ? Math.round((resolved / total) * 100) : 0;

  const filtered = complaints
    .filter(c => filter === "all" || c.status === filter)
    .filter(c => !search || c.message.toLowerCase().includes(search.toLowerCase()) || c.user?.name?.toLowerCase().includes(search.toLowerCase()));

  const initials = user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100">

      {/* ── TOP HEADER BAR ── */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Left - brand + title */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <Zap size={15} className="text-white"/>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">TicketSystem</div>
              <div className="text-sm font-bold text-white leading-tight">Admin Command Center</div>
            </div>
          </div>

          {/* Right - admin pill + refresh */}
          <div className="flex items-center gap-3">
            <button
              onClick={fetchComplaints}
              className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 flex items-center justify-center transition"
            >
              <RefreshCw size={15} className={fetching ? "animate-spin" : ""}/>
            </button>
            <div className="flex items-center gap-2.5 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                {initials}
              </div>
              <div className="hidden sm:block">
                <div className="text-xs text-slate-400">Administrator</div>
                <div className="text-xs font-semibold text-white">{user?.name}</div>
              </div>
              <div className="flex items-center gap-1 ml-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-md px-1.5 py-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
                <span className="text-xs font-bold">Live</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* ── WELCOME BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-slate-800/0 border border-indigo-500/20 rounded-3xl p-7"
        >
          {/* Decorative grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ag" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#ag)"/>
          </svg>
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none"/>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-indigo-400"/>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Admin Panel</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                Good to see you, {user?.name?.split(" ")[0]} 👋
              </h1>
              <p className="text-slate-400 text-sm">
                You have <span className="text-amber-400 font-bold">{pending} pending</span> tickets awaiting action.
                Resolution rate is <span className="text-emerald-400 font-bold">{resolutionRate}%</span>.
              </p>
            </div>

            {/* Quick metric pills */}
            <div className="flex gap-3 flex-wrap">
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-white">{total}</div>
                <div className="text-slate-500 text-xs">Total</div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-amber-400">{pending}</div>
                <div className="text-slate-500 text-xs">Pending</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-emerald-400">{resolutionRate}%</div>
                <div className="text-slate-500 text-xs">Resolved</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Ticket size={18} className="text-indigo-400"/>} label="Total Tickets" value={total} sparkColor="#818CF8" accent="bg-gradient-to-r from-indigo-500 to-purple-500" delay={0} trend={12}/>
          <StatCard icon={<Clock size={18} className="text-amber-400"/>} label="Pending Review" value={pending} sparkColor="#FCD34D" accent="bg-gradient-to-r from-amber-500 to-orange-500" delay={0.07} trend={-5}/>
          <StatCard icon={<TrendingUp size={18} className="text-blue-400"/>} label="In Progress" value={inProgress} sparkColor="#60A5FA" accent="bg-gradient-to-r from-blue-500 to-cyan-500" delay={0.14} trend={8}/>
          <StatCard icon={<CheckCircle2 size={18} className="text-emerald-400"/>} label="Resolved" value={resolved} sparkColor="#34D399" accent="bg-gradient-to-r from-emerald-500 to-teal-500" delay={0.21} trend={22}/>
        </div>

        {/* ── RESOLUTION BAR ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 border border-slate-700/60 rounded-2xl p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BarChart3 size={16} className="text-slate-400"/>
              <span className="text-sm font-semibold text-slate-300">Ticket Distribution</span>
            </div>
            <span className="text-xs text-slate-500">{total} total</span>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
            {[
              { count: pending, color: "bg-amber-400" },
              { count: inProgress, color: "bg-blue-400" },
              { count: resolved, color: "bg-emerald-400" },
              { count: rejected, color: "bg-red-400" },
            ].map((seg, i) => total > 0 && (
              <div
                key={i}
                className={`${seg.color} transition-all duration-700 rounded-full`}
                style={{ width: `${(seg.count / total) * 100}%` }}
              />
            ))}
            {total === 0 && <div className="bg-slate-700 w-full rounded-full"/>}
          </div>
          <div className="flex gap-4 mt-3 flex-wrap">
            {[
              { label: "Pending", val: pending, color: "bg-amber-400" },
              { label: "In Progress", val: inProgress, color: "bg-blue-400" },
              { label: "Resolved", val: resolved, color: "bg-emerald-400" },
              { label: "Rejected", val: rejected, color: "bg-red-400" },
            ].map((l, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className={`w-2 h-2 rounded-full ${l.color}`}/>
                {l.label} <span className="font-bold text-slate-300">{l.val}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── TICKET TABLE ── */}
        <div>
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tickets or users…"
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition"
              />
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-1.5 bg-slate-800/60 border border-slate-700/60 rounded-xl p-1">
              <Filter size={13} className="text-slate-500 ml-1.5"/>
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 capitalize ${
                    filter === f
                      ? "bg-indigo-600 text-white shadow-md"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {f === "all" ? `All (${total})` : `${STATUS[f]?.label} (${complaints.filter(c => c.status === f).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Eye size={14} className="text-slate-500"/>
              <span className="text-slate-500 text-sm">
                Showing <span className="text-slate-300 font-semibold">{filtered.length}</span> ticket{filtered.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Tickets */}
          {fetching ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                  <Loader2 size={28} className="animate-spin text-indigo-400"/>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 animate-pulse"/>
              </div>
              <p className="text-slate-500 text-sm">Loading tickets…</p>
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-24 bg-slate-800/30 border border-dashed border-slate-700 rounded-2xl text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
                <AlertTriangle size={26} className="text-slate-600"/>
              </div>
              <p className="font-bold text-slate-400 mb-1">No tickets found</p>
              <p className="text-slate-600 text-sm">
                {search ? `No results matching "${search}"` : "No tickets match this filter."}
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {filtered.map((item, i) => (
                <TicketRow
                  key={item._id}
                  item={item}
                  index={i}
                  onUpdate={handleUpdate}
                  updatingId={updatingId}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;