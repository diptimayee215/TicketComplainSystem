// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { motion } from "framer-motion";
// import {
//   CheckCircle,
//   ShieldCheck,
//   Zap,
//   Mail,
//   Phone,
//   MapPin,
//   ArrowRight,
//   Star,
//   Users,
//   TrendingUp,
//   Clock,
// } from "lucide-react";

// // --- SVG Illustrations ---
// const HeroIllustration = () => (
//   <svg viewBox="0 0 520 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
//     {/* Background glows */}
//     <ellipse cx="260" cy="200" rx="220" ry="160" fill="url(#glow1)" opacity="0.3"/>
    
//     {/* Main ticket card */}
//     <rect x="100" y="80" width="320" height="200" rx="20" fill="white" opacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
//     <rect x="116" y="96" width="288" height="168" rx="14" fill="white" opacity="0.08"/>
    
//     {/* Ticket header bar */}
//     <rect x="116" y="96" width="288" height="42" rx="14" fill="white" opacity="0.2"/>
//     <circle cx="148" cy="117" r="10" fill="#6EE7B7" opacity="0.9"/>
//     <rect x="168" y="111" width="100" height="8" rx="4" fill="white" opacity="0.7"/>
//     <rect x="168" y="123" width="60" height="6" rx="3" fill="white" opacity="0.4"/>
    
//     {/* Status badge */}
//     <rect x="340" y="108" width="52" height="18" rx="9" fill="#6EE7B7" opacity="0.9"/>
//     <rect x="348" y="115" width="36" height="4" rx="2" fill="white" opacity="0.8"/>
    
//     {/* Content lines */}
//     <rect x="132" y="154" width="180" height="8" rx="4" fill="white" opacity="0.5"/>
//     <rect x="132" y="170" width="240" height="6" rx="3" fill="white" opacity="0.3"/>
//     <rect x="132" y="184" width="200" height="6" rx="3" fill="white" opacity="0.3"/>
//     <rect x="132" y="198" width="160" height="6" rx="3" fill="white" opacity="0.3"/>
    
//     {/* Bottom row */}
//     <rect x="132" y="226" width="70" height="22" rx="11" fill="white" opacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
//     <rect x="138" y="233" width="58" height="8" rx="4" fill="white" opacity="0.5"/>
//     <rect x="218" y="226" width="60" height="22" rx="11" fill="#818CF8" opacity="0.7"/>
//     <rect x="224" y="233" width="48" height="8" rx="4" fill="white" opacity="0.8"/>

//     {/* Floating mini cards */}
//     <rect x="30" y="160" width="90" height="80" rx="14" fill="white" opacity="0.12" stroke="white" strokeOpacity="0.25" strokeWidth="1"/>
//     <circle cx="52" cy="182" r="8" fill="#FCD34D" opacity="0.85"/>
//     <rect x="66" y="178" width="42" height="6" rx="3" fill="white" opacity="0.6"/>
//     <rect x="66" y="188" width="30" height="5" rx="2.5" fill="white" opacity="0.35"/>
//     <rect x="44" y="202" width="66" height="5" rx="2.5" fill="white" opacity="0.3"/>
//     <rect x="44" y="212" width="50" height="5" rx="2.5" fill="white" opacity="0.3"/>
//     <rect x="44" y="222" width="58" height="5" rx="2.5" fill="white" opacity="0.3"/>

//     <rect x="398" y="130" width="88" height="90" rx="14" fill="white" opacity="0.12" stroke="white" strokeOpacity="0.25" strokeWidth="1"/>
//     <circle cx="420" cy="152" r="8" fill="#F9A8D4" opacity="0.85"/>
//     <rect x="434" y="148" width="40" height="6" rx="3" fill="white" opacity="0.6"/>
//     <rect x="434" y="158" width="28" height="5" rx="2.5" fill="white" opacity="0.35"/>
//     <rect x="412" y="172" width="62" height="5" rx="2.5" fill="white" opacity="0.3"/>
//     <rect x="412" y="182" width="48" height="5" rx="2.5" fill="white" opacity="0.3"/>
//     <rect x="412" y="192" width="55" height="5" rx="2.5" fill="white" opacity="0.3"/>
//     <rect x="412" y="204" width="36" height="14" rx="7" fill="#818CF8" opacity="0.7"/>

//     {/* Floating dots/particles */}
//     <circle cx="80" cy="120" r="5" fill="#6EE7B7" opacity="0.7"/>
//     <circle cx="450" cy="110" r="4" fill="#FCD34D" opacity="0.7"/>
//     <circle cx="470" cy="300" r="6" fill="#F9A8D4" opacity="0.6"/>
//     <circle cx="50" cy="310" r="4" fill="#818CF8" opacity="0.6"/>
//     <circle cx="260" cy="320" r="3" fill="white" opacity="0.5"/>
//     <circle cx="320" cy="60" r="4" fill="#6EE7B7" opacity="0.5"/>

//     {/* Check mark floating */}
//     <circle cx="430" cy="258" r="22" fill="#6EE7B7" opacity="0.85"/>
//     <path d="M420 258 L427 265 L442 250" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

//     {/* Stats pill */}
//     <rect x="140" y="316" width="240" height="44" rx="22" fill="white" opacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
//     <circle cx="174" cy="338" r="12" fill="#818CF8" opacity="0.8"/>
//     <rect x="196" y="332" width="70" height="7" rx="3.5" fill="white" opacity="0.7"/>
//     <rect x="196" y="343" width="50" height="5" rx="2.5" fill="white" opacity="0.4"/>
//     <rect x="286" y="327" width="1" height="22" fill="white" opacity="0.2"/>
//     <circle cx="316" cy="338" r="12" fill="#FCD34D" opacity="0.8"/>
//     <rect x="338" y="332" width="28" height="7" rx="3.5" fill="white" opacity="0.7"/>
//     <rect x="338" y="343" width="20" height="5" rx="2.5" fill="white" opacity="0.4"/>

//     <defs>
//       <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
//         <stop offset="0%" stopColor="#818CF8"/>
//         <stop offset="100%" stopColor="#6366F1" stopOpacity="0"/>
//       </radialGradient>
//     </defs>
//   </svg>
// );

// const WaveDecor = () => (
//   <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
//     <path d="M0 0 C360 80 1080 0 1440 60 L1440 80 L0 80 Z" fill="#f8fafc"/>
//   </svg>
// );

// const stats = [
//   { icon: <Users size={22}/>, value: "10,000+", label: "Active Users" },
//   { icon: <TrendingUp size={22}/>, value: "98%", label: "Resolution Rate" },
//   { icon: <Clock size={22}/>, value: "< 2hrs", label: "Avg. Response Time" },
//   { icon: <Star size={22}/>, value: "4.9/5", label: "User Rating" },
// ];

// const features = [
//   {
//     icon: <Zap size={30}/>,
//     color: "from-amber-400 to-orange-500",
//     bg: "bg-amber-50",
//     title: "Fast Ticket Submission",
//     desc: "Submit issues in seconds using a clean, intuitive interface — no training required.",
//   },
//   {
//     icon: <CheckCircle size={30}/>,
//     color: "from-emerald-400 to-teal-500",
//     bg: "bg-emerald-50",
//     title: "Real-Time Tracking",
//     desc: "Follow every complaint from submission to resolution with live status updates.",
//   },
//   {
//     icon: <ShieldCheck size={30}/>,
//     color: "from-violet-400 to-purple-600",
//     bg: "bg-violet-50",
//     title: "Secure & Role-Based",
//     desc: "Military-grade authentication with fine-grained role access controls.",
//   },
// ];

// const steps = [
//   { num: "01", title: "Create Account", desc: "Register in under a minute — no credit card needed." },
//   { num: "02", title: "Submit a Ticket", desc: "Describe your issue and attach files with ease." },
//   { num: "03", title: "Track Progress", desc: "Get real-time updates as your ticket gets resolved." },
//   { num: "04", title: "Issue Closed ✓", desc: "Receive confirmation once the issue is fully resolved." },
// ];

// const Home = () => {
//   const { user } = useAuth();

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

//       {/* ── HERO ── */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white">
//         {/* Mesh background blobs */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-400 opacity-20 blur-3xl"/>
//           <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl"/>
//           <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-blue-400 opacity-15 blur-3xl"/>
//           {/* Grid pattern overlay */}
//           <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)"/>
//           </svg>
//         </div>

//         <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
//           {/* Left text */}
//           <div className="flex-1 text-center lg:text-left">
//             <motion.div
//               initial={{ opacity: 0, y: -20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm"
//             >
//               <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
//               System Operational — 99.9% Uptime
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
//             >
//               Resolve Issues
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
//                 Faster Than Ever
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.25 }}
//               className="text-lg md:text-xl mb-10 max-w-xl mx-auto lg:mx-0 text-white/75 leading-relaxed"
//             >
//               Submit, track, and resolve complaints with a streamlined workflow
//               designed for modern teams and organizations.
//             </motion.p>

//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"
//             >
//               {user ? (
//                 <Link
//                   to="/dashboard"
//                   className="group flex items-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
//                 >
//                   Go to Dashboard <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
//                 </Link>
//               ) : (
//                 <>
//                   <Link
//                     to="/register"
//                     className="group flex items-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
//                   >
//                     Get Started Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
//                   </Link>
//                   <Link
//                     to="/login"
//                     className="border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition"
//                   >
//                     Log In
//                   </Link>
//                 </>
//               )}
//             </motion.div>
//           </div>

//           {/* Right illustration */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="flex-1 w-full max-w-md lg:max-w-lg"
//           >
//             <HeroIllustration />
//           </motion.div>
//         </div>

//         {/* Wave */}
//         <div className="-mb-1">
//           <WaveDecor />
//         </div>
//       </div>

//       {/* ── STATS BAR ── */}
//       <div className="bg-white border-b border-slate-100">
//         <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
//           {stats.map((s, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="flex flex-col items-center text-center"
//             >
//               <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
//                 {s.icon}
//               </div>
//               <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
//               <div className="text-sm text-slate-500 mt-0.5">{s.label}</div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* ── FEATURES ── */}
//       <div className="max-w-6xl mx-auto px-6 py-24">
//         <div className="text-center mb-16">
//           <span className="inline-block bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-full px-4 py-1.5 mb-4 tracking-wide uppercase">
//             Features
//           </span>
//           <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
//             Everything You Need
//           </h2>
//           <p className="mt-4 text-slate-500 max-w-xl mx-auto">
//             Powerful tools to manage issues from first report to final resolution — all in one place.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((f, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.15 }}
//               className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//             >
//               <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center mb-6 shadow-lg`}>
//                 {f.icon}
//               </div>
//               <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
//               <p className="text-slate-500 leading-relaxed">{f.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* ── HOW IT WORKS ── */}
//       <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white py-24">
//         <div className="max-w-6xl mx-auto px-6">
//           <div className="text-center mb-16">
//             <span className="inline-block bg-white/10 text-indigo-300 text-sm font-semibold rounded-full px-4 py-1.5 mb-4 tracking-wide uppercase border border-white/10">
//               How It Works
//             </span>
//             <h2 className="text-3xl md:text-4xl font-extrabold">Simple 4-Step Process</h2>
//             <p className="mt-4 text-slate-400 max-w-xl mx-auto">
//               From complaint to closure — our streamlined workflow makes it effortless.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-4 gap-6 relative">
//             {/* Connector line */}
//             <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-30"/>

//             {steps.map((s, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.15 }}
//                 className="relative text-center"
//               >
//                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-900/50">
//                   {s.num}
//                 </div>
//                 <h4 className="text-lg font-bold mb-2">{s.title}</h4>
//                 <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── CTA BANNER ── */}
//       <div className="max-w-6xl mx-auto px-6 py-20">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.96 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           viewport={{ once: true }}
//           className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 text-white text-center shadow-2xl"
//         >
//           {/* Decoration blobs */}
//           <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white opacity-5 blur-2xl"/>
//           <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white opacity-5 blur-2xl"/>

//           <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10">
//             Ready to Streamline Your Support?
//           </h2>
//           <p className="text-white/75 mb-8 text-lg max-w-xl mx-auto relative z-10">
//             Join thousands of teams using TicketSystem to resolve issues faster and keep customers happy.
//           </p>
//           <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
//             <Link
//               to="/register"
//               className="group flex items-center justify-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
//             >
//               Start for Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
//             </Link>
//             <Link
//               to="/contact"
//               className="border border-white/30 bg-white/10 px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition"
//             >
//               Contact Sales
//             </Link>
//           </div>
//         </motion.div>
//       </div>

    
//     </div>
//   );
// };

// export default Home;


import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import {
  ArrowRight, Train, Bus, Plane, Film,
  ShoppingBag, Package, CheckCircle, ShieldCheck,
  Zap, Users, TrendingUp, Clock, Star,
  ChevronRight, MessageSquare, BarChart3, Bell,
} from "lucide-react";

const HeroIllustration = () => (
  <svg viewBox="0 0 520 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="260" cy="200" rx="220" ry="160" fill="url(#glow1)" opacity="0.3"/>
    <rect x="100" y="80" width="320" height="200" rx="20" fill="white" opacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
    <rect x="116" y="96" width="288" height="168" rx="14" fill="white" opacity="0.08"/>
    <rect x="116" y="96" width="288" height="42" rx="14" fill="white" opacity="0.2"/>
    <circle cx="148" cy="117" r="10" fill="#6EE7B7" opacity="0.9"/>
    <rect x="168" y="111" width="100" height="8" rx="4" fill="white" opacity="0.7"/>
    <rect x="168" y="123" width="60" height="6" rx="3" fill="white" opacity="0.4"/>
    <rect x="340" y="108" width="52" height="18" rx="9" fill="#6EE7B7" opacity="0.9"/>
    <rect x="348" y="115" width="36" height="4" rx="2" fill="white" opacity="0.8"/>
    <rect x="132" y="154" width="180" height="8" rx="4" fill="white" opacity="0.5"/>
    <rect x="132" y="170" width="240" height="6" rx="3" fill="white" opacity="0.3"/>
    <rect x="132" y="184" width="200" height="6" rx="3" fill="white" opacity="0.3"/>
    <rect x="132" y="198" width="160" height="6" rx="3" fill="white" opacity="0.3"/>
    <rect x="132" y="226" width="70" height="22" rx="11" fill="white" opacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1"/>
    <rect x="138" y="233" width="58" height="8" rx="4" fill="white" opacity="0.5"/>
    <rect x="218" y="226" width="60" height="22" rx="11" fill="#818CF8" opacity="0.7"/>
    <rect x="224" y="233" width="48" height="8" rx="4" fill="white" opacity="0.8"/>
    <rect x="30" y="160" width="90" height="80" rx="14" fill="white" opacity="0.12" stroke="white" strokeOpacity="0.25" strokeWidth="1"/>
    <circle cx="52" cy="182" r="8" fill="#FCD34D" opacity="0.85"/>
    <rect x="66" y="178" width="42" height="6" rx="3" fill="white" opacity="0.6"/>
    <rect x="66" y="188" width="30" height="5" rx="2.5" fill="white" opacity="0.35"/>
    <rect x="44" y="202" width="66" height="5" rx="2.5" fill="white" opacity="0.3"/>
    <rect x="44" y="212" width="50" height="5" rx="2.5" fill="white" opacity="0.3"/>
    <rect x="398" y="130" width="88" height="90" rx="14" fill="white" opacity="0.12" stroke="white" strokeOpacity="0.25" strokeWidth="1"/>
    <circle cx="420" cy="152" r="8" fill="#F9A8D4" opacity="0.85"/>
    <rect x="434" y="148" width="40" height="6" rx="3" fill="white" opacity="0.6"/>
    <rect x="434" y="158" width="28" height="5" rx="2.5" fill="white" opacity="0.35"/>
    <rect x="412" y="172" width="62" height="5" rx="2.5" fill="white" opacity="0.3"/>
    <rect x="412" y="182" width="48" height="5" rx="2.5" fill="white" opacity="0.3"/>
    <rect x="412" y="204" width="36" height="14" rx="7" fill="#818CF8" opacity="0.7"/>
    <circle cx="80" cy="120" r="5" fill="#6EE7B7" opacity="0.7"/>
    <circle cx="450" cy="110" r="4" fill="#FCD34D" opacity="0.7"/>
    <circle cx="470" cy="300" r="6" fill="#F9A8D4" opacity="0.6"/>
    <circle cx="50" cy="310" r="4" fill="#818CF8" opacity="0.6"/>
    <circle cx="430" cy="258" r="22" fill="#6EE7B7" opacity="0.85"/>
    <path d="M420 258 L427 265 L442 250" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="140" y="316" width="240" height="44" rx="22" fill="white" opacity="0.15" stroke="white" strokeOpacity="0.3" strokeWidth="1.5"/>
    <circle cx="174" cy="338" r="12" fill="#818CF8" opacity="0.8"/>
    <rect x="196" y="332" width="70" height="7" rx="3.5" fill="white" opacity="0.7"/>
    <rect x="196" y="343" width="50" height="5" rx="2.5" fill="white" opacity="0.4"/>
    <rect x="286" y="327" width="1" height="22" fill="white" opacity="0.2"/>
    <circle cx="316" cy="338" r="12" fill="#FCD34D" opacity="0.8"/>
    <rect x="338" y="332" width="28" height="7" rx="3.5" fill="white" opacity="0.7"/>
    <defs>
      <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#818CF8"/>
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0"/>
      </radialGradient>
    </defs>
  </svg>
);

const categories = [
  { icon: Train,       label: "Railway",  color: "bg-blue-50 text-blue-600 border-blue-100",    hover: "hover:bg-blue-100"   },
  { icon: Bus,         label: "Bus",      color: "bg-green-50 text-green-600 border-green-100",  hover: "hover:bg-green-100"  },
  { icon: Plane,       label: "Flight",   color: "bg-sky-50 text-sky-600 border-sky-100",        hover: "hover:bg-sky-100"    },
  { icon: Film,        label: "Movie",    color: "bg-purple-50 text-purple-600 border-purple-100",hover: "hover:bg-purple-100" },
  { icon: ShoppingBag, label: "Shopping", color: "bg-pink-50 text-pink-600 border-pink-100",     hover: "hover:bg-pink-100"   },
  { icon: Package,     label: "Delivery", color: "bg-orange-50 text-orange-600 border-orange-100",hover:"hover:bg-orange-100" },
];

const stats = [
  { icon: Users,     value: "10,000+", label: "Active Users"       },
  { icon: TrendingUp,value: "98%",     label: "Resolution Rate"    },
  { icon: Clock,     value: "< 2hrs",  label: "Avg Response Time"  },
  { icon: Star,      value: "4.9/5",   label: "User Rating"        },
];

const features = [
  { icon: Zap,          color: "from-amber-400 to-orange-500",   title: "Fast Submission",    desc: "Submit any complaint in under 60 seconds with our guided form — no training required."          },
  { icon: BarChart3,    color: "from-indigo-400 to-blue-500",    title: "Live Tracking",      desc: "Follow every ticket from submission to resolution with real-time status updates."               },
  { icon: Bell,         color: "from-emerald-400 to-teal-500",   title: "Instant Alerts",     desc: "Get notified the moment your complaint status changes or admin adds a remark."                  },
  { icon: MessageSquare,color: "from-violet-400 to-purple-600",  title: "Admin Remarks",      desc: "Two-way communication — admins can reply directly to your complaint with updates."              },
  { icon: ShieldCheck,  color: "from-rose-400 to-pink-500",      title: "Secure & Private",   desc: "Your data is protected with JWT authentication and role-based access controls."                 },
  { icon: CheckCircle,  color: "from-cyan-400 to-sky-500",       title: "Multi-Category",     desc: "One platform for train, bus, flight, movie, shopping, delivery and more complaints."            },
];

const steps = [
  { num: "01", title: "Create Account",   desc: "Register for free — no credit card needed." },
  { num: "02", title: "Choose Category",  desc: "Select train, bus, flight, movie or more."  },
  { num: "03", title: "Submit Complaint", desc: "Describe your issue with full details."      },
  { num: "04", title: "Get Resolved",     desc: "Track progress and receive confirmation."    },
];

const testimonials = [
  { name: "Priya Sharma",   role: "Train Traveller",  text: "My railway refund issue was resolved within 24 hours. Absolutely seamless experience!", rating: 5, avatar: "PS" },
  { name: "Rahul Mehta",    role: "Frequent Flyer",   text: "Filed a flight delay complaint and got compensation faster than I expected. Great platform!", rating: 5, avatar: "RM" },
  { name: "Sneha Patel",    role: "Online Shopper",   text: "Finally a platform that takes shopping complaints seriously. My refund was processed quickly.", rating: 5, avatar: "SP" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-400 opacity-20 blur-3xl"/>
          <div className="absolute top-10 right-0 w-80 h-80 rounded-full bg-purple-400 opacity-20 blur-3xl"/>
          <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-blue-400 opacity-15 blur-3xl"/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="hgrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#hgrid)"/>
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.div initial={{ opacity:0,y:-20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }}
              className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/>
              One Platform for All Your Complaints
            </motion.div>

            <motion.h1 initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6,delay:0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              Resolve Every Issue
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
                Faster Than Ever
              </span>
            </motion.h1>

            <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6,delay:0.25 }}
              className="text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0 text-white/75 leading-relaxed"
            >
              Whether it's a delayed train, cancelled flight, wrong delivery or bad movie experience —
              submit your complaint once and we'll resolve it fast.
            </motion.p>

            {/* Category pills */}
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5,delay:0.35 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8"
            >
              {categories.map(({ icon: Icon, label }) => (
                <span key={label} className="inline-flex items-center gap-1.5 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur-sm">
                  <Icon size={12}/> {label}
                </span>
              ))}
            </motion.div>

            <motion.div initial={{ opacity:0,y:20 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5,delay:0.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4"
            >
              {user ? (
                <Link to="/profile" className="group flex items-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
                  My Complaints <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                </Link>
              ) : (
                <>
                  <Link to="/register" className="group flex items-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
                    Get Started Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
                  </Link>
                  <Link to="/login" className="border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition">
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>
          </div>

          <motion.div initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }} transition={{ duration:0.7,delay:0.2 }}
            className="flex-1 w-full max-w-md lg:max-w-lg"
          >
            <HeroIllustration />
          </motion.div>
        </div>

        <div className="-mb-1">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 0 C360 80 1080 0 1440 60 L1440 80 L0 80 Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div key={i} {...fadeUp(i * 0.1)} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <Icon size={22}/>
              </div>
              <div className="text-2xl font-extrabold text-slate-900">{value}</div>
              <div className="text-sm text-slate-500 mt-0.5">{label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
            Categories
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Complaint For Any Service
          </h2>
          <p className="mt-4 text-slate-500 max-w-xl mx-auto">
            From transportation to entertainment — we handle complaints across all major service categories.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ icon: Icon, label, color, hover }, i) => (
            <motion.div key={i} {...fadeUp(i * 0.08)} whileHover={{ y: -6, scale: 1.03 }}>
              <Link to="/submit"
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 ${color} ${hover} transition-all duration-200 cursor-pointer group`}
              >
                <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                  <Icon size={24}/>
                </div>
                <span className="text-sm font-bold">{label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-white border-y border-slate-100 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Everything You Need</h2>
            <p className="mt-4 text-slate-500 max-w-xl mx-auto">
              Powerful tools to manage issues from first report to final resolution — all in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, color, title, desc }, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} whileHover={{ y: -4 }}
                className="group bg-slate-50 border border-slate-100 p-7 rounded-3xl hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-5 shadow-md`}>
                  <Icon size={22}/>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="inline-block bg-white/10 text-indigo-300 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest border border-white/10">
              How It Works
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">Simple 4-Step Process</h2>
            <p className="mt-4 text-slate-400 max-w-xl mx-auto">
              From complaint to closure — our streamlined workflow makes resolution effortless.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 opacity-30"/>
            {steps.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.15)} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-5 shadow-lg shadow-indigo-900/50">
                  {s.num}
                </div>
                <h4 className="text-lg font-bold mb-2">{s.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">What Users Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.15)}
                className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={16} className="text-amber-400 fill-amber-400"/>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div {...fadeUp()}
          className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 text-white text-center shadow-2xl"
        >
          <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white opacity-5 blur-2xl"/>
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white opacity-5 blur-2xl"/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="ctag" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#ctag)"/>
          </svg>
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/> Free to use — always
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Ready to File Your First Complaint?
            </h2>
            <p className="text-white/75 mb-8 text-lg max-w-xl mx-auto">
              Join over 10,000 users who trust TicketSys to resolve their service complaints fast.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register"
                className="group flex items-center justify-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
              >
                Start for Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </Link>
              <Link to="/contact"
                className="border border-white/30 bg-white/10 px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition flex items-center justify-center gap-2"
              >
                Contact Us <ChevronRight size={16}/>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;