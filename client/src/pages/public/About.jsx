// import { motion } from "framer-motion";
// import {
//   Ticket,
//   LayoutDashboard,
//   ShieldCheck,
//   Code2,
//   Github,
//   Linkedin,
//   Twitter,
//   Zap,
//   Target,
//   Heart,
//   Globe,
// } from "lucide-react";

// // ── SVG Decorations ──
// const AboutIllustration = () => (
//   <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
//     <ellipse cx="240" cy="180" rx="200" ry="140" fill="url(#aboutGlow)" opacity="0.2"/>

//     {/* Main panel */}
//     <rect x="60" y="40" width="360" height="240" rx="20" fill="white" opacity="0.12" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    
//     {/* Top bar */}
//     <rect x="60" y="40" width="360" height="48" rx="20" fill="white" opacity="0.18"/>
//     <circle cx="96" cy="64" r="8" fill="#F87171" opacity="0.9"/>
//     <circle cx="118" cy="64" r="8" fill="#FCD34D" opacity="0.9"/>
//     <circle cx="140" cy="64" r="8" fill="#6EE7B7" opacity="0.9"/>
//     <rect x="170" y="60" width="160" height="8" rx="4" fill="white" opacity="0.4"/>

//     {/* Sidebar */}
//     <rect x="60" y="88" width="70" height="192" rx="0" fill="white" opacity="0.08"/>
//     <circle cx="95" cy="116" r="10" fill="#818CF8" opacity="0.8"/>
//     <rect x="82" y="136" width="26" height="5" rx="2.5" fill="white" opacity="0.35"/>
//     <circle cx="95" cy="158" r="10" fill="white" opacity="0.2"/>
//     <rect x="82" y="178" width="26" height="5" rx="2.5" fill="white" opacity="0.2"/>
//     <circle cx="95" cy="200" r="10" fill="white" opacity="0.2"/>
//     <rect x="82" y="220" width="26" height="5" rx="2.5" fill="white" opacity="0.2"/>

//     {/* Content area - ticket rows */}
//     {[0,1,2,3].map((i) => (
//       <g key={i}>
//         <rect x="148" y={104 + i * 40} width="258" height="30" rx="8" fill="white" opacity="0.07" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
//         <circle cx="168" cy={119 + i * 40} r="7" fill={["#6EE7B7","#FCD34D","#F9A8D4","#818CF8"][i]} opacity="0.85"/>
//         <rect x="184" y={115 + i * 40} width={[100,80,120,70][i]} height="6" rx="3" fill="white" opacity="0.5"/>
//         <rect x="184" y={125 + i * 40} width={[60,50,80,45][i]} height="4" rx="2" fill="white" opacity="0.25"/>
//         <rect x={340} y={113 + i * 40} width="50" height="14" rx="7" fill={["#6EE7B7","#FCD34D","#F9A8D4","#818CF8"][i]} opacity="0.5"/>
//       </g>
//     ))}

//     {/* Floating badges */}
//     <rect x="20" y="110" width="84" height="36" rx="12" fill="white" opacity="0.12" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
//     <circle cx="40" cy="128" r="8" fill="#6EE7B7" opacity="0.9"/>
//     <rect x="54" y="123" width="38" height="6" rx="3" fill="white" opacity="0.6"/>
//     <rect x="54" y="133" width="26" height="4" rx="2" fill="white" opacity="0.3"/>

//     <rect x="376" y="200" width="84" height="36" rx="12" fill="white" opacity="0.12" stroke="white" strokeOpacity="0.2" strokeWidth="1"/>
//     <circle cx="396" cy="218" r="8" fill="#FCD34D" opacity="0.9"/>
//     <rect x="410" y="213" width="38" height="6" rx="3" fill="white" opacity="0.6"/>
//     <rect x="410" y="223" width="26" height="4" rx="2" fill="white" opacity="0.3"/>

//     {/* Checkmark bubble */}
//     <circle cx="400" cy="80" r="24" fill="#6EE7B7" opacity="0.85"/>
//     <path d="M390 80 L397 87 L412 72" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

//     {/* Dots */}
//     <circle cx="50" cy="260" r="5" fill="#818CF8" opacity="0.7"/>
//     <circle cx="440" cy="290" r="4" fill="#FCD34D" opacity="0.6"/>
//     <circle cx="240" cy="320" r="3" fill="white" opacity="0.4"/>
//     <circle cx="420" cy="50" r="3" fill="#F9A8D4" opacity="0.6"/>

//     <defs>
//       <radialGradient id="aboutGlow" cx="50%" cy="50%" r="50%">
//         <stop offset="0%" stopColor="#818CF8"/>
//         <stop offset="100%" stopColor="#6366F1" stopOpacity="0"/>
//       </radialGradient>
//     </defs>
//   </svg>
// );

// const AvatarPlaceholder = ({ initials, color }) => (
//   <div className={`w-full h-full rounded-full flex items-center justify-center text-3xl font-extrabold text-white ${color}`}>
//     {initials}
//   </div>
// );

// // ── Data ──
// const features = [
//   {
//     icon: <Ticket size={28}/>,
//     gradient: "from-blue-500 to-indigo-600",
//     title: "Easy Complaint Submission",
//     desc: "Users can quickly submit, categorize, and track their complaints in real time with an intuitive interface.",
//   },
//   {
//     icon: <LayoutDashboard size={28}/>,
//     gradient: "from-emerald-500 to-teal-600",
//     title: "Admin Dashboard",
//     desc: "Admins get a powerful command center to assign, prioritize, update, and resolve tickets efficiently.",
//   },
//   {
//     icon: <ShieldCheck size={28}/>,
//     gradient: "from-violet-500 to-purple-700",
//     title: "Secure & Scalable",
//     desc: "Built on modern technologies with role-based auth ensuring data protection and seamless scalability.",
//   },
// ];

// const techStack = [
//   { name: "MongoDB", color: "bg-green-100 text-green-700" },
//   { name: "Express.js", color: "bg-slate-100 text-slate-700" },
//   { name: "React.js", color: "bg-blue-100 text-blue-700" },
//   { name: "Node.js", color: "bg-lime-100 text-lime-700" },
//   { name: "Tailwind CSS", color: "bg-cyan-100 text-cyan-700" },
//   { name: "JWT Auth", color: "bg-orange-100 text-orange-700" },
// ];

// const values = [
//   { icon: <Zap size={20}/>, label: "Speed", color: "text-amber-500 bg-amber-50" },
//   { icon: <Target size={20}/>, label: "Precision", color: "text-blue-500 bg-blue-50" },
//   { icon: <Heart size={20}/>, label: "Empathy", color: "text-rose-500 bg-rose-50" },
//   { icon: <Globe size={20}/>, label: "Scalability", color: "text-violet-500 bg-violet-50" },
// ];

// const team = [
//   {
//     src: "/src/assets/Amitanshu.jpg",
//     initials: "AB",
//     avatarColor: "bg-gradient-to-br from-indigo-500 to-blue-600",
//     name: "Amitanshu Behera",
//     role: "Full Stack Developer",
//     border: "border-indigo-400",
//     social: { github: "https://github.com/Amitanshu143", linkedin: "https://www.linkedin.com/in/amitanshu-behera-8572462b9/", twitter: "https://x.com/AmitanshuB143" },
//   },
//   {
//     src: "/team2.jpg",
//     initials: "TM",
//     avatarColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
//     name: "Team Member 2",
//     role: "Backend Developer",
//     border: "border-emerald-400",
//     social: { github: "#", linkedin: "#", twitter: "#" },
//   },
//   {
//     src: "/src/assets/dipti.jpeg",
//     initials: "FD",
//     avatarColor: "bg-gradient-to-br from-emerald-500 to-teal-600",
//     name: "Diptimayee Sahoo",
//     role: "Frontend Developer",
//     border: "border-rose-400",
//     social: { github: "#", linkedin: "#", twitter: "#" },
//   },
// ];

// const fadeUp = (delay = 0) => ({
//   initial: { opacity: 0, y: 30 },
//   whileInView: { opacity: 1, y: 0 },
//   viewport: { once: true },
//   transition: { duration: 0.6, delay },
// });

// // ── Component ──
// const About = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 font-sans">

//       {/* ── HERO BANNER ── */}
//       <div className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white">
//         {/* Background effects */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden">
//           <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-indigo-400 opacity-20 blur-3xl"/>
//           <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-400 opacity-20 blur-3xl"/>
//           <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
//                 <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
//               </pattern>
//             </defs>
//             <rect width="100%" height="100%" fill="url(#grid)"/>
//           </svg>
//         </div>

//         <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
//           {/* Text */}
//           <div className="flex-1 text-center lg:text-left">
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm"
//             >
//               <Code2 size={14}/> Built with MERN Stack
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.1 }}
//               className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
//             >
//               About Our
//               <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
//                 Ticket System
//               </span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6, delay: 0.25 }}
//               className="text-lg text-white/75 max-w-xl mx-auto lg:mx-0 leading-relaxed"
//             >
//               A modern complaint management platform built to simplify issue tracking, 
//               empower admins, and deliver seamless resolutions for every organization.
//             </motion.p>
//           </div>

//           {/* Illustration */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.7, delay: 0.2 }}
//             className="flex-1 w-full max-w-md lg:max-w-lg"
//           >
//             <AboutIllustration />
//           </motion.div>
//         </div>

//         {/* Wave */}
//         <div className="-mb-1">
//           <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
//             <path d="M0 0 C360 60 1080 0 1440 40 L1440 60 L0 60 Z" fill="#f8fafc"/>
//           </svg>
//         </div>
//       </div>

//       {/* ── MISSION ── */}
//       <div className="max-w-6xl mx-auto px-6 py-20">
//         <div className="flex flex-col lg:flex-row gap-14 items-center">
//           {/* Left - Mission text */}
//           <motion.div {...fadeUp()} className="flex-1">
//             <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
//               Our Mission
//             </span>
//             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
//               Transforming How Organizations Handle Issues
//             </h2>
//             <p className="text-slate-600 leading-relaxed mb-4">
//               Our Ticket Management System is designed to simplify complaint handling and issue 
//               tracking for organizations of all sizes. It enables users to submit complaints, 
//               track ticket status, and receive timely updates in a structured and efficient manner.
//             </p>
//             <p className="text-slate-600 leading-relaxed mb-8">
//               The system provides a dedicated dashboard for administrators to assign, manage, 
//               and resolve tickets effectively — turning chaos into clarity with every ticket closed.
//             </p>

//             {/* Values row */}
//             <div className="flex flex-wrap gap-3">
//               {values.map((v, i) => (
//                 <motion.div
//                   key={i}
//                   initial={{ opacity: 0, scale: 0.8 }}
//                   whileInView={{ opacity: 1, scale: 1 }}
//                   viewport={{ once: true }}
//                   transition={{ delay: 0.1 + i * 0.1 }}
//                   className={`flex items-center gap-2 ${v.color} px-4 py-2 rounded-full text-sm font-semibold`}
//                 >
//                   {v.icon} {v.label}
//                 </motion.div>
//               ))}
//             </div>
//           </motion.div>

//           {/* Right - Tech stack */}
//           <motion.div {...fadeUp(0.2)} className="flex-1">
//             <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg">
//               <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
//                 <Code2 size={20} className="text-indigo-500"/> Technology Stack
//               </h3>
//               <div className="flex flex-wrap gap-3 mb-8">
//                 {techStack.map((t, i) => (
//                   <span key={i} className={`${t.color} px-4 py-2 rounded-full text-sm font-semibold`}>
//                     {t.name}
//                   </span>
//                 ))}
//               </div>
//               <div className="border-t border-slate-100 pt-6 grid grid-cols-2 gap-4 text-sm">
//                 {[
//                   { label: "Version", value: "2.0.0" },
//                   { label: "License", value: "MIT" },
//                   { label: "Uptime", value: "99.9%" },
//                   { label: "Support", value: "24/7" },
//                 ].map((item, i) => (
//                   <div key={i} className="bg-slate-50 rounded-xl px-4 py-3">
//                     <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">{item.label}</div>
//                     <div className="font-bold text-slate-800">{item.value}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </div>

//       {/* ── FEATURES ── */}
//       <div className="bg-white py-20 border-y border-slate-100">
//         <div className="max-w-6xl mx-auto px-6">
//           <motion.div {...fadeUp()} className="text-center mb-14">
//             <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
//               Features
//             </span>
//             <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
//               What Makes Us Different
//             </h2>
//           </motion.div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {features.map((f, i) => (
//               <motion.div
//                 key={i}
//                 {...fadeUp(i * 0.15)}
//                 whileHover={{ y: -6 }}
//                 className="group relative bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl transition-all duration-300 overflow-hidden"
//               >
//                 {/* Gradient glow on hover */}
//                 <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}/>
                
//                 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} text-white flex items-center justify-center mb-6 shadow-lg`}>
//                   {f.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
//                 <p className="text-slate-500 leading-relaxed">{f.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ── TEAM ── */}
//       <div className="max-w-6xl mx-auto px-6 py-24">
//         <motion.div {...fadeUp()} className="text-center mb-16">
//           <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
//             The People
//           </span>
//           <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Meet Our Team</h2>
//           <p className="mt-4 text-slate-500 max-w-xl mx-auto">
//             Passionate developers committed to building tools that make work easier for everyone.
//           </p>
//         </motion.div>

//         <div className="flex flex-wrap justify-center gap-8">
//           {team.map((member, i) => (
//             <motion.div
//               key={i}
//               {...fadeUp(i * 0.15)}
//               whileHover={{ y: -8 }}
//               className="group bg-white rounded-3xl shadow-md border border-slate-100 p-8 text-center w-72 hover:shadow-xl transition-all duration-300"
//             >
//               {/* Avatar */}
//               <div className={`w-28 h-28 mx-auto mb-5 rounded-full border-4 ${member.border} overflow-hidden shadow-lg`}>
//                 <img
//                   src={member.src}
//                   alt={member.name}
//                   className="w-full h-full object-cover"
//                   onError={(e) => { e.target.style.display = "none"; e.target.parentNode.querySelector(".fallback").style.display = "flex"; }}
//                 />
//                 <div className={`fallback w-full h-full items-center justify-center text-3xl font-extrabold text-white ${member.avatarColor} hidden`} style={{ display: "none" }}>
//                   {member.initials}
//                 </div>
//               </div>

//               <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
//               <p className="text-slate-500 text-sm mb-5">{member.role}</p>

//               {/* Social links */}
//               <div className="flex justify-center gap-3">
//                 {[
//                   { icon: <Github size={16}/>, href: member.social.github, color: "hover:bg-slate-800 hover:text-white" },
//                   { icon: <Linkedin size={16}/>, href: member.social.linkedin, color: "hover:bg-blue-600 hover:text-white" },
//                   { icon: <Twitter size={16}/>, href: member.social.twitter, color: "hover:bg-sky-400 hover:text-white" },
//                 ].map((s, j) => (
//                   <a
//                     key={j}
//                     href={s.href}
//                     className={`w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center transition-all duration-200 ${s.color}`}
//                   >
//                     {s.icon}
//                   </a>
//                 ))}
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>

//       {/* ── CTA ── */}
//       <div className="max-w-6xl mx-auto px-6 pb-20">
//         <motion.div
//           {...fadeUp()}
//           className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 text-white text-center shadow-2xl"
//         >
//           <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white opacity-5 blur-2xl"/>
//           <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white opacity-5 blur-2xl"/>

//           <h2 className="text-3xl md:text-4xl font-extrabold mb-4 relative z-10">
//             Ready to Get Started?
//           </h2>
//           <p className="text-white/75 mb-8 text-lg max-w-xl mx-auto relative z-10">
//             Join our platform today and experience a smoother, faster way to handle every ticket.
//           </p>
//           <a
//             href="/register"
//             className="inline-flex items-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform relative z-10"
//           >
//             Create Free Account
//           </a>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default About;



import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Ticket, LayoutDashboard, ShieldCheck, Code2,
  Github, Linkedin, Twitter, Zap, Target, Heart,
  Globe, ArrowRight, Train, Bus, Plane, Film,
  CheckCircle2, Users, Award, Clock,
} from "lucide-react";

const AboutIllustration = () => (
  <svg viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <ellipse cx="240" cy="180" rx="200" ry="140" fill="url(#aboutGlow)" opacity="0.2"/>
    <rect x="60" y="40" width="360" height="240" rx="20" fill="white" opacity="0.12" stroke="white" strokeOpacity="0.25" strokeWidth="1.5"/>
    <rect x="60" y="40" width="360" height="48" rx="20" fill="white" opacity="0.18"/>
    <circle cx="96" cy="64" r="8" fill="#F87171" opacity="0.9"/>
    <circle cx="118" cy="64" r="8" fill="#FCD34D" opacity="0.9"/>
    <circle cx="140" cy="64" r="8" fill="#6EE7B7" opacity="0.9"/>
    <rect x="170" y="60" width="160" height="8" rx="4" fill="white" opacity="0.4"/>
    <rect x="60" y="88" width="70" height="192" rx="0" fill="white" opacity="0.08"/>
    <circle cx="95" cy="116" r="10" fill="#818CF8" opacity="0.8"/>
    <rect x="82" y="136" width="26" height="5" rx="2.5" fill="white" opacity="0.35"/>
    <circle cx="95" cy="158" r="10" fill="white" opacity="0.2"/>
    <circle cx="95" cy="200" r="10" fill="white" opacity="0.2"/>
    {[0,1,2,3].map(i => (
      <g key={i}>
        <rect x="148" y={104+i*40} width="258" height="30" rx="8" fill="white" opacity="0.07" stroke="white" strokeOpacity="0.12" strokeWidth="1"/>
        <circle cx="168" cy={119+i*40} r="7" fill={["#6EE7B7","#FCD34D","#F9A8D4","#818CF8"][i]} opacity="0.85"/>
        <rect x="184" y={115+i*40} width={[100,80,120,70][i]} height="6" rx="3" fill="white" opacity="0.5"/>
        <rect x={340} y={113+i*40} width="50" height="14" rx="7" fill={["#6EE7B7","#FCD34D","#F9A8D4","#818CF8"][i]} opacity="0.5"/>
      </g>
    ))}
    <circle cx="400" cy="80" r="24" fill="#6EE7B7" opacity="0.85"/>
    <path d="M390 80 L397 87 L412 72" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="260" r="5" fill="#818CF8" opacity="0.7"/>
    <circle cx="440" cy="290" r="4" fill="#FCD34D" opacity="0.6"/>
    <defs>
      <radialGradient id="aboutGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#818CF8"/>
        <stop offset="100%" stopColor="#6366F1" stopOpacity="0"/>
      </radialGradient>
    </defs>
  </svg>
);

const features = [
  { icon: Ticket,          gradient: "from-blue-500 to-indigo-600",   title: "Easy Submission",     desc: "Submit complaints for any service in seconds with our guided multi-step form."          },
  { icon: LayoutDashboard, gradient: "from-emerald-500 to-teal-600",  title: "Admin Dashboard",     desc: "Admins get a powerful command center to manage, prioritize, and resolve tickets fast."  },
  { icon: ShieldCheck,     gradient: "from-violet-500 to-purple-700", title: "Secure & Scalable",   desc: "Role-based JWT authentication ensures only the right people access the right data."     },
];

const techStack = [
  { name: "MongoDB",     color: "bg-green-100 text-green-700 border-green-200"   },
  { name: "Express.js",  color: "bg-slate-100 text-slate-700 border-slate-200"   },
  { name: "React.js",    color: "bg-blue-100 text-blue-700 border-blue-200"      },
  { name: "Node.js",     color: "bg-lime-100 text-lime-700 border-lime-200"      },
  { name: "Tailwind CSS",color: "bg-cyan-100 text-cyan-700 border-cyan-200"      },
  { name: "JWT Auth",    color: "bg-orange-100 text-orange-700 border-orange-200"},
  { name: "Framer Motion",color:"bg-pink-100 text-pink-700 border-pink-200"      },
  { name: "Lucide Icons",color: "bg-violet-100 text-violet-700 border-violet-200"},
];

const values = [
  { icon: Zap,    label: "Speed",      color: "text-amber-600 bg-amber-50 border-amber-200"  },
  { icon: Target, label: "Precision",  color: "text-blue-600 bg-blue-50 border-blue-200"     },
  { icon: Heart,  label: "Empathy",    color: "text-rose-600 bg-rose-50 border-rose-200"     },
  { icon: Globe,  label: "Scalability",color: "text-violet-600 bg-violet-50 border-violet-200"},
];

const milestones = [
  { icon: Users,  label: "Registered Users",  value: "10,000+", color: "text-indigo-600 bg-indigo-50" },
  { icon: Ticket, label: "Tickets Resolved",  value: "45,000+", color: "text-emerald-600 bg-emerald-50"},
  { icon: Award,  label: "Satisfaction Rate", value: "98.5%",   color: "text-amber-600 bg-amber-50"   },
  { icon: Clock,  label: "Avg. Resolution",   value: "< 2 hrs", color: "text-blue-600 bg-blue-50"     },
];

const team = [
  {
    src: "/src/assets/Amitanshu.jpg",
    initials: "AB",
    gradient: "from-indigo-500 to-blue-600",
    name: "Amitanshu Behera",
    role: "Full Stack Developer",
    border: "border-indigo-300",
    bio: "Passionate about building scalable MERN applications with great UX.",
    social: { github: "https://github.com/Amitanshu143", linkedin: "https://www.linkedin.com/in/amitanshu-behera-8572462b9/", twitter: "https://x.com/AmitanshuB143" },
  },
  {
    src: "",
    initials: "TM",
    gradient: "from-emerald-500 to-teal-600",
    name: "Team Member 2",
    role: "Backend Developer",
    border: "border-emerald-300",
    bio: "Specializes in Node.js REST APIs, MongoDB schema design and JWT auth.",
    social: { github: "#", linkedin: "#", twitter: "#" },
  },
  {
    src: "/src/assets/dipti.jpeg",
    initials: "DS",
    gradient: "from-pink-500 to-rose-600",
    name: "Diptimayee Sahoo",
    role: "Frontend Developer",
    border: "border-rose-300",
    bio: "Creates beautiful, responsive UI with React and Tailwind CSS.",
    social: { github: "#", linkedin: "#", twitter: "#" },
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

const About = () => (
  <div className="min-h-screen bg-slate-50 font-sans">

    {/* ── HERO ── */}
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-indigo-400 opacity-20 blur-3xl"/>
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-purple-400 opacity-20 blur-3xl"/>
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="agrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern></defs>
          <rect width="100%" height="100%" fill="url(#agrid)"/>
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <motion.div initial={{ opacity:0,y:-10 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6 backdrop-blur-sm"
          >
            <Code2 size={14}/> Built with MERN Stack
          </motion.div>
          <motion.h1 initial={{ opacity:0,y:30 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6,delay:0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            About Our
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-200">
              Ticket System
            </span>
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.6,delay:0.25 }}
            className="text-lg text-white/75 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            A modern complaint management platform built to simplify issue tracking,
            empower administrators, and deliver fast resolutions for every service.
          </motion.p>
        </div>
        <motion.div initial={{ opacity:0,scale:0.9 }} animate={{ opacity:1,scale:1 }} transition={{ duration:0.7,delay:0.2 }}
          className="flex-1 w-full max-w-md lg:max-w-lg"
        >
          <AboutIllustration/>
        </motion.div>
      </div>

      <div className="-mb-1">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
          <path d="M0 0 C360 60 1080 0 1440 40 L1440 60 L0 60 Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>

    {/* ── MILESTONES ── */}
    <section className="bg-white border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-6">
        {milestones.map(({ icon: Icon, label, value, color }, i) => (
          <motion.div key={i} {...fadeUp(i * 0.1)} className="flex flex-col items-center text-center">
            <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-3`}>
              <Icon size={22}/>
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{value}</div>
            <div className="text-sm text-slate-500 mt-0.5">{label}</div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── MISSION ── */}
    <section className="max-w-6xl mx-auto px-6 py-20">
      <div className="flex flex-col lg:flex-row gap-14 items-center">
        <motion.div {...fadeUp()} className="flex-1">
          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
            Our Mission
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
            Transforming How Complaints Get Resolved
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Our Ticket Management System was born out of frustration with how slow and opaque
            traditional complaint processes are. We built a platform that puts users first —
            giving them visibility, speed, and accountability every step of the way.
          </p>
          <p className="text-slate-600 leading-relaxed mb-8">
            Whether you're dealing with a delayed train, a wrong online order, or a bad movie
            experience — we make sure your complaint reaches the right people and gets resolved fast.
          </p>
          <div className="space-y-3 mb-8">
            {[
              "Track every complaint with a unique ticket ID",
              "Real-time status updates — pending, in-progress, resolved",
              "Admin remarks keep you informed throughout the process",
              "Covers train, bus, flight, movie, shopping, delivery and more",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 size={18} className="text-emerald-500 mt-0.5 shrink-0"/>
                <span className="text-slate-600 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity:0,scale:0.8 }} whileInView={{ opacity:1,scale:1 }} viewport={{ once:true }} transition={{ delay:0.1+i*0.1 }}
                className={`flex items-center gap-2 border ${v.color} px-4 py-2 rounded-full text-sm font-semibold`}
              >
                <v.icon size={15}/> {v.label}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div {...fadeUp(0.2)} className="flex-1">
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-lg">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Code2 size={20} className="text-indigo-500"/> Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {techStack.map((t, i) => (
                <span key={i} className={`border ${t.color} px-3 py-1.5 rounded-full text-sm font-semibold`}>
                  {t.name}
                </span>
              ))}
            </div>
            <div className="border-t border-slate-100 pt-6 grid grid-cols-2 gap-3">
              {[
                { label: "Version",    value: "2.0.0"  },
                { label: "License",    value: "MIT"    },
                { label: "Uptime",     value: "99.9%"  },
                { label: "Support",    value: "24/7"   },
                { label: "Categories", value: "6+"     },
                { label: "Languages",  value: "JS/JSX" },
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-xl px-4 py-3">
                  <div className="text-slate-400 text-xs uppercase tracking-wide mb-1">{item.label}</div>
                  <div className="font-bold text-slate-800 text-sm">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* ── FEATURES ── */}
    <section className="bg-white border-y border-slate-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">What Makes Us Different</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div key={i} {...fadeUp(i*0.15)} whileHover={{ y:-6 }}
              className="group relative bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-3xl`}/>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} text-white flex items-center justify-center mb-6 shadow-lg`}>
                <f.icon size={26}/>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* ── TEAM ── */}
    <section className="max-w-6xl mx-auto px-6 py-24">
      <motion.div {...fadeUp()} className="text-center mb-16">
        <span className="inline-block bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full px-4 py-1.5 mb-4 uppercase tracking-widest">
          The People
        </span>
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Meet Our Team</h2>
        <p className="mt-4 text-slate-500 max-w-xl mx-auto">
          Passionate developers committed to building tools that make every complaint count.
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-8">
        {team.map((member, i) => (
          <motion.div key={i} {...fadeUp(i*0.15)} whileHover={{ y:-8 }}
            className="group bg-white rounded-3xl shadow-md border border-slate-100 p-8 text-center w-72 hover:shadow-xl transition-all duration-300"
          >
            <div className={`w-28 h-28 mx-auto mb-5 rounded-full border-4 ${member.border} overflow-hidden shadow-lg`}>
              {member.src ? (
                <img src={member.src} alt={member.name} className="w-full h-full object-cover"
                  onError={e => { e.target.style.display="none"; e.target.nextSibling.style.display="flex"; }}
                />
              ) : null}
              <div className={`w-full h-full flex items-center justify-center text-3xl font-extrabold text-white bg-gradient-to-br ${member.gradient}`}
                style={{ display: member.src ? "none" : "flex" }}
              >
                {member.initials}
              </div>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
            <p className="text-indigo-500 text-sm font-semibold mb-3">{member.role}</p>
            <p className="text-slate-500 text-xs leading-relaxed mb-5">{member.bio}</p>
            <div className="flex justify-center gap-3">
              {[
                { icon: Github,   href: member.social.github,   cls: "hover:bg-slate-800 hover:text-white"  },
                { icon: Linkedin, href: member.social.linkedin, cls: "hover:bg-blue-600 hover:text-white"   },
                { icon: Twitter,  href: member.social.twitter,  cls: "hover:bg-sky-400 hover:text-white"    },
              ].map((s, j) => (
                <a key={j} href={s.href} target="_blank" rel="noreferrer"
                  className={`w-9 h-9 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center transition-all duration-200 ${s.cls}`}
                >
                  <s.icon size={16}/>
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <motion.div {...fadeUp()}
        className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 text-white text-center shadow-2xl"
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-white opacity-5 blur-2xl"/>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-white opacity-5 blur-2xl"/>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-white/75 mb-8 text-lg max-w-xl mx-auto">
            Join our platform today and experience a faster, smarter way to resolve every complaint.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register"
              className="group flex items-center justify-center gap-2 bg-white text-indigo-700 px-8 py-3.5 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Create Free Account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
            <Link to="/contact"
              className="border border-white/30 bg-white/10 px-8 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition flex items-center justify-center"
            >
              Contact Team
            </Link>
          </div>
        </div>
      </motion.div>
    </section>

  </div>
);

export default About;