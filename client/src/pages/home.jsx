import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrain, FaBus, FaPlane, FaFilm, FaShoppingBag, FaMobileAlt } from 'react-icons/fa';

const categories = [
  { icon: FaTrain, name: 'Train', color: 'from-blue-500 to-blue-600', description: 'Railway complaints, delays, refunds' },
  { icon: FaBus, name: 'Bus', color: 'from-green-500 to-green-600', description: 'Bus delays, driver issues, ticketing' },
  { icon: FaPlane, name: 'Flight', color: 'from-purple-500 to-purple-600', description: 'Flight delays, baggage, cancellations' },
  { icon: FaFilm, name: 'Movie', color: 'from-red-500 to-red-600', description: 'Cinema experience, booking issues' },
  { icon: FaShoppingBag, name: 'Shopping', color: 'from-pink-500 to-pink-600', description: 'E-commerce, delivery, returns' },
  { icon: FaMobileAlt, name: 'Digital', color: 'from-indigo-500 to-indigo-600', description: 'Apps, websites, digital services' }
];

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Your Voice, Our Priority
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          File complaints instantly across multiple services. Get resolution faster than ever.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/create-ticket" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition transform hover:scale-105">
            File a Complaint
          </Link>
          <Link to="/track" className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            Track Your Ticket
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-blue-600">98%</div>
          <div className="text-gray-600 dark:text-gray-300">Resolution Rate</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-green-600">24h</div>
          <div className="text-gray-600 dark:text-gray-300">Average Response</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center">
          <div className="text-3xl font-bold text-purple-600">10K+</div>
          <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
        </div>
      </div>

      {/* Category Cards */}
      <h2 className="text-3xl font-bold text-center mb-8">Choose Your Complaint Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <Link to="/create-ticket" key={index} state={{ category: category.name.toLowerCase() }}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 cursor-pointer">
              <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                <category.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;