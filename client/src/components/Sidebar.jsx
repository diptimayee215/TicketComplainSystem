// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//   const { logout } = useAuth();

//   return (
//     <div className="w-64 bg-gray-800 h-screen text-white flex flex-col">
//       <div className="p-4 text-2xl font-bold border-b border-gray-700">
//         Admin Panel
//       </div>
//       <nav className="flex-1 p-4 space-y-2">
//         <Link to="/admin" className="block py-2 px-4 hover:bg-gray-700 rounded">Dashboard</Link>
//         <Link to="/admin/users" className="block py-2 px-4 hover:bg-gray-700 rounded">Users</Link>
//         <Link to="/admin/complaints" className="block py-2 px-4 hover:bg-gray-700 rounded">Complaints</Link>
//         <Link to="/admin/contacts" className="block py-2 px-4 hover:bg-gray-700 rounded">Contacts</Link>
//         <Link to="/" className="block py-2 px-4 hover:bg-gray-700 rounded text-gray-400">Back to Site</Link>
//       </nav>
//       <div className="p-4 border-t border-gray-700">
//         <button 
//           onClick={logout} 
//           className="w-full bg-red-600 py-2 rounded hover:bg-red-700"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  LayoutDashboard, Ticket, Users, Mail,
  Home, LogOut, Zap, ChevronLeft, ChevronRight,
  Shield,
} from "lucide-react";

const NAV = [
  { section: "Overview", items: [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  ]},
  { section: "Manage", items: [
    { to: "/admin/complaints", label: "Complaints", icon: Ticket, badge: null, badgeColor: "amber" },
    { to: "/admin/users",      label: "Users",      icon: Users  },
    { to: "/admin/contacts",   label: "Contacts",   icon: Mail,  badge: null, badgeColor: "blue" },
  ]},
  { section: "Site", items: [
    { to: "/", label: "Back to Site", icon: Home },
  ]},
];

const Sidebar = ({ badgeCounts = {} }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isActive = (to, exact) =>
    exact ? location.pathname === to : location.pathname.startsWith(to);

  const initials = user?.name?.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex flex-col bg-slate-900 border-r border-slate-800 h-screen overflow-hidden shrink-0"
    >
      {/* Brand */}
      <div className="h-16 flex items-center px-4 border-b border-slate-800 gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md shrink-0">
          <Zap size={15} className="text-white" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="overflow-hidden"
            >
              <div className="text-white font-bold text-sm leading-tight whitespace-nowrap">TicketSys</div>
              <div className="text-slate-500 text-xs whitespace-nowrap">Admin Panel</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-4 -right-3 z-10 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-700 transition"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {NAV.map(({ section, items }) => (
          <div key={section}>
            {!collapsed && (
              <div className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest px-2 pt-4 pb-1.5">
                {section}
              </div>
            )}
            {collapsed && <div className="h-3" />}
            {items.map(({ to, label, icon: Icon, badge, badgeColor, exact }) => {
              const active = isActive(to, exact);
              const count = badgeCounts[label];
              return (
                <Link
                  key={to}
                  to={to}
                  title={collapsed ? label : undefined}
                  className={`flex items-center gap-2.5 px-2 py-2 rounded-xl transition-all duration-150 group ${
                    active
                      ? "bg-indigo-500/15 border border-indigo-500/25"
                      : "hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    active ? "bg-indigo-500/20" : "bg-slate-800 group-hover:bg-slate-700"
                  }`}>
                    <Icon size={14} className={active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"} />
                  </div>
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`text-sm font-medium whitespace-nowrap flex-1 ${
                          active ? "text-indigo-300" : "text-slate-400 group-hover:text-slate-200"
                        }`}
                      >
                        {label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  {!collapsed && count > 0 && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      badgeColor === "amber"
                        ? "bg-amber-500/15 text-amber-400"
                        : "bg-blue-500/15 text-blue-400"
                    }`}>
                      {count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* User */}
      <div className="p-2 border-t border-slate-800">
        <div className={`flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 ${collapsed ? "justify-center" : ""}`}>
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {initials}
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex-1 min-w-0"
              >
                <div className="text-white text-xs font-semibold truncate">{user?.name}</div>
                <div className="text-slate-500 text-[10px] capitalize">{user?.role}</div>
              </motion.div>
            )}
          </AnimatePresence>
          {!collapsed && (
            <button
              onClick={logout}
              className="w-6 h-6 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition shrink-0"
              title="Sign out"
            >
              <LogOut size={11} />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;