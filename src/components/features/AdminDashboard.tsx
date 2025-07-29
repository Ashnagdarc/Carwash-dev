import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useBookings } from '../../hooks/useBookings';
import { useRevenueData } from '../../hooks/useRevenueData';

import {
    BarChart3,
    Calendar,
    Users,
    Settings,
    TrendingUp,
    DollarSign,
    Car,
    Star
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
    const { user } = useAuth();
    const location = useRouterLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const { bookings } = useBookings();
    const { revenueData, loading: revenueLoading } = useRevenueData();

    // Get tab from URL query params
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const tab = params.get('tab');
        if (tab) {
            setActiveTab(tab);
        }
    }, [location.search]);

    const handleTabChange = (tabId: string) => {
        setActiveTab(tabId);
        navigate(`/admin/dashboard?tab=${tabId}`);
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    // Mock data for admin dashboard
    const stats = {
        totalBookings: Array.isArray(bookings) ? bookings.length : 0,
        totalRevenue: 125000,
        activeUsers: 45,
        averageRating: 4.8,
        pendingBookings: Array.isArray(bookings) ? bookings.filter(b => b.status === 'Pending').length : 0,
        completedBookings: Array.isArray(bookings) ? bookings.filter(b => b.status === 'Completed').length : 0
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Welcome back, {user?.name}</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-white dark:bg-gray-800 rounded-lg p-1 mb-8 shadow-sm">
                    {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                            >
                                <IconComponent className="h-4 w-4" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                    {activeTab === 'overview' && (
                        <>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <Card className="p-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                            <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalBookings}</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                            <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Revenue</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">₦{stats.totalRevenue.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                            <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activeUsers}</p>
                                        </div>
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                                            <Star className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Avg Rating</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.averageRating}</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Revenue Chart */}
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue Trend</h3>
                                <div className="h-64">
                                    {revenueLoading ? (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-gray-500 dark:text-gray-400">Loading revenue data...</p>
                                        </div>
                                    ) : Array.isArray(revenueData) && revenueData.length > 0 ? (
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart data={revenueData}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="date" />
                                                <YAxis />
                                                <Tooltip />
                                                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-gray-500 dark:text-gray-400">No revenue data available</p>
                                        </div>
                                    )}
                                </div>
                            </Card>

                            {/* Recent Activity */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Bookings</h3>
                                    <div className="space-y-3">
                                        {Array.isArray(bookings) ? bookings.slice(0, 5).map((booking) => (
                                            <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{booking.service}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{booking.car}</p>
                                                </div>
                                                <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'Completed'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </div>
                                        )) : null}
                                    </div>
                                </Card>

                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                                    <div className="space-y-3">
                                        <Button className="w-full justify-start">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            View All Bookings
                                        </Button>
                                        <Button className="w-full justify-start" variant="outline">
                                            <Users className="h-4 w-4 mr-2" />
                                            Manage Users
                                        </Button>
                                        <Button className="w-full justify-start" variant="outline">
                                            <Car className="h-4 w-4 mr-2" />
                                            Service Settings
                                        </Button>
                                        <Button className="w-full justify-start" variant="outline">
                                            <TrendingUp className="h-4 w-4 mr-2" />
                                            View Analytics
                                        </Button>
                                    </div>
                                </Card>
                            </div>
                        </>
                    )}

                    {activeTab === 'bookings' && (
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Bookings</h3>
                            <div className="space-y-3">
                                {Array.isArray(bookings) ? bookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">{booking.service}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{booking.car} • {booking.date}</p>
                                        </div>
                                        <div className="text-right">
                                            <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'Completed'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                }`}>
                                                {booking.status}
                                            </span>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">{booking.amount}</p>
                                        </div>
                                    </div>
                                )) : null}
                            </div>
                        </Card>
                    )}

                    {activeTab === 'analytics' && (
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Analytics Dashboard</h3>
                            <p className="text-gray-600 dark:text-gray-400">Analytics features coming soon...</p>
                        </Card>
                    )}

                    {activeTab === 'users' && (
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">User Management</h3>
                            <p className="text-gray-600 dark:text-gray-400">User management features coming soon...</p>
                        </Card>
                    )}

                    {activeTab === 'settings' && (
                        <Card className="p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Admin Settings</h3>
                            <p className="text-gray-600 dark:text-gray-400">Admin settings features coming soon...</p>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 