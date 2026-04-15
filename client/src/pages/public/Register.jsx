// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { motion } from "framer-motion";
// import { Eye, EyeOff } from "lucide-react";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const { register } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     const result = await register(name, email, password);

//     if (result.success) {
//       navigate("/profile");
//     } else {
//       setError(result.message);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 px-4">

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/30"
//       >
//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-center text-white mb-2">
//           Create Your Account
//         </h2>
//         <p className="text-center text-gray-200 mb-6 text-sm">
//           Register to submit and track your tickets easily
//         </p>

//         {/* Error Message */}
//         {error && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-2 rounded mb-4 text-sm"
//           >
//             {error}
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Name */}
//           <div>
//             <label className="block text-sm text-gray-200 mb-1">
//               Full Name
//             </label>
//             <input
//               type="text"
//               className="w-full px-4 py-2 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               placeholder="Enter your full name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="block text-sm text-gray-200 mb-1">
//               Email Address
//             </label>
//             <input
//               type="email"
//               className="w-full px-4 py-2 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <label className="block text-sm text-gray-200 mb-1">
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               className="w-full px-4 py-2 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
//               placeholder="Create a strong password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             <div
//               className="absolute right-3 top-9 cursor-pointer text-gray-600"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//             </div>
//           </div>

//           {/* Button */}
//           <motion.button
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             disabled={loading}
//             className="w-full bg-white text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-100 transition duration-200 shadow-md"
//           >
//             {loading ? "Creating Account..." : "Register"}
//           </motion.button>
//         </form>

//         {/* Login Link */}
//         <p className="mt-6 text-center text-sm text-gray-200">
//           Already have an account?{" "}
//           <Link to="/login" className="text-white font-semibold hover:underline">
//             Login here
//           </Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Register;



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus, Zap, CheckCircle2 } from "lucide-react";

const Register = () => {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow]         = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const { register }            = useAuth();
  const navigate                = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    const result = await register(name, email, password);
    if (result.success) { navigate("/profile"); }
    else { setError(result.message); }
    setLoading(false);
  };

  const perks = [
    "Submit & track complaints in real time",
    "Get notified when your ticket is resolved",
    "Works for train, bus, flight, movie & more",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2"
      >
        {/* Left branding */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="text-xl font-extrabold">TicketSys</span>
          </div>
          <h2 className="text-3xl font-extrabold mb-3 leading-tight">
            One Platform.<br />All Your Complaints.
          </h2>
          <p className="text-white/70 mb-8 leading-relaxed">
            Register once and manage every service complaint — from trains to movie tickets — in one place.
          </p>
          <div className="space-y-3">
            {perks.map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 size={16} className="text-emerald-300 shrink-0" />
                <span className="text-sm text-white/80">{p}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div className="p-10">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Create Account</h3>
          <p className="text-slate-400 text-sm mb-7">Already have one? <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Sign in</Link></p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Full Name</label>
              <input
                type="text" value={name} onChange={e => setName(e.target.value)} required
                placeholder="Your full name"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <input
                type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="Create a strong password"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition pr-11"
              />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-10 text-slate-400 hover:text-slate-600 transition">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <motion.button
              whileTap={{ scale: 0.98 }} type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60 mt-2"
            >
              {loading ? "Creating Account…" : <><UserPlus size={18} /> Create Account</>}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;