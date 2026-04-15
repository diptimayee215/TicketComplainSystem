// import { motion } from "framer-motion";
// import { BarChart3, CheckCircle, Clock, Users } from "lucide-react";

// const Dashboard = () => {
//   const stats = [
//     {
//       title: "Total Tickets",
//       value: 120,
//       icon: BarChart3,
//       color: "bg-blue-500",
//     },
//     {
//       title: "Resolved",
//       value: 90,
//       icon: CheckCircle,
//       color: "bg-green-500",
//     },
//     {
//       title: "Pending",
//       value: 30,
//       icon: Clock,
//       color: "bg-yellow-500",
//     },
//     {
//       title: "Users",
//       value: 50,
//       icon: Users,
//       color: "bg-purple-500",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-slate-100 p-6">
      
//       {/* Title */}
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((item, index) => {
//           const Icon = item.icon;
//           return (
//             <motion.div
//               key={index}
//               className="bg-white p-5 rounded-2xl shadow-md flex items-center justify-between"
//               whileHover={{ scale: 1.05 }}
//             >
//               <div>
//                 <h2 className="text-gray-500 text-sm">{item.title}</h2>
//                 <p className="text-2xl font-bold">{item.value}</p>
//               </div>

//               <div className={`${item.color} p-3 rounded-full text-white`}>
//                 <Icon size={24} />
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Recent Activity Section */}
//       <div className="mt-10 bg-white p-6 rounded-2xl shadow-md">
//         <h2 className="text-xl font-semibold mb-4">Recent Tickets</h2>

//         <table className="w-full text-left">
//           <thead>
//             <tr className="border-b">
//               <th className="p-2">Ticket ID</th>
//               <th className="p-2">Category</th>
//               <th className="p-2">Status</th>
//             </tr>
//           </thead>

//           <tbody>
//             <tr className="border-b">
//               <td className="p-2">#1234</td>
//               <td className="p-2">Railway</td>
//               <td className="p-2 text-green-600">Resolved</td>
//             </tr>

//             <tr className="border-b">
//               <td className="p-2">#1235</td>
//               <td className="p-2">Bus</td>
//               <td className="p-2 text-yellow-600">Pending</td>
//             </tr>

//             <tr>
//               <td className="p-2">#1236</td>
//               <td className="p-2">Flight</td>
//               <td className="p-2 text-blue-600">In Progress</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// };


// export default Dashboard;



import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTicket } from '../context/TicketContext';
import StatsCard from '../components/dashboard/StatsCard';
import TicketChart from '../components/dashboard/TicketChart';
import RecentTickets from '../components/dashboard/RecentTickets';
import { FaTicketAlt, FaCheckCircle, FaClock, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();
  const { tickets, getTicketStats } = useTicket();
  const [stats, setStats] = useState({ total: 0, resolved: 0, pending: 0, inProgress: 0 });

  useEffect(() => {
    if (tickets) {
      const resolved = tickets.filter(t => t.status === 'resolved' || t.status === 'closed').length;
      const pending = tickets.filter(t => t.status === 'open').length;
      const inProgress = tickets.filter(t => t.status === 'in-progress' || t.status === 'assigned').length;
      setStats({
        total: tickets.length,
        resolved,
        pending,
        inProgress
      });
    }
  }, [tickets]);

  const statCards = [
    { title: 'Total Tickets', value: stats.total, icon: FaTicketAlt, color: 'bg-blue-500' },
    { title: 'Resolved', value: stats.resolved, icon: FaCheckCircle, color: 'bg-green-500' },
    { title: 'Pending', value: stats.pending, icon: FaClock, color: 'bg-yellow-500' },
    { title: 'In Progress', value: stats.inProgress, icon: FaChartLine, color: 'bg-purple-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 👋</h1>
        <p className="text-blue-100">Here's what's happening with your complaints today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts and Recent Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TicketChart tickets={tickets} />
        <RecentTickets tickets={tickets?.slice(0, 5)} />
      </div>
    </div>
  );
};

export default Dashboard;