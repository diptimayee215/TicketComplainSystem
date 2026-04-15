import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, User, LogOut, LayoutDashboard,
  ChevronDown, Zap, Home, Info, Phone, Shield,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); setDropdownOpen(false); }, [location]);

  const navLinks = [
    { to: "/", label: "Home", icon: <Home size={15}/> },
    { to: "/about", label: "About", icon: <Info size={15}/> },
    { to: "/contact", label: "Contact", icon: <Phone size={15}/> },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/60"
          : "bg-white/80 backdrop-blur-md shadow-sm"
      }`}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"/>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* ── Logo ── */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shadow-indigo-200 group-hover:scale-105 transition-transform">
              <Zap size={18} className="text-white"/>
            </div>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
              TicketSys
            </span>
          </Link>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} label={label} active={location.pathname === to}/>
            ))}
          </div>

          {/* ── Desktop Auth ── */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 px-4 py-2 rounded-xl transition-all duration-200 font-medium text-sm"
                >
                  {/* Avatar circle */}
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span>{user.name}</span>
                  <ChevronDown
                    size={14}
                    className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <>
                      {/* Backdrop */}
                      <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}/>
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl shadow-slate-200/80 border border-slate-100 py-2 z-20 overflow-hidden"
                      >
                        {/* User info header */}
                        <div className="px-4 py-3 border-b border-slate-100 mb-1">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-slate-800 truncate max-w-[120px]">{user.name}</div>
                              <div className="text-xs text-slate-400 capitalize">{user.role}</div>
                            </div>
                          </div>
                        </div>

                        {user.role === "user" && (
                          <DropdownItem to="/profile" icon={<User size={15}/>} label="My Profile"/>
                        )}
                        {user.role === "admin" && (
                          <DropdownItem to="/admin" icon={<Shield size={15}/>} label="Admin Panel"/>
                        )}
                        <DropdownItem to="/dashboard" icon={<LayoutDashboard size={15}/>} label="Dashboard"/>

                        <div className="border-t border-slate-100 mt-1 pt-1">
                          <button
                            onClick={logout}
                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors duration-150 font-medium"
                          >
                            <LogOut size={15}/> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-indigo-600 font-medium text-sm px-4 py-2 rounded-xl hover:bg-indigo-50 transition-all duration-200"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="relative group bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 hover:scale-105 transition-all duration-200 overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? <X size={20}/> : <Menu size={20}/>}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-slate-100"
          >
            <div className="bg-white px-4 py-4 space-y-1">
              {navLinks.map(({ to, label, icon }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={to}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-150 ${
                      location.pathname === to
                        ? "bg-indigo-50 text-indigo-600"
                        : "text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                    }`}
                  >
                    <span className={`${location.pathname === to ? "text-indigo-500" : "text-slate-400"}`}>{icon}</span>
                    {label}
                  </Link>
                </motion.div>
              ))}

              <div className="border-t border-slate-100 pt-3 mt-3">
                {user ? (
                  <>
                    {/* Mobile user info */}
                    <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl mb-2">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{user.name}</div>
                        <div className="text-xs text-slate-400 capitalize">{user.role}</div>
                      </div>
                    </div>

                    {user.role === "user" && (
                      <MobileMenuItem to="/profile" icon={<User size={15}/>} label="My Profile"/>
                    )}
                    {user.role === "admin" && (
                      <MobileMenuItem to="/admin" icon={<Shield size={15}/>} label="Admin Panel"/>
                    )}
                    <MobileMenuItem to="/dashboard" icon={<LayoutDashboard size={15}/>} label="Dashboard"/>

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 font-medium text-sm transition mt-1"
                    >
                      <LogOut size={15}/> Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-md hover:scale-[1.02] transition"
                    >
                      Get Started Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* Desktop NavLink with active indicator */
const NavLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? "text-indigo-600 bg-indigo-50"
        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
    }`}
  >
    {label}
    {active && (
      <motion.div
        layoutId="nav-indicator"
        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-500"
      />
    )}
  </Link>
);

/* Dropdown item */
const DropdownItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-150 font-medium"
  >
    <span className="text-slate-400">{icon}</span>
    {label}
  </Link>
);

/* Mobile menu item */
const MobileMenuItem = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 font-medium text-sm transition"
  >
    <span className="text-slate-400">{icon}</span>
    {label}
  </Link>
);

export default Navbar;