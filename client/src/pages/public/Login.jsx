// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { motion } from "framer-motion";
// import { Eye, EyeOff, LogIn } from "lucide-react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsSubmitting(true);

//     try {
//       const result = await login(email, password);

//       if (result.success) {
//         const user = JSON.parse(localStorage.getItem("user"));

//         if (user?.role === "admin") {
//           navigate("/admin");
//         } else {
//           navigate("/profile");
//         }
//       } else {
//         setError(result.message || "Invalid email or password.");
//       }
//     } catch {
//       setError("Something went wrong. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-16">
//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2"
//       >
//         {/* Left Branding Section */}
//         <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white p-12">
//           <h2 className="text-4xl font-bold mb-6">Welcome Back 👋</h2>
//           <p className="text-white/80 text-center max-w-sm">
//             Access your dashboard to manage tickets, track complaints,
//             and monitor issue resolution efficiently.
//           </p>
//         </div>

//         {/* Right Form Section */}
//         <div className="p-10">
//           <h3 className="text-3xl font-bold text-gray-800 mb-6">
//             Sign In to Your Account
//           </h3>

//           {error && (
//             <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
//               {error}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Email */}
//             <div>
//               <label className="block text-sm font-semibold text-gray-600 mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <label className="block text-sm font-semibold text-gray-600 mb-1">
//                 Password
//               </label>
//               <input
//                 type={showPassword ? "text" : "password"}
//                 className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 outline-none transition"
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//               />
//               <div
//                 className="absolute right-3 top-11 cursor-pointer text-gray-500"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//               </div>
//             </div>

//             {/* Remember Me */}
//             <div className="flex justify-between items-center text-sm">
//               <label className="flex items-center gap-2 text-gray-600">
//                 <input type="checkbox" className="accent-indigo-600" />
//                 Remember me
//               </label>

//               <Link
//                 to="/forgot-password"
//                 className="text-indigo-600 hover:underline"
//               >
                
//               </Link>
//             </div>

//             {/* Submit */}
//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60"
//             >
//               {isSubmitting ? (
//                 "Signing In..."
//               ) : (
//                 <>
//                   Sign In <LogIn size={18} />
//                 </>
//               )}
//             </motion.button>
//           </form>

//           {/* Register */}
//           <p className="mt-6 text-sm text-gray-600">
//             Don’t have an account?{" "}
//             <Link
//               to="/register"
//               className="text-indigo-600 font-semibold hover:underline"
//             >
//               Create one
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, LogIn, Zap, CheckCircle2, Train, Bus, Plane, Film } from "lucide-react";

const Login = () => {
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [show, setShow]           = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);
  const { login }                 = useAuth();
  const navigate                  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        const user = JSON.parse(localStorage.getItem("user"));
        navigate(user?.role === "admin" ? "/admin" : "/profile");
      } else {
        setError(result.message || "Invalid email or password.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const perks = [
    "Submit complaints for train, bus, flight & more",
    "Track every ticket with real-time status updates",
    "Get admin remarks and resolution notifications",
    "Free forever — no credit card required",
  ];

  const icons = [Train, Bus, Plane, Film];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 px-6 py-16">
      <motion.div initial={{ opacity:0,y:40 }} animate={{ opacity:1,y:0 }} transition={{ duration:0.6 }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2"
      >
        {/* Left branding */}
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white p-12 relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-white opacity-5 blur-2xl"/>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-white opacity-5 blur-2xl"/>
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="lgrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="white" strokeWidth="1"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#lgrid)"/>
          </svg>

          <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-10">
              <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
                <Zap size={18} className="text-white"/>
              </div>
              <span className="text-xl font-extrabold">TicketSys</span>
            </div>

            <h2 className="text-3xl font-extrabold mb-3 leading-tight">
              Welcome Back! 👋
            </h2>
            <p className="text-white/70 mb-8 leading-relaxed text-sm">
              Sign in to track your complaints, view admin responses, and manage all your tickets in one place.
            </p>

            <div className="space-y-3 mb-10">
              {perks.map((p, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={16} className="text-emerald-300 shrink-0"/>
                  <span className="text-sm text-white/80">{p}</span>
                </div>
              ))}
            </div>

            {/* Category icons */}
            <div className="flex gap-3">
              {icons.map((Icon, i) => (
                <div key={i} className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                  <Icon size={16} className="text-white/80"/>
                </div>
              ))}
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-white/60 text-xs font-bold">+2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <div className="p-10 flex flex-col justify-center">
          <div className="mb-2 flex items-center gap-2 md:hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Zap size={16} className="text-white"/>
            </div>
            <span className="font-extrabold text-slate-900">TicketSys</span>
          </div>

          <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Sign In to Your Account</h3>
          <p className="text-slate-400 text-sm mb-8">
            New here?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Create a free account</Link>
          </p>

          {error && (
            <div className="mb-5 p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"/>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold text-slate-700">Password</label>
              </div>
              <div className="relative">
                <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition pr-11"
                />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {show ? <EyeOff size={18}/> : <Eye size={18}/>}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                <input type="checkbox" className="accent-indigo-600 rounded"/> Remember me
              </label>
            </div>

            <motion.button whileTap={{ scale:0.98 }} type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60 shadow-lg shadow-indigo-200"
            >
              {loading ? "Signing In…" : <><LogIn size={18}/> Sign In</>}
            </motion.button>
          </form>

          <p className="mt-6 text-sm text-slate-500 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 font-semibold hover:underline">Register for free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;