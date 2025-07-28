import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from '../../contexts/LocationContext';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import BookingsTable from '../dashboard/BookingsTable';
import { useBookings } from '../../hooks/useBookings';
import LocationSettings from './LocationSettings';
import { Booking } from '../dashboard/RecentBookings';
import {
    BarChart3,
    Calendar,
    Car,
    Star,
    MapPin,
    Phone,
    User,
    CheckCircle
} from 'lucide-react';

const UserDashboard = () => {
    const { user } = useAuth();
    const location = useRouterLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const { bookings } = useBookings();
    const { userLocation } = useLocation();

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
        navigate(`/user/dashboard?tab=${tabId}`);
    };

    const tabs = [
        { id: 'overview', label: 'Overview', icon: BarChart3 },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'vehicles', label: 'Vehicles', icon: Car },
        { id: 'profile', label: 'Profile', icon: User }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Dashboard</h1>
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <Card className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                        <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookings.length}</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {bookings.filter((b: Booking) => b.status === 'Completed').length}
                                        </p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                                        <Car className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Vehicles</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                                        <Star className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <BookingsTable bookings={bookings} />
                    )}

                    {activeTab === 'vehicles' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                        <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Toyota Camry</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">2020 • White</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">License Plate:</span>
                                        <span className="font-medium">ABC-123</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Last Service:</span>
                                        <span className="font-medium">2 days ago</span>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6">
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                        <Car className="h-6 w-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Honda Civic</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">2019 • Black</p>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">License Plate:</span>
                                        <span className="font-medium">XYZ-789</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400">Last Service:</span>
                                        <span className="font-medium">1 week ago</span>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* User Profile */}
                            <Card className="p-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                        <User className="h-8 w-8 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{user?.name}</h3>
                                        <p className="text-gray-500 dark:text-gray-400">{user?.email}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <Phone className="h-5 w-5 text-gray-400" />
                                        <span className="text-gray-600 dark:text-gray-400">+234 123 456 7890</span>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="h-5 w-5 text-gray-400" />
                                        <span className="text-gray-600 dark:text-gray-400">
                                            {userLocation?.address || 'No location set'}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button className="w-full">Edit Profile</Button>
                                </div>
                            </Card>

                            {/* Location Settings */}
                            <LocationSettings />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard; 