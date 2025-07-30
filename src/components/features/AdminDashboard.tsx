import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';

import UberButton from '../ui/UberButton';

import UberModal from '../ui/UberModal';
import UberInput from '../ui/UberInput';
import { useBookings } from '../../hooks/useBookings';
import { useRevenueData } from '../../hooks/useRevenueData';
import { AdminRequestManagement } from './AdminRequestManagement';
import AdminDashboardOverview from './adminDashboard/AdminDashboardOverview';
import AdminDashboardActivity from './adminDashboard/AdminDashboardActivity';
import AdminDashboardUsers from './adminDashboard/AdminDashboardUsers';
import AdminDashboardAnalytics from './adminDashboard/AdminDashboardAnalytics';
import AdminDashboardSettings from './adminDashboard/AdminDashboardSettings';

import {
    BarChart3,
    Calendar,
    Users,
    Settings,
    TrendingUp,
    Clock,
    Activity,
    CheckCircle,
    Plus,
    MapPin,
    X
} from 'lucide-react';

const AdminDashboard = () => {
    const { user } = useAuth();
    const location = useRouterLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'user',
        password: ''
    });
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'user', status: 'active' }
    ]);
    const { bookings } = useBookings();
    const { revenueData, loading: revenueLoading } = useRevenueData();

    // Settings state management
    const [settings, setSettings] = useState({
        general: {
            companyName: 'CarWash Pro',
            contactEmail: 'admin@carwashpro.com',
            phoneNumber: '+234 801 234 5678',
            businessAddress: '123 Main Street, Lagos',
            openingTime: '08:00',
            closingTime: '18:00'
        },
        services: {
            basicWash: { price: 2500, active: true },
            premiumWash: { price: 5000, active: true },
            fullDetailing: { price: 8500, active: true }
        },
        notifications: {
            email: true,
            sms: false,
            push: true
        },
        payment: {
            methods: {
                cashOnDelivery: true,
                bankTransfer: true,
                creditCard: false,
                inAppWallet: true
            },
            wallet: {
                minBalance: 1000,
                maxBalance: 50000,
                autoRecharge: true
            }
        },
        security: {
            sessionTimeout: 30,
            maxLoginAttempts: 5,
            twoFactorAuth: false,
            passwordPolicy: true
        }
    });

    const [showSettingsSaved, setShowSettingsSaved] = useState(false);

    // Activity Center state
    const [activeFilter, setActiveFilter] = useState('all');
    const [activities] = useState([
        {
            id: 1,
            type: 'booking',
            title: 'New booking created',
            description: 'Premium wash scheduled for tomorrow at 2:00 PM',
            timestamp: '2 minutes ago',
            icon: Plus,
            color: 'blue'
        },
        {
            id: 2,
            type: 'service',
            title: 'Service completed',
            description: 'Basic wash finished for Toyota Camry - Customer rated 5 stars',
            timestamp: '15 minutes ago',
            icon: CheckCircle,
            color: 'green'
        },
        {
            id: 3,
            type: 'location',
            title: 'Location updated',
            description: 'Service location changed to downtown area for better accessibility',
            timestamp: '1 hour ago',
            icon: MapPin,
            color: 'purple'
        },
        {
            id: 4,
            type: 'analytics',
            title: 'Performance update',
            description: 'Customer satisfaction increased by 15% this week',
            timestamp: '2 hours ago',
            icon: TrendingUp,
            color: 'orange'
        },
        {
            id: 5,
            type: 'booking',
            title: 'Booking cancelled',
            description: 'Deluxe detail cancelled by customer - refund processed',
            timestamp: '3 hours ago',
            icon: X,
            color: 'red'
        },
        {
            id: 6,
            type: 'service',
            title: 'Service started',
            description: 'Premium wash started for BMW X5 - estimated completion in 45 minutes',
            timestamp: '4 hours ago',
            icon: Clock,
            color: 'light-blue'
        }
    ]);

    const activityStats = {
        totalActivities: 1247,
        thisWeek: 89,
        activeServices: 12,
        revenueToday: 245000
    };

    // Mock data for admin dashboard
    const stats = {
        totalBookings: Array.isArray(bookings) ? bookings.length : 0,
        totalRevenue: 125000,
        activeUsers: 45,
        averageRating: 4.8,
        pendingBookings: Array.isArray(bookings) ? bookings.filter(b => b.status === 'Pending').length : 0,
        completedBookings: Array.isArray(bookings) ? bookings.filter(b => b.status === 'Completed').length : 0
    };

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
        // Update URL without navigating to a new route
        navigate(`/dashboard?tab=${tabId}`, { replace: true });
    };

    const handleAddUser = () => {
        if (newUser.name && newUser.email && newUser.password) {
            const userToAdd = {
                id: users.length + 1,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                status: 'active'
            };
            setUsers([...users, userToAdd]);
            setNewUser({ name: '', email: '', role: 'user', password: '' });
            setIsAddUserModalOpen(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setNewUser(prev => ({ ...prev, [field]: value }));
    };

    // Settings handlers
    const handleGeneralSettingChange = (field: string, value: string) => {
        setSettings(prev => ({
            ...prev,
            general: {
                ...prev.general,
                [field]: value
            }
        }));
    };

    const handleServiceSettingChange = (service: string, field: string, value: number | boolean) => {
        setSettings(prev => ({
            ...prev,
            services: {
                ...prev.services,
                [service]: {
                    ...prev.services[service as keyof typeof prev.services],
                    [field]: value
                }
            }
        }));
    };

    const handleNotificationChange = (type: string, value: boolean) => {
        setSettings(prev => ({
            ...prev,
            notifications: {
                ...prev.notifications,
                [type]: value
            }
        }));
    };

    const handlePaymentMethodChange = (method: string, value: boolean) => {
        setSettings(prev => ({
            ...prev,
            payment: {
                ...prev.payment,
                methods: {
                    ...prev.payment.methods,
                    [method]: value
                }
            }
        }));
    };

    const handleWalletSettingChange = (field: string, value: number | boolean) => {
        setSettings(prev => ({
            ...prev,
            payment: {
                ...prev.payment,
                wallet: {
                    ...prev.payment.wallet,
                    [field]: value
                }
            }
        }));
    };

    const handleSecuritySettingChange = (field: string, value: number | boolean) => {
        setSettings(prev => ({
            ...prev,
            security: {
                ...prev.security,
                [field]: value
            }
        }));
    };

    const handleSaveSettings = () => {
        // Here you would typically save to an API
        console.log('Settings saved:', settings);
        setShowSettingsSaved(true);
        setTimeout(() => setShowSettingsSaved(false), 3000);
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'requests', label: 'Requests', icon: Calendar },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'activity', label: 'Activity', icon: Activity },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-uber pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-display font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-body text-gray-600">Welcome back, {user?.name}</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-2 bg-white rounded-2xl p-2 mb-10 shadow-lg border border-gray-200">
                    {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-body font-medium transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-blue-50 text-blue-700 shadow-md border border-blue-200'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <IconComponent className="h-5 w-5" />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Tab Content */}
                <div className="space-y-10">
                    {activeTab === 'overview' && (
                        <AdminDashboardOverview
                            stats={stats}
                            revenueData={revenueData}
                            revenueLoading={revenueLoading}
                        />
                    )}

                    {activeTab === 'requests' && (
                        <AdminRequestManagement />
                    )}

                    {activeTab === 'analytics' && (
                        <AdminDashboardAnalytics
                            stats={stats}
                            revenueData={revenueData}
                            revenueLoading={revenueLoading}
                        />
                    )}

                    {activeTab === 'activity' && (
                        <AdminDashboardActivity
                            activityStats={activityStats}
                            activities={activities}
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                        />
                    )}

                    {activeTab === 'users' && (
                        <AdminDashboardUsers
                            users={users}
                            setIsAddUserModalOpen={setIsAddUserModalOpen}
                        />
                    )}

                    {activeTab === 'settings' && (
                        <AdminDashboardSettings
                            settings={settings}
                            handleGeneralSettingChange={handleGeneralSettingChange}
                            handleServiceSettingChange={handleServiceSettingChange}
                            handleNotificationChange={handleNotificationChange}
                            handlePaymentMethodChange={handlePaymentMethodChange}
                            handleWalletSettingChange={handleWalletSettingChange}
                            handleSecuritySettingChange={handleSecuritySettingChange}
                        />
                    )}
                </div>
            </div>

            {/* Add User Modal */}
            <UberModal
                isOpen={isAddUserModalOpen}
                onClose={() => setIsAddUserModalOpen(false)}
                title="Add New User"
                size="md"
            >
                <div className="space-y-6">
                    <UberInput
                        label="Full Name"
                        placeholder="Enter full name"
                        value={newUser.name}
                        onChange={(value) => handleInputChange('name', value)}
                    />

                    <UberInput
                        label="Email"
                        placeholder="Enter email address"
                        value={newUser.email}
                        onChange={(value) => handleInputChange('email', value)}
                        type="email"
                    />

                    <UberInput
                        label="Password"
                        placeholder="Enter password"
                        value={newUser.password}
                        onChange={(value) => handleInputChange('password', value)}
                        type="password"
                    />

                    <div>
                        <label className="block text-caption font-medium text-gray-700 mb-3">
                            Role
                        </label>
                        <select
                            value={newUser.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-body focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div className="flex gap-4">
                        <UberButton
                            variant="outline"
                            size="md"
                            onClick={() => setIsAddUserModalOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </UberButton>
                        <UberButton
                            variant="primary"
                            size="md"
                            onClick={handleAddUser}
                            className="flex-1"
                        >
                            Add User
                        </UberButton>
                    </div>
                </div>
            </UberModal>
        </div>
    );
};

export default AdminDashboard; 