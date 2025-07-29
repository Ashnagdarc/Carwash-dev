import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import UberCard from '../ui/UberCard';
import UberButton from '../ui/UberButton';
import UberBadge from '../ui/UberBadge';
import UberModal from '../ui/UberModal';
import UberInput from '../ui/UberInput';
import { useBookings } from '../../hooks/useBookings';
import { useRevenueData } from '../../hooks/useRevenueData';
import { AdminRequestManagement } from './AdminRequestManagement';

import {
    BarChart3,
    Calendar,
    Users,
    Settings,
    TrendingUp,
    DollarSign,
    Car,
    Star,
    Clock,
    Award,
    Activity,
    CheckCircle,
    User,
    Plus,
    MapPin,
    X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        <div className="min-h-screen bg-white font-uber pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-display font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-body text-gray-600">Welcome back, {user?.name}</p>
                </div>

                {/* Tab Navigation */}
                <div className="flex space-x-2 bg-gray-100 rounded-2xl p-2 mb-10">
                    {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => handleTabChange(tab.id)}
                                className={`flex items-center space-x-3 px-6 py-3 rounded-xl text-body font-medium transition-all duration-200 ${activeTab === tab.id
                                    ? 'bg-white text-gray-900 shadow-md'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
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
                        <>
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <UberCard variant="default" padding="lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                            <Calendar className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-caption text-gray-600">Total Bookings</p>
                                            <p className="text-subheading font-bold text-gray-900">{stats.totalBookings}</p>
                                        </div>
                                    </div>
                                </UberCard>

                                <UberCard variant="default" padding="lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                            <DollarSign className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-caption text-gray-600">Total Revenue</p>
                                            <p className="text-subheading font-bold text-gray-900">₦{stats.totalRevenue.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </UberCard>

                                <UberCard variant="default" padding="lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                                            <Users className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-caption text-gray-600">Active Users</p>
                                            <p className="text-subheading font-bold text-gray-900">{stats.activeUsers}</p>
                                        </div>
                                    </div>
                                </UberCard>

                                <UberCard variant="default" padding="lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                                            <Star className="h-6 w-6 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-caption text-gray-600">Average Rating</p>
                                            <div className="flex items-center space-x-1">
                                                <p className="text-subheading font-bold text-gray-900">{stats.averageRating}</p>
                                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                            </div>
                                        </div>
                                    </div>
                                </UberCard>
                            </div>

                            {/* Charts and Analytics */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Revenue Chart */}
                                <UberCard variant="elevated" padding="lg">
                                    <h3 className="text-heading font-semibold text-gray-900 mb-6">Revenue Overview</h3>
                                    {revenueLoading ? (
                                        <div className="h-64 flex items-center justify-center">
                                            <div className="text-body text-gray-600">Loading chart...</div>
                                        </div>
                                    ) : revenueData && Array.isArray(revenueData) ? (
                                        <ResponsiveContainer width="100%" height={250}>
                                            <LineChart data={revenueData}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                                <XAxis
                                                    dataKey="month"
                                                    stroke="#6b7280"
                                                    fontSize={12}
                                                />
                                                <YAxis
                                                    stroke="#6b7280"
                                                    fontSize={12}
                                                    tickFormatter={(value) => `₦${value}k`}
                                                />
                                                <Tooltip
                                                    contentStyle={{
                                                        backgroundColor: 'white',
                                                        border: '1px solid #e5e7eb',
                                                        borderRadius: '12px',
                                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                                                    }}
                                                    formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Revenue']}
                                                />
                                                <Line
                                                    type="monotone"
                                                    dataKey="revenue"
                                                    stroke="#3b82f6"
                                                    strokeWidth={3}
                                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                                />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    ) : (
                                        <div className="h-64 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                    <BarChart3 className="h-8 w-8 text-gray-400" />
                                                </div>
                                                <p className="text-body text-gray-600">No data available</p>
                                            </div>
                                        </div>
                                    )}
                                </UberCard>

                                {/* Recent Activity */}
                                <UberCard variant="elevated" padding="lg">
                                    <h3 className="text-heading font-semibold text-gray-900 mb-6">Recent Activity</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                                            <div className="w-10 h-10 bg-green-100 rounded-2xl flex items-center justify-center">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-body font-medium text-gray-900">New booking completed</p>
                                                <p className="text-caption text-gray-500">2 minutes ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                                            <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-body font-medium text-gray-900">New user registered</p>
                                                <p className="text-caption text-gray-500">15 minutes ago</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                                            <div className="w-10 h-10 bg-yellow-100 rounded-2xl flex items-center justify-center">
                                                <Star className="h-5 w-5 text-yellow-600" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-body font-medium text-gray-900">New review received</p>
                                                <p className="text-caption text-gray-500">1 hour ago</p>
                                            </div>
                                        </div>
                                    </div>
                                </UberCard>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <UberCard variant="default" padding="lg">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Clock className="h-6 w-6 text-orange-600" />
                                        </div>
                                        <p className="text-caption text-gray-600 mb-2">Pending Bookings</p>
                                        <p className="text-subheading font-bold text-gray-900">{stats.pendingBookings}</p>
                                    </div>
                                </UberCard>

                                <UberCard variant="default" padding="lg">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Award className="h-6 w-6 text-green-600" />
                                        </div>
                                        <p className="text-caption text-gray-600 mb-2">Completed Today</p>
                                        <p className="text-subheading font-bold text-gray-900">{stats.completedBookings}</p>
                                    </div>
                                </UberCard>

                                <UberCard variant="default" padding="lg">
                                    <div className="text-center">
                                        <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                            <Activity className="h-6 w-6 text-indigo-600" />
                                        </div>
                                        <p className="text-caption text-gray-600 mb-2">Active Services</p>
                                        <p className="text-subheading font-bold text-gray-900">12</p>
                                    </div>
                                </UberCard>
                            </div>
                        </>
                    )}

                    {activeTab === 'requests' && (
                        <AdminRequestManagement />
                    )}

                    {activeTab === 'analytics' && (
                        <div className="space-y-10">
                            {revenueLoading ? (
                                <UberCard variant="elevated" padding="lg">
                                    <div className="h-80 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <BarChart3 className="h-8 w-8 text-gray-400" />
                                            </div>
                                            <p className="text-body text-gray-600">Loading analytics...</p>
                                        </div>
                                    </div>
                                </UberCard>
                            ) : (
                                <>
                                    {/* Revenue Analytics */}
                                    <UberCard variant="elevated" padding="lg">
                                        <h3 className="text-heading font-semibold text-gray-900 mb-6">Revenue Analytics</h3>
                                        <div className="h-80 mb-6">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart data={revenueData}>
                                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                                    <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                                                    <YAxis stroke="#6b7280" fontSize={12} />
                                                    <Tooltip
                                                        contentStyle={{
                                                            backgroundColor: '#fff',
                                                            border: '1px solid #e5e7eb',
                                                            borderRadius: '8px',
                                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                                                        }}
                                                    />
                                                    <Line
                                                        type="monotone"
                                                        dataKey="revenue"
                                                        stroke="#3b82f6"
                                                        strokeWidth={3}
                                                        dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                                                    />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                            <div className="text-center">
                                                <p className="text-caption text-gray-600 mb-1">Total Revenue</p>
                                                <p className="text-2xl font-bold text-gray-900">₦{stats.totalRevenue.toLocaleString()}</p>
                                                <p className="text-xs text-green-600 mt-1">+12.5% from last month</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-caption text-gray-600 mb-1">Average Order Value</p>
                                                <p className="text-2xl font-bold text-gray-900">₦4,250</p>
                                                <p className="text-xs text-green-600 mt-1">+8.3% from last month</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-caption text-gray-600 mb-1">Revenue Growth</p>
                                                <p className="text-2xl font-bold text-gray-900">+15.2%</p>
                                                <p className="text-xs text-green-600 mt-1">vs last month</p>
                                            </div>
                                            <div className="text-center">
                                                <p className="text-caption text-gray-600 mb-1">Monthly Target</p>
                                                <p className="text-2xl font-bold text-gray-900">85%</p>
                                                <p className="text-xs text-blue-600 mt-1">of ₦150,000 goal</p>
                                            </div>
                                        </div>
                                    </UberCard>

                                    {/* Booking Trends */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        <UberCard variant="elevated" padding="lg">
                                            <h3 className="text-heading font-semibold text-gray-900 mb-6">Booking Trends</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                                            <Calendar className="h-4 w-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">Total Bookings</p>
                                                            <p className="text-xs text-gray-600">This month</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-gray-900">{stats.totalBookings}</p>
                                                        <p className="text-xs text-green-600">+18.2%</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                                            <CheckCircle className="h-4 w-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">Completed</p>
                                                            <p className="text-xs text-gray-600">This month</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-gray-900">{stats.completedBookings}</p>
                                                        <p className="text-xs text-green-600">+22.1%</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                                            <Clock className="h-4 w-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">Pending</p>
                                                            <p className="text-xs text-gray-600">This month</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-gray-900">{stats.pendingBookings}</p>
                                                        <p className="text-xs text-yellow-600">+5.3%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </UberCard>

                                        <UberCard variant="elevated" padding="lg">
                                            <h3 className="text-heading font-semibold text-gray-900 mb-6">Service Performance</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                                            <Car className="h-4 w-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">Premium Wash</p>
                                                            <p className="text-xs text-gray-600">Most popular</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-gray-900">45%</p>
                                                        <p className="text-xs text-purple-600">of bookings</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-lg">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                                                            <Star className="h-4 w-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">Customer Rating</p>
                                                            <p className="text-xs text-gray-600">Average</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-gray-900">{stats.averageRating}/5</p>
                                                        <p className="text-xs text-indigo-600">4.8 stars</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                                                            <Users className="h-4 w-4 text-white" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">Active Users</p>
                                                            <p className="text-xs text-gray-600">This month</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-bold text-gray-900">{stats.activeUsers}</p>
                                                        <p className="text-xs text-pink-600">+12.8%</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </UberCard>
                                    </div>

                                    {/* Top Performing Services */}
                                    <UberCard variant="elevated" padding="lg">
                                        <h3 className="text-heading font-semibold text-gray-900 mb-6">Top Performing Services</h3>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                        <Car className="h-5 w-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">Premium Wash</p>
                                                        <p className="text-xs text-gray-600">₦5,000 per service</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-gray-900">₦225,000</p>
                                                    <p className="text-xs text-gray-600">45 bookings</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                        <Star className="h-5 w-5 text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">Full Detailing</p>
                                                        <p className="text-xs text-gray-600">₦8,500 per service</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-gray-900">₦170,000</p>
                                                    <p className="text-xs text-gray-600">20 bookings</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                                        <CheckCircle className="h-5 w-5 text-yellow-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-900">Basic Wash</p>
                                                        <p className="text-xs text-gray-600">₦2,500 per service</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-sm font-bold text-gray-900">₦125,000</p>
                                                    <p className="text-xs text-gray-600">50 bookings</p>
                                                </div>
                                            </div>
                                        </div>
                                    </UberCard>
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="space-y-10">
                            {/* Activity Center Header */}
                            <div className="mb-8">
                                <h1 className="text-display font-bold text-gray-900 mb-2">Activity Center</h1>
                                <p className="text-body text-gray-600">Track car wash operations and performance</p>
                            </div>

                            {/* Key Metrics Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                                <UberCard variant="default" padding="lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                            <BarChart3 className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-caption text-gray-600">Total Activities</p>
                                            <p className="text-subheading font-bold text-gray-900">{activityStats.totalActivities.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </UberCard>

                                <UberCard variant="default" padding="lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                                            <Calendar className="h-6 w-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-caption text-gray-600">This Week</p>
                                            <p className="text-subheading font-bold text-gray-900">{activityStats.thisWeek}</p>
                                        </div>
                                    </div>
                                </UberCard>

                                <UberCard variant="default" padding="lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                                            <Car className="h-6 w-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-caption text-gray-600">Active Services</p>
                                            <p className="text-subheading font-bold text-gray-900">{activityStats.activeServices}</p>
                                        </div>
                                    </div>
                                </UberCard>

                                <UberCard variant="default" padding="lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                                            <DollarSign className="h-6 w-6 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-caption text-gray-600">Revenue Today</p>
                                            <p className="text-subheading font-bold text-gray-900">₦{activityStats.revenueToday.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </UberCard>
                            </div>

                            {/* Filter Bar */}
                            <UberCard variant="default" padding="lg">
                                <div className="flex items-center space-x-4">
                                    <span className="text-caption font-medium text-gray-700">Filter by:</span>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => setActiveFilter('all')}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === 'all'
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            All Activities ({activities.length})
                                        </button>
                                        <button
                                            onClick={() => setActiveFilter('booking')}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === 'booking'
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            Bookings ({activities.filter(a => a.type === 'booking').length})
                                        </button>
                                        <button
                                            onClick={() => setActiveFilter('service')}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === 'service'
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            Services ({activities.filter(a => a.type === 'service').length})
                                        </button>
                                        <button
                                            onClick={() => setActiveFilter('location')}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === 'location'
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            Location ({activities.filter(a => a.type === 'location').length})
                                        </button>
                                        <button
                                            onClick={() => setActiveFilter('analytics')}
                                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeFilter === 'analytics'
                                                ? 'bg-blue-600 text-white shadow-md'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            Analytics ({activities.filter(a => a.type === 'analytics').length})
                                        </button>
                                    </div>
                                </div>
                            </UberCard>

                            {/* Activity Feed */}
                            <div className="space-y-4">
                                {activities
                                    .filter(activity => activeFilter === 'all' || activity.type === activeFilter)
                                    .map((activity) => {
                                        const IconComponent = activity.icon;
                                        const getColorClasses = (color: string) => {
                                            switch (color) {
                                                case 'blue': return 'bg-blue-100 text-blue-600';
                                                case 'green': return 'bg-green-100 text-green-600';
                                                case 'purple': return 'bg-purple-100 text-purple-600';
                                                case 'orange': return 'bg-orange-100 text-orange-600';
                                                case 'red': return 'bg-red-100 text-red-600';
                                                case 'light-blue': return 'bg-cyan-100 text-cyan-600';
                                                default: return 'bg-gray-100 text-gray-600';
                                            }
                                        };

                                        return (
                                            <UberCard key={activity.id} variant="default" padding="lg">
                                                <div className="flex items-start space-x-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getColorClasses(activity.color)}`}>
                                                        <IconComponent className="h-5 w-5" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-body font-semibold text-gray-900 mb-1">{activity.title}</h3>
                                                        <p className="text-caption text-gray-600 mb-2">{activity.description}</p>
                                                        <p className="text-xs text-gray-500">{activity.timestamp}</p>
                                                    </div>
                                                </div>
                                            </UberCard>
                                        );
                                    })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="space-y-10">
                            <UberCard variant="elevated" padding="lg">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-heading font-semibold text-gray-900">User Management</h3>
                                    <UberButton
                                        variant="primary"
                                        size="md"
                                        icon={<Plus className="h-5 w-5" />}
                                        onClick={() => setIsAddUserModalOpen(true)}
                                    >
                                        Add User
                                    </UberButton>
                                </div>
                                <div className="space-y-6">
                                    {users.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                                    <User className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-body font-semibold text-gray-900">{user.name}</p>
                                                    <p className="text-caption text-gray-600">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <UberBadge variant="success" size="md">
                                                    {user.status}
                                                </UberBadge>
                                                <UberButton variant="outline" size="sm">
                                                    Edit
                                                </UberButton>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </UberCard>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="space-y-10">
                            {/* General Settings */}
                            <UberCard variant="elevated" padding="lg">
                                <h3 className="text-heading font-semibold text-gray-900 mb-6">General Settings</h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <UberInput
                                            label="Company Name"
                                            placeholder="CarWash Pro"
                                            value={settings.general.companyName}
                                            onChange={(value) => handleGeneralSettingChange('companyName', value)}
                                        />
                                        <UberInput
                                            label="Contact Email"
                                            placeholder="admin@carwashpro.com"
                                            value={settings.general.contactEmail}
                                            onChange={(value) => handleGeneralSettingChange('contactEmail', value)}
                                            type="email"
                                        />
                                        <UberInput
                                            label="Phone Number"
                                            placeholder="+234 801 234 5678"
                                            value={settings.general.phoneNumber}
                                            onChange={(value) => handleGeneralSettingChange('phoneNumber', value)}
                                        />
                                        <UberInput
                                            label="Business Address"
                                            placeholder="123 Main Street, Lagos"
                                            value={settings.general.businessAddress}
                                            onChange={(value) => handleGeneralSettingChange('businessAddress', value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-caption font-medium text-gray-700 mb-3">
                                            Business Hours
                                        </label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Opening Time</label>
                                                <input
                                                    type="time"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-body focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                    value={settings.general.openingTime}
                                                    onChange={(e) => handleGeneralSettingChange('openingTime', e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-600 mb-1">Closing Time</label>
                                                <input
                                                    type="time"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-body focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                                    value={settings.general.closingTime}
                                                    onChange={(e) => handleGeneralSettingChange('closingTime', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </UberCard>

                            {/* Service Settings */}
                            <UberCard variant="elevated" padding="lg">
                                <h3 className="text-heading font-semibold text-gray-900 mb-6">Service Settings</h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="p-4 bg-blue-50 rounded-xl">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Basic Wash</h4>
                                            <UberInput
                                                label="Price (₦)"
                                                placeholder="2500"
                                                value={settings.services.basicWash.price.toString()}
                                                onChange={(value) => handleServiceSettingChange('basicWash', 'price', parseInt(value) || 0)}
                                                type="number"
                                            />
                                            <div className="mt-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded text-blue-600"
                                                        checked={settings.services.basicWash.active}
                                                        onChange={(e) => handleServiceSettingChange('basicWash', 'active', e.target.checked)}
                                                    />
                                                    <span className="text-xs text-gray-600">Active</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-green-50 rounded-xl">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Premium Wash</h4>
                                            <UberInput
                                                label="Price (₦)"
                                                placeholder="5000"
                                                value={settings.services.premiumWash.price.toString()}
                                                onChange={(value) => handleServiceSettingChange('premiumWash', 'price', parseInt(value) || 0)}
                                                type="number"
                                            />
                                            <div className="mt-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded text-blue-600"
                                                        checked={settings.services.premiumWash.active}
                                                        onChange={(e) => handleServiceSettingChange('premiumWash', 'active', e.target.checked)}
                                                    />
                                                    <span className="text-xs text-gray-600">Active</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-purple-50 rounded-xl">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-2">Full Detailing</h4>
                                            <UberInput
                                                label="Price (₦)"
                                                placeholder="8500"
                                                value={settings.services.fullDetailing.price.toString()}
                                                onChange={(value) => handleServiceSettingChange('fullDetailing', 'price', parseInt(value) || 0)}
                                                type="number"
                                            />
                                            <div className="mt-3">
                                                <label className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded text-blue-600"
                                                        checked={settings.services.fullDetailing.active}
                                                        onChange={(e) => handleServiceSettingChange('fullDetailing', 'active', e.target.checked)}
                                                    />
                                                    <span className="text-xs text-gray-600">Active</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </UberCard>

                            {/* Notification Settings */}
                            <UberCard variant="elevated" padding="lg">
                                <h3 className="text-heading font-semibold text-gray-900 mb-6">Notification Settings</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Email Notifications</p>
                                            <p className="text-xs text-gray-600">Receive booking confirmations via email</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={settings.notifications.email}
                                                onChange={(e) => handleNotificationChange('email', e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">SMS Notifications</p>
                                            <p className="text-xs text-gray-600">Send SMS alerts for booking updates</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={settings.notifications.sms}
                                                onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900">Push Notifications</p>
                                            <p className="text-xs text-gray-600">In-app notifications for real-time updates</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={settings.notifications.push}
                                                onChange={(e) => handleNotificationChange('push', e.target.checked)}
                                            />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                </div>
                            </UberCard>

                            {/* Payment Settings */}
                            <UberCard variant="elevated" padding="lg">
                                <h3 className="text-heading font-semibold text-gray-900 mb-6">Payment Settings</h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-4 bg-blue-50 rounded-xl">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Payment Methods</h4>
                                            <div className="space-y-3">
                                                <label className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded text-blue-600"
                                                        checked={settings.payment.methods.cashOnDelivery}
                                                        onChange={(e) => handlePaymentMethodChange('cashOnDelivery', e.target.checked)}
                                                    />
                                                    <span className="text-sm text-gray-700">Cash on Delivery</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded text-blue-600"
                                                        checked={settings.payment.methods.bankTransfer}
                                                        onChange={(e) => handlePaymentMethodChange('bankTransfer', e.target.checked)}
                                                    />
                                                    <span className="text-sm text-gray-700">Bank Transfer</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded text-blue-600"
                                                        checked={settings.payment.methods.creditCard}
                                                        onChange={(e) => handlePaymentMethodChange('creditCard', e.target.checked)}
                                                    />
                                                    <span className="text-sm text-gray-700">Credit/Debit Card</span>
                                                </label>
                                                <label className="flex items-center space-x-3">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded text-blue-600"
                                                        checked={settings.payment.methods.inAppWallet}
                                                        onChange={(e) => handlePaymentMethodChange('inAppWallet', e.target.checked)}
                                                    />
                                                    <span className="text-sm text-gray-700">In-App Wallet</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-green-50 rounded-xl">
                                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Wallet Settings</h4>
                                            <div className="space-y-3">
                                                <UberInput
                                                    label="Minimum Wallet Balance (₦)"
                                                    placeholder="1000"
                                                    value={settings.payment.wallet.minBalance.toString()}
                                                    onChange={(value) => handleWalletSettingChange('minBalance', parseInt(value) || 0)}
                                                    type="number"
                                                />
                                                <UberInput
                                                    label="Maximum Wallet Balance (₦)"
                                                    placeholder="50000"
                                                    value={settings.payment.wallet.maxBalance.toString()}
                                                    onChange={(value) => handleWalletSettingChange('maxBalance', parseInt(value) || 0)}
                                                    type="number"
                                                />
                                                <div>
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            className="rounded text-blue-600"
                                                            checked={settings.payment.wallet.autoRecharge}
                                                            onChange={(e) => handleWalletSettingChange('autoRecharge', e.target.checked)}
                                                        />
                                                        <span className="text-xs text-gray-600">Enable auto-recharge</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </UberCard>

                            {/* Security Settings */}
                            <UberCard variant="elevated" padding="lg">
                                <h3 className="text-heading font-semibold text-gray-900 mb-6">Security Settings</h3>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <UberInput
                                            label="Session Timeout (minutes)"
                                            placeholder="30"
                                            value={settings.security.sessionTimeout.toString()}
                                            onChange={(value) => handleSecuritySettingChange('sessionTimeout', parseInt(value) || 0)}
                                            type="number"
                                        />
                                        <UberInput
                                            label="Max Login Attempts"
                                            placeholder="5"
                                            value={settings.security.maxLoginAttempts.toString()}
                                            onChange={(value) => handleSecuritySettingChange('maxLoginAttempts', parseInt(value) || 0)}
                                            type="number"
                                        />
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Two-Factor Authentication</p>
                                                <p className="text-xs text-gray-600">Add an extra layer of security</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={settings.security.twoFactorAuth}
                                                    onChange={(e) => handleSecuritySettingChange('twoFactorAuth', e.target.checked)}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">Password Policy</p>
                                                <p className="text-xs text-gray-600">Require strong passwords</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={settings.security.passwordPolicy}
                                                    onChange={(e) => handleSecuritySettingChange('passwordPolicy', e.target.checked)}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </UberCard>

                            {/* Save Settings Button */}
                            <div className="flex justify-end">
                                <UberButton
                                    variant="primary"
                                    size="lg"
                                    onClick={handleSaveSettings}
                                >
                                    Save Settings
                                </UberButton>
                            </div>

                            {/* Settings Saved Success Message */}
                            {showSettingsSaved && (
                                <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50">
                                    <p className="text-sm font-medium">Settings saved successfully!</p>
                                </div>
                            )}
                        </div>
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