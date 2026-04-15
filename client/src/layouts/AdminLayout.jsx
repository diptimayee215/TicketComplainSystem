// import { Outlet, Navigate } from 'react-router-dom';
// import Sidebar from '../components/Sidebar';
// import { useAuth } from '../context/AuthContext';

// const AdminLayout = () => {
//   const { user, loading } = useAuth();

//   if (loading) return <div>Loading...</div>;

//   // Protect Admin Route
//   if (!user || user.role !== 'admin') {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <div className="flex-1 p-8 overflow-y-auto h-screen">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-slate-400 text-sm">Loading...</p>
      </div>
    </div>
  );

  if (!user || user.role !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="flex h-screen bg-slate-900 overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;