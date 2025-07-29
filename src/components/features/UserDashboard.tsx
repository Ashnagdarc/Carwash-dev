import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { useBookings } from '../../hooks/useBookings';
import {
    Calendar,
    Car,
    Star,
    MapPin,
    Phone,
    User,
    CheckCircle,
    Plus,
    MessageCircle,
    Navigation,
    Activity
} from 'lucide-react';

const UserDashboard = () => {
    const { user } = useAuth();
    const location = useRouterLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const { bookings } = useBookings();

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
        { id: 'overview', label: 'My Service', icon: User },
        { id: 'bookings', label: 'Bookings', icon: Calendar },
        { id: 'vehicles', label: 'Vehicles', icon: Car },
        { id: 'profile', label: 'Profile', icon: User }
    ];

    // Mock data for current booking
    const currentBooking = {
        serviceType: 'Premium Wash',
        vehicle: 'Toyota Camry',
        price: '₦5,000',
        estimatedTime: '45 min',
        status: 'In Progress',
        progress: [
            { step: 'Vehicle picked up', completed: true },
            { step: 'Washing in progress', completed: true },
            { step: 'Final inspection', completed: false },
            { step: 'Delivery', completed: false }
        ]
    };

    // Mock data for vehicles
    const vehicles = [
        {
            name: 'Toyota Camry',
            licensePlate: 'ABC-123',
            lastService: '3 months ago'
        }
    ];

    // Mock data for recent activity
    const recentActivity = [
        { action: 'Service completed', time: '2 hours ago', type: 'success' },
        { action: 'New booking made', time: '1 day ago', type: 'info' },
        { action: 'Vehicle added', time: '1 week ago', type: 'info' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Dashboard</h1>
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-6">
                                {/* My Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <Card className="p-4">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Bookings</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">24</p>
                                        </div>
                                    </Card>
                                    <Card className="p-4">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
                                        </div>
                                    </Card>
                                    <Card className="p-4">
                                        <div className="text-center">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">₦65,000</p>
                                        </div>
                                    </Card>
                                    <Card className="p-4">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center space-x-1">
                                                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8</p>
                                                <Star className="h-4 w-4 text-yellow-500" />
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">My Rating</p>
                                        </div>
                                    </Card>
                                </div>

                                {/* Current Booking */}
                                <Card className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Booking</h3>
                                        <span className="px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                                            {currentBooking.status}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Service Details */}
                                        <div className="space-y-3">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Service Type:</span>
                                                <span className="font-medium">{currentBooking.serviceType}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Vehicle:</span>
                                                <span className="font-medium">{currentBooking.vehicle}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Price:</span>
                                                <span className="font-medium">{currentBooking.price}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Estimated Time:</span>
                                                <span className="font-medium">{currentBooking.estimatedTime}</span>
                                            </div>
                                        </div>

                                        {/* Service Progress */}
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Service Progress</h4>
                                            <div className="space-y-3">
                                                {currentBooking.progress.map((step, index) => (
                                                    <div key={index} className="flex items-center space-x-3">
                                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.completed
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-gray-300 dark:bg-gray-600'
                                                            }`}>
                                                            {step.completed && <CheckCircle className="h-4 w-4" />}
                                                        </div>
                                                        <span className={`text-sm ${step.completed
                                                            ? 'text-gray-900 dark:text-white'
                                                            : 'text-gray-500 dark:text-gray-400'
                                                            }`}>
                                                            {step.step}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Card>

                                {/* Quick Actions */}
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Button className="w-full justify-start">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Book New Service
                                        </Button>
                                        <Button className="w-full justify-start" variant="outline">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Vehicle
                                        </Button>
                                        <Button className="w-full justify-start" variant="outline">
                                            <MessageCircle className="h-4 w-4 mr-2" />
                                            Contact Support
                                        </Button>
                                    </div>
                                </Card>

                                {/* My Vehicles */}
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Vehicles</h3>
                                    <div className="space-y-4">
                                        {vehicles.map((vehicle, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                        <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900 dark:text-white">{vehicle.name}</p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">{vehicle.licensePlate}</p>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">{vehicle.lastService}</span>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Service Location */}
                                <Card className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Service Location</h3>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">Last updated 1 min ago</span>
                                        </div>
                                    </div>

                                    <div className="relative h-48 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-2">
                                                    <MapPin className="h-6 w-6 text-white" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">Service Location</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">123 Main Street, Lagos</p>
                                            </div>
                                        </div>
                                    </div>

                                    <Button className="w-full" variant="outline">
                                        <Navigation className="h-4 w-4 mr-2" />
                                        Update Location
                                    </Button>
                                </Card>

                                {/* Recent Activity */}
                                <Card className="p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
                                    <div className="space-y-3">
                                        {recentActivity.map((activity, index) => (
                                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'success'
                                                    ? 'bg-green-100 dark:bg-green-900'
                                                    : 'bg-blue-100 dark:bg-blue-900'
                                                    }`}>
                                                    <Activity className={`h-4 w-4 ${activity.type === 'success'
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-blue-600 dark:text-blue-400'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </Card>
                            </div>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div className="space-y-6">
                            {/* Book New Service Section */}
                            <Card className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Book New Service</h3>
                                    <Button>
                                        <Calendar className="h-4 w-4 mr-2" />
                                        Quick Book
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Service Type
                                            </label>
                                            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <option>Select a service</option>
                                                <option>Basic Wash - ₦2,000</option>
                                                <option>Premium Wash - ₦5,000</option>
                                                <option>Full Detail - ₦8,000</option>
                                                <option>Interior Clean - ₦3,500</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Vehicle
                                            </label>
                                            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <option>Select your vehicle</option>
                                                <option>Toyota Camry (ABC-123)</option>
                                                <option>Honda Civic (XYZ-789)</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Preferred Date
                                            </label>
                                            <input
                                                type="date"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Preferred Time
                                            </label>
                                            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <option>Select time</option>
                                                <option>09:00 AM</option>
                                                <option>10:00 AM</option>
                                                <option>11:00 AM</option>
                                                <option>12:00 PM</option>
                                                <option>01:00 PM</option>
                                                <option>02:00 PM</option>
                                                <option>03:00 PM</option>
                                                <option>04:00 PM</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Special Instructions
                                            </label>
                                            <textarea
                                                rows={4}
                                                placeholder="Any special requests or instructions..."
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Service Summary</h4>
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500 dark:text-gray-400">Service:</span>
                                                    <span className="font-medium">Premium Wash</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500 dark:text-gray-400">Vehicle:</span>
                                                    <span className="font-medium">Toyota Camry</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500 dark:text-gray-400">Estimated Time:</span>
                                                    <span className="font-medium">45 minutes</span>
                                                </div>
                                                <div className="border-t pt-2 mt-2">
                                                    <div className="flex justify-between font-semibold">
                                                        <span>Total:</span>
                                                        <span>₦5,000</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Button className="w-full">
                                            <Calendar className="h-4 w-4 mr-2" />
                                            Book Service
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* Recent Bookings */}
                            <Card className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Bookings</h3>
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </div>
                                <div className="space-y-3">
                                    {Array.isArray(bookings) ? bookings.map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">{booking.service}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{booking.car} • {booking.date}</p>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className={`px-2 py-1 text-xs rounded-full ${booking.status === 'Completed'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                    : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                                <Button size="sm" variant="outline">
                                                    Details
                                                </Button>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No bookings found</p>
                                    )}
                                </div>
                            </Card>
                        </div>
                    )}

                    {activeTab === 'vehicles' && (
                        <div className="space-y-6">
                            {/* Add New Vehicle Section */}
                            <Card className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add New Vehicle</h3>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Quick Add
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Vehicle Make
                                            </label>
                                            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <option>Select make</option>
                                                <option>Toyota</option>
                                                <option>Honda</option>
                                                <option>Ford</option>
                                                <option>BMW</option>
                                                <option>Mercedes</option>
                                                <option>Lexus</option>
                                                <option>Nissan</option>
                                                <option>Hyundai</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Vehicle Model
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., Camry, Civic, Accord"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Year
                                            </label>
                                            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <option>Select year</option>
                                                {Array.from({ length: 15 }, (_, i) => 2024 - i).map(year => (
                                                    <option key={year}>{year}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Color
                                            </label>
                                            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <option>Select color</option>
                                                <option>White</option>
                                                <option>Black</option>
                                                <option>Silver</option>
                                                <option>Gray</option>
                                                <option>Red</option>
                                                <option>Blue</option>
                                                <option>Green</option>
                                                <option>Yellow</option>
                                                <option>Orange</option>
                                                <option>Purple</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                License Plate Number
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g., ABC-123"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                VIN Number (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Vehicle Identification Number"
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Vehicle Type
                                            </label>
                                            <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                                <option>Select type</option>
                                                <option>Sedan</option>
                                                <option>SUV</option>
                                                <option>Truck</option>
                                                <option>Van</option>
                                                <option>Hatchback</option>
                                                <option>Coupe</option>
                                                <option>Convertible</option>
                                                <option>Wagon</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Notes (Optional)
                                            </label>
                                            <textarea
                                                rows={3}
                                                placeholder="Any special notes about your vehicle..."
                                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <Button className="w-full">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Vehicle
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                            {/* My Vehicles List */}
                            <Card className="p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">My Vehicles</h3>
                                    <Button variant="outline" size="sm">
                                        Manage All
                                    </Button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                                                    <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">Toyota Camry</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">2020 • White</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button size="sm" variant="outline">Edit</Button>
                                                <Button size="sm" variant="outline">Remove</Button>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">License Plate:</span>
                                                <span className="font-medium">ABC-123</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Last Service:</span>
                                                <span className="font-medium">2 days ago</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Total Services:</span>
                                                <span className="font-medium">8</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                                    <Car className="h-6 w-6 text-green-600 dark:text-green-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white">Honda Civic</h4>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">2019 • Black</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Button size="sm" variant="outline">Edit</Button>
                                                <Button size="sm" variant="outline">Remove</Button>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">License Plate:</span>
                                                <span className="font-medium">XYZ-789</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Last Service:</span>
                                                <span className="font-medium">1 week ago</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500 dark:text-gray-400">Total Services:</span>
                                                <span className="font-medium">5</span>
                                            </div>
                                        </div>
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
                                            No location set
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Button className="w-full">Edit Profile</Button>
                                </div>
                            </Card>

                            {/* Profile Settings */}
                            <Card className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Settings</h3>
                                <p className="text-gray-600 dark:text-gray-400">Profile settings coming soon...</p>
                            </Card>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard; 