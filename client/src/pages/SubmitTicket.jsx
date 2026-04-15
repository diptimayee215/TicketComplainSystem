// import { useState } from "react";
// import api from "../services/api";

// const SubmitTicket = () => {
//   const [subject, setSubject] = useState("");
//   const [description, setDescription] = useState("");

//   const submit = async () => {
//     await api.post("/tickets", { subject, description });
//     alert("Ticket submitted");
//   };

//   return (
//     <>
//       <input onChange={e => setSubject(e.target.value)} placeholder="Subject" />
//       <textarea onChange={e => setDescription(e.target.value)} />
//       <button onClick={submit}>Submit</button>
//     </>
//   );
// };

// export default SubmitTicket;


import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  Send, CheckCircle2, Loader2, AlertCircle,
  Train, Bus, Plane, Film, ShoppingBag,
  Package, HelpCircle, ChevronDown, ArrowLeft,
  Ticket, FileText, User, Mail, Phone,
} from "lucide-react";

const CATEGORIES = [
  { value: "train",    label: "Train",         icon: Train,       color: "from-blue-500 to-cyan-500",    bg: "bg-blue-50",    text: "text-blue-600",    border: "border-blue-200"    },
  { value: "bus",      label: "Bus",           icon: Bus,         color: "from-green-500 to-emerald-500",bg: "bg-green-50",   text: "text-green-600",   border: "border-green-200"   },
  { value: "flight",   label: "Flight",        icon: Plane,       color: "from-sky-500 to-blue-500",     bg: "bg-sky-50",     text: "text-sky-600",     border: "border-sky-200"     },
  { value: "movie",    label: "Movie",         icon: Film,        color: "from-purple-500 to-violet-500",bg: "bg-purple-50",  text: "text-purple-600",  border: "border-purple-200"  },
  { value: "shopping", label: "Shopping",      icon: ShoppingBag, color: "from-pink-500 to-rose-500",    bg: "bg-pink-50",    text: "text-pink-600",    border: "border-pink-200"    },
  { value: "delivery", label: "Delivery",      icon: Package,     color: "from-orange-500 to-amber-500", bg: "bg-orange-50",  text: "text-orange-600",  border: "border-orange-200"  },
  { value: "other",    label: "Other",         icon: HelpCircle,  color: "from-slate-500 to-gray-500",   bg: "bg-slate-50",   text: "text-slate-600",   border: "border-slate-200"   },
];

const PRIORITIES = [
  { value: "low",    label: "Low",    color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { value: "medium", label: "Medium", color: "text-amber-600 bg-amber-50 border-amber-200"       },
  { value: "high",   label: "High",   color: "text-red-600 bg-red-50 border-red-200"             },
];

const SubmitTicket = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    category: "", priority: "medium",
    subject: "", description: "",
  });

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.category || !form.subject || !form.description) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      const res = await api.post("/tickets", form);
      setTicketId(res.data?.ticketId || `TKT-${Date.now().toString().slice(-6)}`);
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || "Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl border border-slate-100 p-12 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Ticket Submitted!</h2>
          <p className="text-slate-500 mb-6">Your complaint has been registered successfully.</p>
          <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-6 py-4 mb-8">
            <div className="text-xs text-indigo-400 font-semibold uppercase tracking-widest mb-1">Ticket ID</div>
            <div className="text-2xl font-black text-indigo-700 font-mono">{ticketId}</div>
            <div className="text-xs text-slate-400 mt-1">Save this ID to track your complaint</div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/profile")}
              className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition"
            >
              Track Status
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(1); setForm({ name:"",email:"",phone:"",category:"",priority:"medium",subject:"",description:"" }); }}
              className="flex-1 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
            >
              New Ticket
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center">
              <Ticket size={20} className="text-white" />
            </div>
            <span className="text-white/70 text-sm font-medium uppercase tracking-widest">New Complaint</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Submit a Complaint</h1>
          <p className="text-white/70">Tell us what went wrong and we'll resolve it fast.</p>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mt-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? "bg-white text-indigo-700" : "bg-white/20 text-white/60"
                }`}>{s}</div>
                <span className={`text-sm ${step >= s ? "text-white font-medium" : "text-white/50"}`}>
                  {s === 1 ? "Your Info" : "Complaint"}
                </span>
                {s < 2 && <div className={`h-0.5 w-10 rounded-full ${step > s ? "bg-white" : "bg-white/20"}`} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-6 py-10">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <User size={20} className="text-indigo-500" /> Your Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                  <input
                    value={form.name} onChange={set("name")}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Mail size={13} /> Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email" value={form.email} onChange={set("email")}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                      <Phone size={13} /> Phone <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="tel" value={form.phone} onChange={set("phone")}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  if (!form.name || !form.email) { setError("Name and email are required."); return; }
                  setError(""); setStep(2);
                }}
                className="mt-8 w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition flex items-center justify-center gap-2"
              >
                Continue <ChevronDown size={16} className="-rotate-90" />
              </button>
              {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8"
            >
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <FileText size={20} className="text-indigo-500" /> Complaint Details
              </h2>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Category <span className="text-red-400">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {CATEGORIES.map(({ value, label, icon: Icon, bg, text, border }) => (
                    <button
                      key={value}
                      onClick={() => setForm(f => ({ ...f, category: value }))}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all font-medium text-sm ${
                        form.category === value
                          ? `${bg} ${text} ${border} scale-[1.03] shadow-sm`
                          : "border-slate-100 text-slate-500 hover:border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <Icon size={20} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Priority */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Priority</label>
                <div className="flex gap-3">
                  {PRIORITIES.map(({ value, label, color }) => (
                    <button
                      key={value}
                      onClick={() => setForm(f => ({ ...f, priority: value }))}
                      className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                        form.priority === value ? color + " border-current scale-[1.02]" : "border-slate-100 text-slate-400 hover:border-slate-200"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.subject} onChange={set("subject")}
                  placeholder="Brief title of your complaint"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Description <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.description} onChange={set("description")}
                  rows={4}
                  placeholder="Describe your issue in detail — what happened, when, and what you expected..."
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition resize-none leading-relaxed"
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-slate-400">{form.description.length} chars</span>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
                  <AlertCircle size={15} className="text-red-400 shrink-0" />
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => { setStep(1); setError(""); }}
                  className="flex-1 py-3.5 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Submitting…</> : <><Send size={16} /> Submit Complaint</>}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SubmitTicket;