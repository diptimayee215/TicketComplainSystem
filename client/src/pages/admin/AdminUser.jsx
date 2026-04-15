import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../services/api";
import {
  Trash2, Users, Shield, UserCheck, Search,
  Loader2, AlertTriangle, RefreshCw, UserX,
  Crown, X, AlertCircle,
} from "lucide-react";

// ── Confirm Modal ─────────────────────────────────────────
const ConfirmModal = ({ user, onConfirm, onCancel }) => (
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
            <h3 className="font-bold text-white text-sm">Delete User</h3>
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
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{user?.name}</div>
            <div className="text-slate-400 text-xs">{user?.email}</div>
          </div>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Are you sure you want to permanently delete this user? All associated data will be removed and cannot be recovered.
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 pb-5 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-400 hover:text-white hover:border-slate-500 text-sm font-semibold transition"
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

// ── User Row ──────────────────────────────────────────────
const UserRow = ({ user, index, onDelete }) => {
  const isAdmin = user.role === "admin";
  const initials = user.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 16 }}
      transition={{ delay: index * 0.04 }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 hover:border-slate-600/70 hover:bg-slate-800/70 transition-all duration-200 group"
    >
      {/* User info */}
      <div className="flex items-center gap-4 min-w-0">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-900/40">
            {initials}
          </div>
          {isAdmin && (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-md bg-amber-500 flex items-center justify-center shadow-sm">
              <Crown size={8} className="text-white"/>
            </div>
          )}
        </div>

        {/* Name + email */}
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-white font-semibold text-sm truncate">{user.name}</span>
            <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full border ${
              isAdmin
                ? "bg-amber-500/10 text-amber-300 border-amber-500/20"
                : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
            }`}>
              {isAdmin ? <Crown size={9}/> : <UserCheck size={9}/>}
              {user.role}
            </span>
          </div>
          <div className="text-slate-500 text-xs mt-0.5 truncate">{user.email}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 shrink-0">
        {/* ID chip */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-700/50 border border-slate-600/40 rounded-xl px-3 py-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-500"/>
          <span className="text-slate-500 text-xs font-mono">{user._id?.slice(-8)}</span>
        </div>

        {/* Delete */}
        <button
          onClick={() => onDelete(user)}
          disabled={isAdmin}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
            isAdmin
              ? "bg-slate-700/30 border border-slate-700/30 text-slate-700 cursor-not-allowed"
              : "bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 hover:scale-105"
          }`}
          title={isAdmin ? "Cannot delete admin" : "Delete user"}
        >
          <Trash2 size={15}/>
        </button>
      </div>
    </motion.div>
  );
};

// ── Main Component ────────────────────────────────────────
const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data.data);
    } catch {
      // handle silently
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleDeleteConfirm = async () => {
    if (!confirmTarget) return;
    try {
      setDeleting(true);
      await api.delete(`/admin/users/${confirmTarget._id}`);
      setUsers(prev => prev.filter(u => u._id !== confirmTarget._id));
      setConfirmTarget(null);
    } catch {
      // handle silently
    } finally {
      setDeleting(false);
    }
  };

  const totalUsers  = users.length;
  const adminCount  = users.filter(u => u.role === "admin").length;
  const regularCount = users.filter(u => u.role === "user").length;

  const filtered = users
    .filter(u => roleFilter === "all" || u.role === roleFilter)
    .filter(u =>
      !search ||
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100">

      {/* ── TOP HEADER BAR ── */}
      <div className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
              <Shield size={15} className="text-white"/>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">TicketSystem</div>
              <div className="text-sm font-bold text-white leading-tight">User Management</div>
            </div>
          </div>

          <button
            onClick={fetchUsers}
            className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-600 flex items-center justify-center transition"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""}/>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">

        {/* ── WELCOME BANNER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-slate-800/0 border border-indigo-500/20 rounded-3xl p-7"
        >
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ug" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#ug)"/>
          </svg>
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none"/>

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-indigo-400"/>
                <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">User Management</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white mb-2 tracking-tight">
                Manage All Users
              </h1>
              <p className="text-slate-400 text-sm">
                <span className="text-white font-bold">{totalUsers}</span> registered accounts —{" "}
                <span className="text-amber-400 font-bold">{adminCount}</span> admin{adminCount !== 1 ? "s" : ""},{" "}
                <span className="text-emerald-400 font-bold">{regularCount}</span> regular user{regularCount !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-3">
              <div className="bg-slate-800/60 border border-slate-700 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-white">{totalUsers}</div>
                <div className="text-slate-500 text-xs">Total</div>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-amber-400">{adminCount}</div>
                <div className="text-slate-500 text-xs">Admins</div>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-black text-emerald-400">{regularCount}</div>
                <div className="text-slate-500 text-xs">Users</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── CONTROLS ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500"/>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition"
            />
          </div>

          {/* Role filter */}
          <div className="flex items-center gap-1 bg-slate-800/60 border border-slate-700/60 rounded-xl p-1">
            {["all", "user", "admin"].map(r => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all duration-150 ${
                  roleFilter === r
                    ? "bg-indigo-600 text-white shadow-md"
                    : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {r === "all" ? `All (${totalUsers})` : r === "admin" ? `Admins (${adminCount})` : `Users (${regularCount})`}
              </button>
            ))}
          </div>
        </div>

        {/* ── RESULT COUNT ── */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Users size={14}/>
          Showing <span className="text-slate-300 font-semibold mx-1">{filtered.length}</span>
          user{filtered.length !== 1 ? "s" : ""}
          {search && <span className="text-slate-600">matching "<span className="text-slate-400">{search}</span>"</span>}
        </div>

        {/* ── USER LIST ── */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Loader2 size={28} className="animate-spin text-indigo-400"/>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-500 animate-pulse"/>
            </div>
            <p className="text-slate-500 text-sm">Loading users…</p>
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 bg-slate-800/30 border border-dashed border-slate-700 rounded-2xl text-center"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
              <UserX size={26} className="text-slate-600"/>
            </div>
            <p className="font-bold text-slate-400 mb-1">No users found</p>
            <p className="text-slate-600 text-sm">
              {search ? `No results for "${search}"` : "No users match this filter."}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filtered.map((user, i) => (
                <UserRow
                  key={user._id}
                  user={user}
                  index={i}
                  onDelete={(u) => setConfirmTarget(u)}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── CONFIRM MODAL ── */}
      <AnimatePresence>
        {confirmTarget && (
          <ConfirmModal
            user={confirmTarget}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setConfirmTarget(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminUser;