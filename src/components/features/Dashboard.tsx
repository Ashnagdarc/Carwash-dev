import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  // Render appropriate dashboard based on user role
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  } else if (user?.role === 'user') {
    return <UserDashboard />;
  }

  // Loading state while user data is being determined
  return (
    <div className="min-h-screen bg-white font-uber flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-display font-bold text-gray-900 mb-4">Loading...</h1>
        <p className="text-body text-gray-600">Preparing your dashboard.</p>
      </div>
    </div>
  );
};

export default Dashboard;