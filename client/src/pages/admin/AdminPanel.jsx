import React, { useState, useEffect } from 'react';
import { useTicket } from '../context/TicketContext';
import { FaUsers, FaTicketAlt, FaChartPie, FaFilter } from 'react-icons/fa';

const AdminPanel = () => {
  const { tickets, users, updateTicket, getTicketStats } = useTicket();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filter, setFilter] = useState('all');
  const [stats, setStats] = useState({ total: 0, open: 0, inProgress: 0, resolved: 0 });

  useEffect(() => {
    if (tickets) {
      setStats({
        total: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        inProgress: tickets.filter(t => t.status === 'in-progress').length,
        resolved: tickets.filter(t => t.status === 'resolved').length
      });
    }
  }, [tickets]);

  const filteredTickets = tickets?.filter(ticket => {
    if (filter === 'all') return true;
    return ticket.status === filter;
  });

  const handleStatusChange = async (ticketId, newStatus) => {
    await updateTicket(ticketId, { status: newStatus });
  };

  const handleAssignAgent = async (ticketId, agentId) => {
    await updateTicket(ticketId, { assignedTo: agentId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Tickets</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <FaTicketAlt className="text-blue-500 text-3xl" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Open Tickets</p>
              <p className="text-2xl font-bold text-yellow-500">{stats.open}</p>
            </div>
            <FaChartPie className="text-yellow-500 text-3xl" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-blue-500">{stats.inProgress}</p>
            </div>
            <FaChartPie className="text-blue-500 text-3xl" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Resolved</p>
              <p className="text-2xl font-bold text-green-500">{stats.resolved}</p>
            </div>
            <FaUsers className="text-green-500 text-3xl" />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 shadow">
        <div className="flex items-center gap-4">
          <FaFilter className="text-gray-500" />
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('open')}
            className={`px-4 py-2 rounded ${filter === 'open' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Open
          </button>
          <button
            onClick={() => setFilter('in-progress')}
            className={`px-4 py-2 rounded ${filter === 'in-progress' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilter('resolved')}
            className={`px-4 py-2 rounded ${filter === 'resolved' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ticket ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTickets?.map((ticket) => (
              <tr key={ticket._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 text-sm">{ticket.ticketNumber}</td>
                <td className="px-6 py-4 text-sm capitalize">{ticket.category}</td>
                <td className="px-6 py-4 text-sm">{ticket.subject}</td>
                <td className="px-6 py-4">
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(ticket._id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="open">Open</option>
                    <option value="assigned">Assigned</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs rounded ${
                    ticket.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                    ticket.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => setSelectedTicket(ticket)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Ticket Details</h2>
            <div className="space-y-4">
              <div>
                <label className="font-semibold">Ticket Number:</label>
                <p>{selectedTicket.ticketNumber}</p>
              </div>
              <div>
                <label className="font-semibold">Subject:</label>
                <p>{selectedTicket.subject}</p>
              </div>
              <div>
                <label className="font-semibold">Description:</label>
                <p>{selectedTicket.description}</p>
              </div>
              <div>
                <label className="font-semibold">Add Comment:</label>
                <textarea
                  className="w-full border rounded p-2 mt-1"
                  rows="3"
                  placeholder="Add your response..."
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    // Add comment logic here
                    setSelectedTicket(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;