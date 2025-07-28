import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to appropriate dashboard based on user role
    if (user?.role === 'admin') {
      navigate('/admin/dashboard', { replace: true });
    } else if (user?.role === 'user') {
      navigate('/user/dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Loading state while redirecting
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Redirecting...</h1>
        <p className="text-gray-600 dark:text-gray-400">Taking you to your dashboard.</p>
      </div>
    </div>
  );
};

export default Dashboard;