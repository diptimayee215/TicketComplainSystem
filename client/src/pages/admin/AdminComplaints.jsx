import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import ComplaintModal from "../../components/ComplaintModal";
import {
  Eye, Edit, Trash2, Search, RefreshCw, Shield,
  Loader2, AlertTriangle, Ticket, Filter,
  CalendarDays, X, AlertCircle, ChevronDown,
  MessageSquare,
} from "lucide-react";

// ── Status config ─────────────────────────────────────────
const STATUS = {
  pending:       { label: "Pending",     badge: "bg-amber-500/10 text-amber-300 border border-amber-500/20",      dot: "bg-amber-400"   },
  "in-progress": { label: "In Progress", badge: "bg-blue-500/10 text-blue-300 border border-blue-500/20",         dot: "bg-blue-400"    },
  resolved:      { label: "Resolved",    badge: "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20", dot: "bg-emerald-400" },
  rejected:      { label: "Rejected",    badge: "bg-red-500/10 text-red-300 border border-red-500/20",             dot: "bg-red-400"     },
};

const FILTERS = ["all", "pending", "in-progress", "resolved", "rejected"];

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : null;

// ── Confirm Delete Modal ──────────────────────────────────
// FIX: was "bg-red-800" — changed to "bg-slate-800" so text is readable
const ConfirmModal = ({ complaint, onConfirm, onCancel }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 24 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden"
    >
      {/* Header */}
      <div className="bg-red-500/10 border-b border-red-500/20 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
            <AlertCircle size={18} className="text-red-400"/>
          </div>
          <div>
            <h3 className="font-bold text-white text-sm">Delete Complaint</h3>
            <p className="text-red-400/80 text-xs">This action is irreversible</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="w-7 h-7 rounded-lg bg-slate-700/60 text-slate-400 hover:text-white flex items-center justify-center transition"
        >
          <X size={14}/>
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        <div className="flex items-center gap-3 bg-slate-700/40 border border-slate-600/40 rounded-2xl p-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
            {complaint?.user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-white font-semibold text-sm">{complaint?.user?.name}</div>
            <div className="text-slate-400 text-xs truncate">{complaint?.message?.slice(0, 50)}…</div>
          </div>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">
          Are you sure you want to permanently delete this complaint? This cannot be undone.
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 pb-5 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 hover:text-white hover:border-slate-500 text-sm font-semibold transition"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-sm font-bold transition flex items-center justify-center gap-2"
        >
          <Trash2 size={14}/> Delete
        </button>
      </div>
    </motion.div>
  </motion.div>
);

// ── Complaint Card ────────────────────────────────────────
const ComplaintCard = ({ item, index, onView, onEdit, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const s = STATUS[item.status] || STATUS.pending;
  const isLong = item.message?.length > 130;
  const preview = isLong ? item.message.slice(0, 130) + "…" : item.message;
  const initials = item.user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ delay: index * 0.04 }}
      className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600/70 hover:bg-slate-800/70 transition-all duration-200"
    >
      {/* Top row */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-900/40 shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-white font-semibold text-sm">{item.user?.name}</div>
            <div className="text-slate-500 text-xs truncate">{item.user?.email}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full ${s.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}/>
            {s.label}
          </span>
          {item.createdAt && (
            <div className="hidden md:flex items-center gap-1.5 bg-slate-700/50 border border-slate-600/40 rounded-xl px-3 py-1.5">
              <CalendarDays size={11} className="text-slate-500"/>
              <span className="text-slate-500 text-xs">{fmt(item.createdAt)}</span>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-700/60 mb-4"/>

      {/* Message */}
      <div className="flex items-start gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg bg-slate-700/60 border border-slate-600/40 flex items-center justify-center shrink-0 mt-0.5">
          <MessageSquare size={13} className="text-slate-400"/>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-slate-300 text-sm leading-relaxed">
            {expanded ? item.message : preview}
          </p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1 mt-1.5 font-medium"
            >
              {expanded ? "Show less" : "Read more"}
              <ChevronDown size={11} className={`transition-transform ${expanded ? "rotate-180" : ""}`}/>
            </button>
          )}
        </div>
      </div>

      {/* Admin remark */}
      {item.adminRemark && (
        <div className="bg-violet-500/10 border border-violet-500/20 rounded-xl px-4 py-2.5 text-sm text-violet-300 mb-4">
          <span className="text-violet-400 font-semibold">Admin remark: </span>{item.adminRemark}
        </div>
      )}

      {/* Progress bar */}
      <div className="h-0.5 bg-slate-700 rounded-full overflow-hidden mb-4">
        <div className={`h-full rounded-full transition-all duration-700 ${s.dot} ${
          item.status === "resolved" || item.status === "rejected" ? "w-full" :
          item.status === "in-progress" ? "w-2/3" : "w-1/4"
        }`}/>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onView(item)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/40 text-xs font-semibold transition-all duration-150"
        >
          <Eye size={13}/> View
        </button>
        <button
          onClick={() => onEdit(item)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/40 text-xs font-semibold transition-all duration-150"
        >
          <Edit size={13}/> Update
        </button>
        <button
          onClick={() => onDelete(item)}
          className="ml-auto flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 text-xs font-semibold transition-all duration-150"
        >
          <Trash2 size={13}/> Delete
        </button>
      </div>
    </motion.div>
  );
};

// ── Main Component ────────────────────────────────────────
const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/tickets");
      console.log(data)
      setComplaints(data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchComplaints(); }, []);

  const handleDeleteConfirm = async () => {
    if (!confirmTarget) return;
    try {
      await api.delete(`/complaints/${confirmTarget._id}`);
      setComplaints(prev => prev.filter(c => c._id !== confirmTarget._id));
      setConfirmTarget(null);
    } catch (err) { console.error(err); }
  };

  const total      = complaints.length;
  const pending    = complaints.filter(c => c.status === "pending").length;
  const inProgress = complaints.filter(c => c.status === "in-progress").length;
  const resolved   = complaints.filter(c => c.status === "resolved").length;

  const filtered = complaints
    .filter(c => filter === "all" || c.status === filter)
    .filter(c =>
      !search ||
      c.message?.toLowerCase().includes(search.toLowerCase()) ||
      c.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.user?.email?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100">

      {/* ── STICKY HEADER ── */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <Shield size={15} className="text-white"/>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">TicketSystem</div>
              <div className="text-sm font-bold text-white leading-tight">Complaint Management</div>
            </div>
          </div>
          <button
            onClick={fetchComplaints}
            className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 flex items-center justify-center transition"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""}/>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* ── BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-slate-800/0 border border-indigo-500/20 rounded-3xl p-7"
        >
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="acg" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#acg)"/>
          </svg>
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none"/>
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Ticket size={16} className="text-indigo-400"/>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Complaints</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">Complaint Management</h1>
              <p className="text-slate-400 text-sm">
                <span className="text-white font-bold">{total}</span> total complaints —{" "}
                <span className="text-amber-400 font-bold">{pending}</span> pending action
              </p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-white">{total}</div>
                <div className="text-slate-500 text-xs">Total</div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-amber-400">{pending}</div>
                <div className="text-slate-500 text-xs">Pending</div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-blue-400">{inProgress}</div>
                <div className="text-slate-500 text-xs">In Progress</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-emerald-400">{resolved}</div>
                <div className="text-slate-500 text-xs">Resolved</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CONTROLS ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by message, user name or email…"
              className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition"
            />
          </div>
          <div className="flex items-center gap-1 bg-slate-800/60 border border-slate-700/60 rounded-xl p-1">
            <Filter size={13} className="text-slate-500 ml-1.5"/>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 capitalize ${
                  filter === f ? "bg-indigo-600 text-white shadow-md" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {f === "all" ? `All (${total})` : `${STATUS[f]?.label} (${complaints.filter(c => c.status === f).length})`}
              </button>
            ))}
          </div>
        </div>

        {/* ── RESULT COUNT ── */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Ticket size={14}/>
          Showing <span className="text-slate-300 font-semibold mx-1">{filtered.length}</span>
          complaint{filtered.length !== 1 ? "s" : ""}
          {search && <span className="text-slate-600"> matching "<span className="text-slate-400">{search}</span>"</span>}
        </div>

        {/* ── LIST ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Loader2 size={28} className="animate-spin text-indigo-400"/>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 animate-pulse"/>
            </div>
            <p className="text-slate-500 text-sm">Loading complaints…</p>
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
            <p className="font-bold text-slate-400 mb-1">No complaints found</p>
            <p className="text-slate-600 text-sm">
              {search ? `No results for "${search}"` : "No complaints match this filter."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <ComplaintCard
                  key={item._id}
                  item={item}
                  index={i}
                  onView={(c) => { setSelectedComplaint(c); setModalType("view"); }}
                  onEdit={(c) => { setSelectedComplaint(c); setModalType("update"); }}
                  onDelete={(c) => setConfirmTarget(c)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── COMPLAINT MODAL (View / Update) ── */}
      {selectedComplaint && (
        <ComplaintModal
          complaint={selectedComplaint}
          type={modalType}
          onClose={() => setSelectedComplaint(null)}
          refresh={fetchComplaints}
        />
      )}

      {/* ── CONFIRM DELETE MODAL ── */}
      <AnimatePresence>
        {confirmTarget && (
          <ConfirmModal
            complaint={confirmTarget}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setConfirmTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminComplaints;