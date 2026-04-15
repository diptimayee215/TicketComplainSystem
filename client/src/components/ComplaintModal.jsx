import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../services/api";
import {
  X, Eye, Edit, Mail, CalendarDays,
  MessageSquare, Shield, Send, Loader2,
  CheckCircle2, Clock, XCircle, TrendingUp,
} from "lucide-react";

const STATUS = {
  pending:       { label: "Pending",     badge: "bg-amber-500/15 text-amber-300 border border-amber-500/30",    dot: "bg-amber-400"   },
  "in-progress": { label: "In Progress", badge: "bg-blue-500/15 text-blue-300 border border-blue-500/30",       dot: "bg-blue-400"    },
  resolved:      { label: "Resolved",    badge: "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30", dot: "bg-emerald-400" },
  rejected:      { label: "Rejected",    badge: "bg-red-500/15 text-red-300 border border-red-500/30",           dot: "bg-red-400"     },
};

const fmt = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "—";

const ViewModal = ({ complaint, onClose }) => {
  const s = STATUS[complaint.status] || STATUS.pending;
  const initials = complaint.user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-b border-slate-700 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
            <Eye size={17} className="text-blue-400"/>
          </div>
          <div>
            <h2 className="font-bold text-white text-base">Complaint Details</h2>
            <p className="text-slate-400 text-xs">Read-only view</p>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-700/60 hover:bg-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition">
          <X size={16}/>
        </button>
      </div>
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-4 bg-slate-700/40 border border-slate-600/50 rounded-2xl p-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-base shadow-md shrink-0">
            {initials}
          </div>
          <div>
            <div className="text-white font-bold text-sm">{complaint.user?.name || "Unknown"}</div>
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-0.5">
              <Mail size={11}/>{complaint.user?.email || "—"}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-700/30 border border-slate-600/40 rounded-2xl p-4">
            <div className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wide">Status</div>
            <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${s.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}/>{s.label}
            </span>
          </div>
          <div className="bg-slate-700/30 border border-slate-600/40 rounded-2xl p-4">
            <div className="text-slate-500 text-xs font-medium mb-2 uppercase tracking-wide">Submitted</div>
            <div className="flex items-center gap-1.5 text-slate-200 text-xs font-semibold">
              <CalendarDays size={12} className="text-slate-400"/>{fmt(complaint.createdAt)}
            </div>
          </div>
        </div>
        <div className="bg-slate-700/30 border border-slate-600/40 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-lg bg-slate-600/60 flex items-center justify-center">
              <MessageSquare size={12} className="text-slate-300"/>
            </div>
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wide">Message</span>
          </div>
          <p className="text-slate-100 text-sm leading-relaxed">{complaint.message}</p>
        </div>
        {complaint.adminRemark && (
          <div className="bg-violet-500/10 border border-violet-500/25 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <Shield size={12} className="text-violet-400"/>
              </div>
              <span className="text-violet-400 text-xs font-bold uppercase tracking-wide">Admin Remark</span>
            </div>
            <p className="text-violet-100 text-sm leading-relaxed">{complaint.adminRemark}</p>
          </div>
        )}
        <div>
          <div className="flex justify-between text-xs text-slate-500 mb-2">
            <span>Resolution Progress</span>
            <span className="text-slate-300 font-medium">
              {complaint.status === "resolved" || complaint.status === "rejected" ? "100%" : complaint.status === "in-progress" ? "66%" : "25%"}
            </span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-700 ${s.dot} ${complaint.status === "resolved" || complaint.status === "rejected" ? "w-full" : complaint.status === "in-progress" ? "w-2/3" : "w-1/4"}`}/>
          </div>
        </div>
      </div>
      <div className="px-6 pb-6">
        <button onClick={onClose} className="w-full py-3 rounded-2xl bg-slate-700 hover:bg-slate-600 text-slate-200 font-semibold text-sm transition flex items-center justify-center gap-2">
          <X size={15}/> Close
        </button>
      </div>
    </div>
  );
};

const UpdateModal = ({ complaint, onClose, refresh }) => {
  const [status, setStatus] = useState(complaint.status || "pending");
  const [adminRemark, setAdminRemark] = useState(complaint.adminRemark || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const initials = complaint.user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      await api.put(`/complaints/${complaint._id}`, { status, adminRemark });
      setSuccess(true);
      refresh();
      setTimeout(() => { onClose(); }, 1200);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "pending",     label: "Pending",     color: "border-amber-500/40 bg-amber-500/10 text-amber-300",     dot: "bg-amber-400"   },
    { value: "in-progress", label: "In Progress", color: "border-blue-500/40 bg-blue-500/10 text-blue-300",        dot: "bg-blue-400"    },
    { value: "resolved",    label: "Resolved",    color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300", dot: "bg-emerald-400" },
    { value: "rejected",    label: "Rejected",    color: "border-red-500/40 bg-red-500/10 text-red-300",           dot: "bg-red-400"     },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border-b border-slate-700 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
            <Edit size={17} className="text-emerald-400"/>
          </div>
          <div>
            <h2 className="font-bold text-white text-base">Update Complaint</h2>
            <p className="text-slate-400 text-xs">Change status and add a remark</p>
          </div>
        </div>
        <button onClick={onClose} className="w-8 h-8 rounded-xl bg-slate-700/60 hover:bg-slate-600 text-slate-400 hover:text-white flex items-center justify-center transition">
          <X size={16}/>
        </button>
      </div>
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-3 bg-slate-700/40 border border-slate-600/50 rounded-2xl p-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <div className="text-white font-semibold text-sm">{complaint.user?.name}</div>
            <div className="text-slate-400 text-xs truncate">{complaint.message?.slice(0, 55)}{complaint.message?.length > 55 ? "…" : ""}</div>
          </div>
        </div>
        <div>
          <label className="block text-slate-300 text-xs font-bold uppercase tracking-wide mb-3">Update Status</label>
          <div className="grid grid-cols-2 gap-2">
            {statusOptions.map(opt => (
              <button
                key={opt.value}
                onClick={() => setStatus(opt.value)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border-2 text-sm font-semibold transition-all duration-150 ${status === opt.value ? `${opt.color} border-opacity-100 scale-[1.02] shadow-lg` : "bg-slate-700/30 border-slate-600/40 text-slate-400 hover:border-slate-500 hover:text-slate-200"}`}
              >
                <span className={`w-2 h-2 rounded-full shrink-0 ${status === opt.value ? opt.dot : "bg-slate-600"}`}/>
                {opt.label}
                {status === opt.value && <CheckCircle2 size={14} className="ml-auto shrink-0"/>}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-slate-300 text-xs font-bold uppercase tracking-wide mb-2">
            Admin Remark <span className="text-slate-600 normal-case font-normal">(optional)</span>
          </label>
          <textarea
            value={adminRemark}
            onChange={(e) => setAdminRemark(e.target.value)}
            placeholder="Add a remark for the user about this complaint…"
            rows={3}
            className="w-full bg-slate-700/40 border border-slate-600/60 rounded-2xl px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 resize-none transition leading-relaxed"
          />
        </div>
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl px-4 py-3"
            >
              <CheckCircle2 size={16} className="text-emerald-400"/>
              <span className="text-emerald-300 text-sm font-semibold">Complaint updated successfully!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="px-6 pb-6 flex gap-3">
        <button onClick={onClose} disabled={loading} className="flex-1 py-3 rounded-2xl border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 text-sm font-semibold transition disabled:opacity-50">
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          disabled={loading || success}
          className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {loading ? <><Loader2 size={15} className="animate-spin"/> Saving…</> : success ? <><CheckCircle2 size={15}/> Saved!</> : <><Send size={15}/> Save Changes</>}
        </button>
      </div>
    </div>
  );
};

const ComplaintModal = ({ complaint, type, onClose, refresh }) => {
  if (!complaint) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 24 }}
          className="w-full max-w-lg"
        >
          {type === "view" ? (
            <ViewModal complaint={complaint} onClose={onClose}/>
          ) : (
            <UpdateModal complaint={complaint} onClose={onClose} refresh={refresh}/>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComplaintModal;