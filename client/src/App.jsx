import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Login from './pages/public/Login';
// import Contact from "./pages/public/Contact";
import Register from './pages/public/Register';
import Profile from './pages/user/Profile';
import AdminDashboard from './pages/admin/AdminDashboard';

// Route Guards
import ProtectedRoute from './route/ProtectedRoute';
import PublicRoute from './route/PublicRoute';
import Contact  from './pages/public/Contact';
import AdminTickets from './pages/admin/AdminTickets';
import AdminContacts from './pages/admin/AdminContacts';
import SubmitTicket from './pages/SubmitTicket';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminUser from './pages/admin/AdminUser';

function App() {
  return (
    <Routes>
      {/* Public Routes with Main Layout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="contact" element={<Contact />} />
        <Route path="submit" element={<SubmitTicket />} />

        {/* Only accessible if NOT logged in */}
        <Route
          path="login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Only accessible if logged in */}
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin Routes with Admin Layout */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="tickets" element={<AdminTickets />} />
        <Route path="contacts" element={<AdminContacts />} />
        <Route path="complaints" element={<AdminComplaints />} />
        <Route path="users" element={<AdminUser />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

