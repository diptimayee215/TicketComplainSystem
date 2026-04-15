import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTicket } from '../../context/TicketContext';
import { FaTrain, FaBus, FaPlane, FaFilm, FaShoppingBag, FaMobileAlt, FaUpload } from 'react-icons/fa';

const categories = [
  { id: 'train', name: 'Train', icon: FaTrain, color: 'blue' },
  { id: 'bus', name: 'Bus', icon: FaBus, color: 'green' },
  { id: 'plane', name: 'Flight', icon: FaPlane, color: 'purple' },
  { id: 'movie', name: 'Movie', icon: FaFilm, color: 'red' },
  { id: 'shopping', name: 'Shopping', icon: FaShoppingBag, color: 'pink' },
  { id: 'digital', name: 'Digital', icon: FaMobileAlt, color: 'indigo' }
];

const TicketForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { createTicket } = useTicket();
  const [formData, setFormData] = useState({
    category: location.state?.category || '',
    subject: '',
    description: '',
    priority: 'medium',
    attachments: []
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTicket(formData);
      navigate('/my-tickets');
    } catch (error) {
      console.error('Error creating ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, attachments: files });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category Selection Cards */}
      <div>
        <label className="block text-sm font-medium mb-3">Select Category</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setFormData({ ...formData, category: cat.id })}
              className={`p-4 rounded-lg border-2 transition-all ${
                formData.category === cat.id
                  ? `border-${cat.color}-500 bg-${cat.color}-50`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <cat.icon className={`text-2xl mx-auto mb-2 text-${cat.color}-500`} />
              <div className="font-medium">{cat.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium mb-2">Subject</label>
        <input
          type="text"
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          placeholder="Brief summary of your complaint"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <textarea
          required
          rows="5"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Provide detailed information about your issue..."
        />
      </div>

      {/* Priority */}
      <div>
        <label className="block text-sm font-medium mb-2">Priority</label>
        <select
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          value={formData.priority}
          onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
        >
          <option value="low">Low - Not urgent</option>
          <option value="medium">Medium - Important</option>
          <option value="high">High - Very Important</option>
          <option value="urgent">Urgent - Critical issue</option>
        </select>
      </div>

      {/* Attachments */}
      <div>
        <label className="block text-sm font-medium mb-2">Attachments (Optional)</label>
        <div className="border-2 border-dashed rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <FaUpload className="mx-auto text-2xl text-gray-400 mb-2" />
            <span className="text-blue-600">Click to upload</span>
            <span className="text-gray-500"> or drag and drop</span>
            <p className="text-xs text-gray-400 mt-2">PDF, PNG, JPG up to 5MB</p>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Complaint'}
      </button>
    </form>
  );
};

export default TicketForm;