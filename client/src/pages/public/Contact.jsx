// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { Mail, Phone, MapPin, Send } from "lucide-react";
// import api from "../../services/api";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     message: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState("");
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setSuccess("");
//     setError("");

//     try {
//       const res = await api.post("/contact/add", formData);
//       if (res.data.success) {
//         setSuccess("Message sent successfully! We’ll contact you soon.");
//         setFormData({
//           name: "",
//           email: "",
//           phone: "",
//           message: "",
//         });
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Something went wrong. Please try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center px-6 py-16">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2"
//       >
//         {/* Left Info Section */}
//         <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-10 flex flex-col justify-center">
//           <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
//           <p className="mb-8 text-white/80">
//             Have questions regarding ticket submission or system issues?
//             Our team is here to help you.
//           </p>

//           <div className="space-y-5">
//             <div className="flex items-center gap-4">
//               <Mail />
//               <span>support@ticketsystem.com</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <Phone />
//               <span>+91 9876543210</span>
//             </div>
//             <div className="flex items-center gap-4">
//               <MapPin />
//               <span>Bhubaneswar, Odisha, India</span>
//             </div>
//           </div>

//           <p className="mt-10 text-sm text-white/70">
//             ⏱ We usually respond within 24 hours.
//           </p>
//         </div>

//         {/* Right Form Section */}
//         <div className="p-10">
//           <h3 className="text-3xl font-bold text-gray-800 mb-6">
//             Send Message
//           </h3>

//           {success && (
//             <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
//               {success}
//             </div>
//           )}

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             <input
//               type="text"
//               name="name"
//               placeholder="Full Name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
//               required
//             />

//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
//               required
//             />

//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone (Optional)"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
//             />

//             <textarea
//               name="message"
//               placeholder="Write your message..."
//               value={formData.message}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border rounded-xl h-32 resize-none focus:ring-2 focus:ring-indigo-500 outline-none transition"
//               required
//             ></textarea>

//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 transition disabled:opacity-60"
//             >
//               {loading ? (
//                 "Sending..."
//               ) : (
//                 <>
//                   Send Message <Send size={18} />
//                 </>
//               )}
//             </motion.button>
//           </form>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Contact;


import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Mail, Phone, MapPin, Send, CheckCircle2,
  Loader2, Clock, MessageSquare, ArrowRight,
  Train, Bus, Plane, Film, ShoppingBag, Package,
} from "lucide-react";
import api from "../../services/api";

const contactInfo = [
  { icon: Mail,    label: "Email Us",       value: "support@ticketsystem.com", sub: "We reply within 24 hours",   color: "bg-indigo-50 text-indigo-600"  },
  { icon: Phone,   label: "Call Us",        value: "+91 9876543210",           sub: "Mon–Fri, 9 AM to 6 PM IST", color: "bg-emerald-50 text-emerald-600"},
  { icon: MapPin,  label: "Visit Us",       value: "Bhubaneswar, Odisha",      sub: "India — 751001",             color: "bg-amber-50 text-amber-600"    },
  { icon: Clock,   label: "Response Time",  value: "< 2 Hours",                sub: "Average first response",     color: "bg-violet-50 text-violet-600"  },
];

const categories = [
  { icon: Train,       label: "Railway"  },
  { icon: Bus,         label: "Bus"      },
  { icon: Plane,       label: "Flight"   },
  { icon: Film,        label: "Movie"    },
  { icon: ShoppingBag, label: "Shopping" },
  { icon: Package,     label: "Delivery" },
];

const faqs = [
  { q: "How do I track my complaint?",           a: "Log into your profile and you'll see all your complaints with real-time status updates and admin remarks." },
  { q: "How long does resolution take?",         a: "Most complaints are resolved within 24–48 hours. High-priority issues are addressed within 2 hours."        },
  { q: "Can I submit complaints without login?", a: "You need a free account to submit and track complaints. Registration takes less than a minute."            },
  { q: "What categories do you support?",        a: "We support Railway, Bus, Flight, Movie, Online Shopping, Delivery, and more — all in one platform."       },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const Contact = () => {
  const [form, setForm]       = useState({ name:"", email:"", phone:"", subject:"", message:"" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      await api.post("/contact/add", form);
      setSuccess(true);
      setForm({ name:"", email:"", phone:"", subject:"", message:"" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-indigo-400 opacity-20 blur-3xl"/>
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-400 opacity-20 blur-3xl"/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="cgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#cgrid)"/>
          </svg>
        </div>

        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <motion.div initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <MessageSquare size={14}/> We're Here to Help
          </motion.div>
          <motion.h1 initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6,delay:0.1 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Get In Touch
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
              With Our Team
            </span>
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6,delay:0.25 }}
            className="text-lg text-white/75 max-w-xl mx-auto leading-relaxed"
          >
            Have questions about complaint submission, account issues, or want to partner with us?
            We'd love to hear from you.
          </motion.p>
        </div>

        <div className="-mb-1">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 0 C360 60 1080 0 1440 40 L1440 60 L0 60 Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* ── CONTACT INFO CARDS ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {contactInfo.map(({ icon: Icon, label, value, sub, color }, i) => (
            <motion.div key={i} {...fadeUp(i*0.1)}
              className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className={`w-11 h-11 rounded-xl ${color} flex items-center justify-center mx-auto mb-3`}>
                <Icon size={20}/>
              </div>
              <div className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">{label}</div>
              <div className="text-sm font-bold text-slate-900 mb-0.5">{value}</div>
              <div className="text-xs text-slate-400">{sub}</div>
            </motion.div>
          ))}
        </div>

        {/* ── MAIN CONTENT: FORM + SIDEBAR ── */}
        <div className="grid lg:grid-cols-5 gap-10">

          {/* LEFT — Form */}
          <motion.div {...fadeUp()} className="lg:col-span-3">
            <div className="bg-white border border-slate-100 rounded-3xl shadow-lg p-8">
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Send Us a Message</h2>
              <p className="text-slate-500 text-sm mb-8">Fill in the form below and we'll get back to you shortly.</p>

              {success ? (
                <motion.div initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-emerald-500"/>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                  <p className="text-slate-500 mb-6">We'll get back to you within 24 hours.</p>
                  <button onClick={() => setSuccess(false)}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition text-sm"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name <span className="text-red-400">*</span></label>
                      <input value={form.name} onChange={set("name")} required placeholder="Your full name"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email <span className="text-red-400">*</span></label>
                      <input type="email" value={form.email} onChange={set("email")} required placeholder="you@example.com"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone <span className="text-slate-400 font-normal">(optional)</span></label>
                      <input type="tel" value={form.phone} onChange={set("phone")} placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1.5">Subject <span className="text-red-400">*</span></label>
                      <input value={form.subject} onChange={set("subject")} required placeholder="What's this about?"
                        className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Message <span className="text-red-400">*</span></label>
                    <textarea value={form.message} onChange={set("message")} required rows={5}
                      placeholder="Tell us how we can help you..."
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition resize-none leading-relaxed"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      <span className="text-red-500 text-sm">{error}</span>
                    </div>
                  )}

                  <motion.button whileTap={{ scale:0.98 }} type="submit" disabled={loading}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60 shadow-lg shadow-indigo-200"
                  >
                    {loading ? <><Loader2 size={18} className="animate-spin"/> Sending…</> : <><Send size={18}/> Send Message</>}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* RIGHT — Sidebar */}
          <motion.div {...fadeUp(0.2)} className="lg:col-span-2 space-y-6">

            {/* Quick submit */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Have a Complaint?</h3>
              <p className="text-white/75 text-sm mb-5">Don't just message us — submit a formal complaint and track it live.</p>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {categories.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1.5 bg-white/10 border border-white/20 rounded-xl py-2 px-1">
                    <Icon size={16}/>
                    <span className="text-xs font-medium">{label}</span>
                  </div>
                ))}
              </div>
              <Link to="/submit"
                className="flex items-center justify-center gap-2 bg-white text-indigo-700 px-5 py-2.5 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform"
              >
                Submit Complaint <ArrowRight size={15}/>
              </Link>
            </div>

            {/* Map embed placeholder */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <MapPin size={15} className="text-indigo-500"/> Our Location
              </h3>
              <div className="w-full h-40 bg-gradient-to-br from-slate-100 to-indigo-50 rounded-2xl flex items-center justify-center mb-3 overflow-hidden">
                <div className="text-center">
                  <MapPin size={32} className="text-indigo-400 mx-auto mb-2"/>
                  <p className="text-slate-500 text-xs font-medium">Bhubaneswar, Odisha</p>
                  <p className="text-slate-400 text-xs">India — 751001</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { icon: Mail,  text: "support@ticketsystem.com" },
                  { icon: Phone, text: "+91 9876543210"           },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <Icon size={14} className="text-slate-400 shrink-0"/> {text}
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp(i*0.1)}
                className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden"
              >
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left"
                >
                  <span className="font-semibold text-slate-900 text-sm">{faq.q}</span>
                  <span className={`text-indigo-500 text-xl font-bold transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {openFaq === i && (
                  <motion.div initial={{ opacity:0,height:0 }} animate={{ opacity:1,height:"auto" }} exit={{ opacity:0,height:0 }}
                    className="px-6 pb-4"
                  >
                    <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;