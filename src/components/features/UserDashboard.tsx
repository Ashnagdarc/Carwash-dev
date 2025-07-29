import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation as useRouterLocation, useNavigate } from 'react-router-dom';
import UberCard from '../ui/UberCard';
import UberButton from '../ui/UberButton';
import UberBadge from '../ui/UberBadge';
import UberModal from '../ui/UberModal';
import {
    Calendar,
    Car,
    Star,
    MapPin,
    User,
    CheckCircle,
    Plus,
    MessageCircle,
    Navigation,
    Activity,
    DollarSign,
    TrendingUp,
    Wallet,
    Send
} from 'lucide-react';

interface Booking {
    id: number;
    service: string;
    date: string;
    time: string;
    status: string;
    carMake: string;
    carModel: string;
    licensePlate: string;
    price: string;
    paymentMethod: string;
    deliveryPaymentType: string;
}

export function UserDashboard() {
    const { user } = useAuth();
    const location = useRouterLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [bookingData, setBookingData] = useState({
        address: '',
        service: '',
        date: '',
        time: 'Now',
        carMake: '',
        carModel: '',
        carYear: '',
        licensePlate: '',
        notes: '',
        paymentMethod: 'delivery', // 'delivery' or 'wallet'
        deliveryPaymentType: 'cash' // 'cash' or 'transfer'
    });
    const [vehicleData, setVehicleData] = useState({
        make: '',
        model: '',
        year: '',
        licensePlate: '',
        color: '',
        image: null as File | null
    });
    const [userBookings, setUserBookings] = useState<Booking[]>([
        {
            id: 1,
            service: 'Premium Wash',
            date: '2024-01-15',
            time: '10:00 AM',
            status: 'Completed',
            carMake: 'Toyota',
            carModel: 'Camry',
            licensePlate: 'ABC-123',
            price: '₦5,000',
            paymentMethod: 'wallet',
            deliveryPaymentType: 'cash'
        }
    ]);

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

    const handleBookingSubmit = () => {
        // Create new booking object
        const newBooking = {
            id: Date.now(), // Simple ID generation
            service: bookingData.service,
            date: bookingData.date,
            time: bookingData.time,
            status: 'Pending',
            carMake: bookingData.carMake,
            carModel: bookingData.carModel,
            licensePlate: bookingData.licensePlate,
            price: bookingData.service === 'basic' ? '₦2,500' :
                bookingData.service === 'premium' ? '₦5,000' :
                    bookingData.service === 'detailing' ? '₦8,500' : '₦3,500',
            paymentMethod: bookingData.paymentMethod,
            deliveryPaymentType: bookingData.deliveryPaymentType
        };

        // Add to user bookings
        setUserBookings(prev => [newBooking, ...prev]);

        // Handle booking submission
        console.log('Booking submitted:', bookingData);
        setShowBookingModal(false);
        // Reset form
        setBookingData({
            address: '',
            service: '',
            date: '',
            time: 'Now',
            carMake: '',
            carModel: '',
            carYear: '',
            licensePlate: '',
            notes: '',
            paymentMethod: 'delivery', // 'delivery' or 'wallet'
            deliveryPaymentType: 'cash' // 'cash' or 'transfer'
        });
        // Show success modal
        setSuccessMessage('Your booking has been successfully created! We\'ll send you a confirmation shortly.');
        setShowSuccessModal(true);
    };

    const handleInputChange = (field: string, value: string) => {
        setBookingData(prev => ({ ...prev, [field]: value }));
    };

    const handleVehicleInputChange = (field: string, value: string) => {
        setVehicleData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setVehicleData(prev => ({ ...prev, image: file }));
        }
    };

    const handleVehicleSubmit = () => {
        // Handle vehicle submission
        console.log('Vehicle submitted:', vehicleData);
        setShowVehicleModal(false);
        // Reset form
        setVehicleData({
            make: '',
            model: '',
            year: '',
            licensePlate: '',
            color: '',
            image: null
        });
        // Show success modal
        setSuccessMessage('Vehicle has been successfully added to your account!');
        setShowSuccessModal(true);
    };

    const handleProfileSave = () => {
        // Handle profile save
        console.log('Profile updated');
        // Show success modal
        setSuccessMessage('Your profile has been successfully updated!');
        setShowSuccessModal(true);
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
        <div className="min-h-screen bg-white font-uber pt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-10">
                    <h1 className="text-display font-bold text-gray-900 mb-2">My Dashboard</h1>
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            {/* Left Column */}
                            <div className="lg:col-span-2 space-y-10">
                                {/* My Stats */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <UberCard variant="default" padding="md">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <Calendar className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <p className="text-caption text-gray-600 mb-2">Total Bookings</p>
                                            <p className="text-subheading font-bold text-gray-900">24</p>
                                        </div>
                                    </UberCard>

                                    <UberCard variant="default" padding="md">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <TrendingUp className="h-6 w-6 text-green-600" />
                                            </div>
                                            <p className="text-caption text-gray-600 mb-2">This Month</p>
                                            <p className="text-subheading font-bold text-gray-900">3</p>
                                        </div>
                                    </UberCard>

                                    <UberCard variant="default" padding="md">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <DollarSign className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <p className="text-caption text-gray-600 mb-2">Total Spent</p>
                                            <p className="text-subheading font-bold text-gray-900">₦65,000</p>
                                        </div>
                                    </UberCard>

                                    <UberCard variant="default" padding="md">
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <Star className="h-6 w-6 text-yellow-600" />
                                            </div>
                                            <div className="flex items-center justify-center space-x-1 mb-2">
                                                <p className="text-subheading font-bold text-gray-900">4.8</p>
                                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                            </div>
                                            <p className="text-caption text-gray-600">My Rating</p>
                                        </div>
                                    </UberCard>
                                </div>

                                {/* Current Booking */}
                                <UberCard variant="elevated" padding="lg">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-heading font-semibold text-gray-900">Current Booking</h3>
                                        <UberBadge variant="success" size="md">
                                            {currentBooking.status}
                                        </UberBadge>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Service Details */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                                <span className="text-body text-gray-600">Service Type:</span>
                                                <span className="text-body font-semibold text-gray-900">{currentBooking.serviceType}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                                <span className="text-body text-gray-600">Vehicle:</span>
                                                <span className="text-body font-semibold text-gray-900">{currentBooking.vehicle}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3 border-b border-gray-100">
                                                <span className="text-body text-gray-600">Price:</span>
                                                <span className="text-body font-semibold text-gray-900">{currentBooking.price}</span>
                                            </div>
                                            <div className="flex justify-between items-center py-3">
                                                <span className="text-body text-gray-600">Estimated Time:</span>
                                                <span className="text-body font-semibold text-gray-900">{currentBooking.estimatedTime}</span>
                                            </div>
                                        </div>

                                        {/* Service Progress */}
                                        <div>
                                            <h4 className="text-subheading font-semibold text-gray-900 mb-6">Service Progress</h4>
                                            <div className="space-y-4">
                                                {currentBooking.progress.map((step, index) => (
                                                    <div key={index} className="flex items-center space-x-4">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed
                                                            ? 'bg-green-500 text-white'
                                                            : 'bg-gray-200 text-gray-400'
                                                            }`}>
                                                            {step.completed && <CheckCircle className="h-5 w-5" />}
                                                        </div>
                                                        <span className={`text-body ${step.completed
                                                            ? 'text-gray-900 font-medium'
                                                            : 'text-gray-500'
                                                            }`}>
                                                            {step.step}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </UberCard>

                                {/* Quick Actions */}
                                <UberCard variant="default" padding="lg">
                                    <h3 className="text-heading font-semibold text-gray-900 mb-6">Quick Actions</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                        <UberButton
                                            variant="primary"
                                            size="md"
                                            icon={<Calendar className="h-5 w-5" />}
                                            className="w-full justify-start"
                                            onClick={() => setShowBookingModal(true)}
                                        >
                                            Book New Service
                                        </UberButton>
                                        <UberButton
                                            variant="outline"
                                            size="md"
                                            icon={<Plus className="h-5 w-5" />}
                                            className="w-full justify-start"
                                            onClick={() => setShowVehicleModal(true)}
                                        >
                                            Add Vehicle
                                        </UberButton>
                                        <UberButton
                                            variant="outline"
                                            size="md"
                                            icon={<Wallet className="h-5 w-5" />}
                                            onClick={() => navigate('/wallet')}
                                            className="w-full justify-start"
                                        >
                                            Wallet
                                        </UberButton>
                                        <UberButton
                                            variant="outline"
                                            size="md"
                                            icon={<MessageCircle className="h-5 w-5" />}
                                            className="w-full justify-start"
                                        >
                                            Contact Support
                                        </UberButton>
                                    </div>
                                </UberCard>

                                {/* My Vehicles */}
                                <UberCard variant="default" padding="lg">
                                    <h3 className="text-heading font-semibold text-gray-900 mb-6">My Vehicles</h3>
                                    <div className="space-y-4">
                                        {vehicles.map((vehicle, index) => (
                                            <div key={index} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                                        <Car className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-body font-semibold text-gray-900">{vehicle.name}</p>
                                                        <p className="text-caption text-gray-600">{vehicle.licensePlate}</p>
                                                    </div>
                                                </div>
                                                <span className="text-caption text-gray-500">{vehicle.lastService}</span>
                                            </div>
                                        ))}
                                    </div>
                                </UberCard>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-10">
                                {/* Service Location */}
                                <UberCard variant="default" padding="lg">
                                    <div className="flex justify-between items-start mb-6">
                                        <h3 className="text-heading font-semibold text-gray-900">Service Location</h3>
                                        <div className="flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                            <span className="text-caption text-gray-500">Last updated 1 min ago</span>
                                        </div>
                                    </div>

                                    <div className="relative h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl mb-6">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                    <MapPin className="h-8 w-8 text-white" />
                                                </div>
                                                <p className="text-body font-semibold text-gray-900 mb-2">Service Location</p>
                                                <p className="text-caption text-gray-600">123 Main Street, Lagos</p>
                                            </div>
                                        </div>
                                    </div>

                                    <UberButton
                                        variant="outline"
                                        size="md"
                                        icon={<Navigation className="h-5 w-5" />}
                                        className="w-full"
                                    >
                                        Update Location
                                    </UberButton>
                                </UberCard>

                                {/* Recent Activity */}
                                <UberCard variant="default" padding="lg">
                                    <h3 className="text-heading font-semibold text-gray-900 mb-6">Recent Activity</h3>
                                    <div className="space-y-4">
                                        {recentActivity.map((activity, index) => (
                                            <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${activity.type === 'success'
                                                    ? 'bg-green-100'
                                                    : 'bg-blue-100'
                                                    }`}>
                                                    <Activity className={`h-5 w-5 ${activity.type === 'success'
                                                        ? 'text-green-600'
                                                        : 'text-blue-600'
                                                        }`} />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-body font-medium text-gray-900">{activity.action}</p>
                                                    <p className="text-caption text-gray-500">{activity.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </UberCard>
                            </div>
                        </div>
                    )}

                    {activeTab === 'bookings' && (
                        <div className="space-y-10">
                            <UberCard variant="elevated" padding="lg">
                                <h3 className="text-heading font-semibold text-gray-900 mb-6">My Bookings</h3>
                                <div className="space-y-6">
                                    {userBookings.length > 0 ? (
                                        userBookings.map((booking) => (
                                            <div key={booking.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                                                <div className="flex items-center space-x-4">
                                                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                                        <Calendar className="h-6 w-6 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-body font-semibold text-gray-900">
                                                            {booking.service}
                                                        </p>
                                                        <p className="text-caption text-gray-600">
                                                            {booking.carMake} {booking.carModel} • {booking.licensePlate}
                                                        </p>
                                                        <p className="text-caption text-gray-600">
                                                            {booking.date} at {booking.time}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    <div className="text-right">
                                                        <p className="text-body font-semibold text-gray-900">{booking.price}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {booking.paymentMethod === 'wallet' ? 'Wallet Payment' :
                                                                `${booking.deliveryPaymentType === 'cash' ? 'Cash' : 'Transfer'} on Delivery`}
                                                        </p>
                                                    </div>
                                                    <UberBadge
                                                        variant={booking.status === 'Completed' ? 'success' : 'warning'}
                                                        size="md"
                                                    >
                                                        {booking.status}
                                                    </UberBadge>
                                                    <UberButton variant="outline" size="sm" onClick={() => { setSelectedBooking(booking); setShowBookingDetailsModal(true); }}>
                                                        View Details
                                                    </UberButton>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-12">
                                            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                                <Calendar className="h-8 w-8 text-gray-400" />
                                            </div>
                                            <p className="text-body text-gray-600 mb-4">No bookings found</p>
                                            <UberButton
                                                variant="primary"
                                                size="md"
                                                icon={<Calendar className="h-5 w-5" />}
                                                onClick={() => setShowBookingModal(true)}
                                            >
                                                Book Your First Service
                                            </UberButton>
                                        </div>
                                    )}
                                </div>
                            </UberCard>
                        </div>
                    )}

                    {activeTab === 'vehicles' && (
                        <div className="space-y-10">
                            <UberCard variant="elevated" padding="lg">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-heading font-semibold text-gray-900">My Vehicles</h3>
                                    <UberButton
                                        variant="primary"
                                        size="md"
                                        icon={<Plus className="h-5 w-5" />}
                                        onClick={() => setShowVehicleModal(true)}
                                    >
                                        Add Vehicle
                                    </UberButton>
                                </div>
                                <div className="space-y-6">
                                    {vehicles.map((vehicle, index) => (
                                        <div key={index} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                                    <Car className="h-6 w-6 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-body font-semibold text-gray-900">{vehicle.name}</p>
                                                    <p className="text-caption text-gray-600">{vehicle.licensePlate}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className="text-caption text-gray-500">{vehicle.lastService}</span>
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

                    {activeTab === 'profile' && (
                        <div className="space-y-10">
                            {/* Personal Information */}
                            <UberCard variant="elevated" padding="lg">
                                <h3 className="text-heading font-semibold text-gray-900 mb-6">Personal Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue={user?.name || 'John Doe'}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            defaultValue={user?.email || 'john.doe@example.com'}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="+234 801 234 5678"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Date of Birth</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                                        />
                                    </div>
                                </div>
                            </UberCard>

                            {/* Address Information */}
                            <UberCard variant="elevated" padding="lg">
                                <h3 className="text-heading font-semibold text-gray-900 mb-6">Address Information</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Street Address</label>
                                        <input
                                            type="text"
                                            placeholder="123 Main Street"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">City</label>
                                            <input
                                                type="text"
                                                placeholder="Lagos"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">State</label>
                                            <input
                                                type="text"
                                                placeholder="Lagos State"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">Postal Code</label>
                                            <input
                                                type="text"
                                                placeholder="100001"
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </UberCard>

                            {/* Service Preferences */}
                            <UberCard variant="elevated" padding="lg">
                                <h3 className="text-heading font-semibold text-gray-900 mb-6">Service Preferences</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Service Time</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200">
                                            <option value="">Select preferred time</option>
                                            <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
                                            <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                                            <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                                            <option value="anytime">Anytime</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Service Type</label>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                                <span className="text-body text-gray-900">Basic Wash</span>
                                            </label>
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                                                <span className="text-body text-gray-900">Premium Wash</span>
                                            </label>
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                                <span className="text-body text-gray-900">Full Detailing</span>
                                            </label>
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                                <span className="text-body text-gray-900">Interior Cleaning</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Special Instructions</label>
                                        <textarea
                                            placeholder="Any special instructions for your car wash services..."
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 resize-none"
                                        />
                                    </div>
                                </div>
                            </UberCard>

                            {/* Account Settings */}
                            <UberCard variant="elevated" padding="lg">
                                <h3 className="text-heading font-semibold text-gray-900 mb-6">Account Settings</h3>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Language</label>
                                        <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200">
                                            <option value="en">English</option>
                                            <option value="fr">French</option>
                                            <option value="es">Spanish</option>
                                            <option value="de">German</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">Notifications</label>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                                                <span className="text-body text-gray-900">Email notifications</span>
                                            </label>
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                                                <span className="text-body text-gray-900">SMS notifications</span>
                                            </label>
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                                                <span className="text-body text-gray-900">Push notifications</span>
                                            </label>
                                            <label className="flex items-center space-x-3">
                                                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                                                <span className="text-body text-gray-900">Marketing emails</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </UberCard>

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <UberButton
                                    variant="outline"
                                    size="lg"
                                    className="flex-1"
                                >
                                    Cancel Changes
                                </UberButton>
                                <UberButton
                                    variant="primary"
                                    size="lg"
                                    className="flex-1"
                                    onClick={handleProfileSave}
                                >
                                    Save Changes
                                </UberButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Booking Modal */}
            <UberModal
                isOpen={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                title="Book Your Service"
                size="lg"
            >
                <div className="space-y-6">
                    {/* Address Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Service Location
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Enter your address"
                                value={bookingData.address}
                                onChange={(e) => handleInputChange('address', e.target.value)}
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                            />
                            <Send className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Service Type
                        </label>
                        <select
                            value={bookingData.service}
                            onChange={(e) => handleInputChange('service', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                        >
                            <option value="">Select a service</option>
                            <option value="basic">Basic Wash - ₦2,500</option>
                            <option value="premium">Premium Wash - ₦5,000</option>
                            <option value="detailing">Full Detailing - ₦8,500</option>
                            <option value="interior">Interior Cleaning - ₦3,500</option>
                        </select>
                    </div>

                    {/* Car Details */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Car Make
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Toyota"
                                value={bookingData.carMake}
                                onChange={(e) => handleInputChange('carMake', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Car Model
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Camry"
                                value={bookingData.carModel}
                                onChange={(e) => handleInputChange('carModel', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Year
                            </label>
                            <input
                                type="number"
                                placeholder="e.g., 2020"
                                value={bookingData.carYear}
                                onChange={(e) => handleInputChange('carYear', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                License Plate
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., ABC-123"
                                value={bookingData.licensePlate}
                                onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                            />
                        </div>
                    </div>

                    {/* Date and Time */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Date
                            </label>
                            <input
                                type="date"
                                value={bookingData.date}
                                onChange={(e) => handleInputChange('date', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Time
                            </label>
                            <select
                                value={bookingData.time}
                                onChange={(e) => handleInputChange('time', e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                            >
                                <option value="Now">Now</option>
                                <option value="6:00 AM">6:00 AM</option>
                                <option value="7:00 AM">7:00 AM</option>
                                <option value="8:00 AM">8:00 AM</option>
                                <option value="9:00 AM">9:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="1:00 PM">1:00 PM</option>
                                <option value="2:00 PM">2:00 PM</option>
                                <option value="3:00 PM">3:00 PM</option>
                                <option value="4:00 PM">4:00 PM</option>
                                <option value="5:00 PM">5:00 PM</option>
                                <option value="6:00 PM">6:00 PM</option>
                                <option value="7:00 PM">7:00 PM</option>
                                <option value="8:00 PM">8:00 PM</option>
                            </select>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Special Instructions
                        </label>
                        <textarea
                            placeholder="Any special instructions or notes for the service..."
                            value={bookingData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 resize-none"
                        />
                    </div>

                    {/* Payment Options */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900">Payment Options</h4>

                        {/* Payment Method Selection */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Payment Method
                                </label>
                                <select
                                    value={bookingData.paymentMethod}
                                    onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                                >
                                    <option value="delivery">Pay on Delivery</option>
                                    <option value="wallet">Pay from Wallet</option>
                                </select>
                            </div>
                            {bookingData.paymentMethod === 'delivery' && (
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                                        Payment Type
                                    </label>
                                    <select
                                        value={bookingData.deliveryPaymentType}
                                        onChange={(e) => handleInputChange('deliveryPaymentType', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                                    >
                                        <option value="cash">Cash</option>
                                        <option value="transfer">Bank Transfer</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        {/* Wallet Payment Info */}
                        {bookingData.paymentMethod === 'wallet' && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-semibold text-blue-900">Wallet Balance</p>
                                        <p className="text-lg font-bold text-blue-900">₦15,000</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-blue-700">Service Cost</p>
                                        <p className="text-lg font-bold text-blue-900">
                                            {bookingData.service === 'basic' ? '₦2,500' :
                                                bookingData.service === 'premium' ? '₦5,000' :
                                                    bookingData.service === 'detailing' ? '₦8,500' :
                                                        bookingData.service === 'interior' ? '₦3,500' : '₦0'}
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-blue-200">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-blue-700">Remaining Balance</span>
                                        <span className="text-sm font-semibold text-blue-900">
                                            ₦{(() => {
                                                const cost = bookingData.service === 'basic' ? 2500 :
                                                    bookingData.service === 'premium' ? 5000 :
                                                        bookingData.service === 'detailing' ? 8500 :
                                                            bookingData.service === 'interior' ? 3500 : 0;
                                                return (15000 - cost).toLocaleString();
                                            })()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Delivery Payment Info */}
                        {bookingData.paymentMethod === 'delivery' && (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">
                                            Pay on {bookingData.deliveryPaymentType === 'cash' ? 'Cash' : 'Bank Transfer'}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            Payment will be collected after service completion
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 pt-4">
                        <UberButton
                            variant="outline"
                            size="md"
                            onClick={() => setShowBookingModal(false)}
                            className="flex-1"
                        >
                            Cancel
                        </UberButton>
                        <UberButton
                            variant="primary"
                            size="md"
                            onClick={handleBookingSubmit}
                            className="flex-1"
                            disabled={!bookingData.address || !bookingData.service || !bookingData.date || !bookingData.carMake || !bookingData.carModel || !bookingData.licensePlate || !bookingData.paymentMethod}
                        >
                            Book Service
                        </UberButton>
                    </div>
                </div>
            </UberModal>

            {/* Vehicle Modal */}
            <UberModal
                isOpen={showVehicleModal}
                onClose={() => setShowVehicleModal(false)}
                title="Add New Vehicle"
                size="md"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Vehicle Make
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Toyota"
                            value={vehicleData.make}
                            onChange={(e) => handleVehicleInputChange('make', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Vehicle Model
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Camry"
                            value={vehicleData.model}
                            onChange={(e) => handleVehicleInputChange('model', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Year
                        </label>
                        <input
                            type="number"
                            placeholder="e.g., 2020"
                            value={vehicleData.year}
                            onChange={(e) => handleVehicleInputChange('year', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            License Plate
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., ABC-123"
                            value={vehicleData.licensePlate}
                            onChange={(e) => handleVehicleInputChange('licensePlate', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Color
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Red"
                            value={vehicleData.color}
                            onChange={(e) => handleVehicleInputChange('color', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Vehicle Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {vehicleData.image && (
                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-900">Selected file: {vehicleData.image.name}</p>
                                <img src={URL.createObjectURL(vehicleData.image)} alt="Vehicle Preview" className="mt-2 max-w-xs mx-auto rounded-lg" />
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-4 pt-4">
                        <UberButton
                            variant="outline"
                            size="md"
                            onClick={() => setShowVehicleModal(false)}
                            className="flex-1"
                        >
                            Cancel
                        </UberButton>
                        <UberButton
                            variant="primary"
                            size="md"
                            onClick={handleVehicleSubmit}
                            className="flex-1"
                            disabled={!vehicleData.make || !vehicleData.model || !vehicleData.year || !vehicleData.licensePlate || !vehicleData.color}
                        >
                            Add Vehicle
                        </UberButton>
                    </div>
                </div>
            </UberModal>

            {/* Success Modal */}
            <UberModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Success!"
                size="sm"
            >
                <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <p className="text-body text-gray-900">{successMessage}</p>
                </div>
                <div className="flex justify-center space-x-4">
                    <UberButton variant="primary" size="md" onClick={() => setShowSuccessModal(false)}>
                        OK
                    </UberButton>
                </div>
            </UberModal>

            {/* Booking Details Modal */}
            <UberModal
                isOpen={showBookingDetailsModal}
                onClose={() => setShowBookingDetailsModal(false)}
                title="Booking Details"
                size="lg"
            >
                {selectedBooking && (
                    <div className="space-y-6">
                        {/* Service Information */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-blue-900 mb-3">Service Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-blue-700">Service Type</p>
                                    <p className="text-sm font-semibold text-blue-900">{selectedBooking.service}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-700">Price</p>
                                    <p className="text-sm font-semibold text-blue-900">{selectedBooking.price}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-700">Date</p>
                                    <p className="text-sm font-semibold text-blue-900">{selectedBooking.date}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-blue-700">Time</p>
                                    <p className="text-sm font-semibold text-blue-900">{selectedBooking.time}</p>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Information */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-gray-900 mb-3">Vehicle Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-gray-600">Car Make</p>
                                    <p className="text-sm font-semibold text-gray-900">{selectedBooking.carMake}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">Car Model</p>
                                    <p className="text-sm font-semibold text-gray-900">{selectedBooking.carModel}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">License Plate</p>
                                    <p className="text-sm font-semibold text-gray-900">{selectedBooking.licensePlate}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">Booking ID</p>
                                    <p className="text-sm font-semibold text-gray-900">#{selectedBooking.id}</p>
                                </div>
                            </div>
                        </div>

                        {/* Payment Information */}
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-green-900 mb-3">Payment Information</h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <p className="text-xs text-green-700">Payment Method</p>
                                    <p className="text-sm font-semibold text-green-900">
                                        {selectedBooking.paymentMethod === 'wallet' ? 'Wallet Payment' : 'Pay on Delivery'}
                                    </p>
                                </div>
                                {selectedBooking.paymentMethod === 'delivery' && (
                                    <div>
                                        <p className="text-xs text-green-700">Payment Type</p>
                                        <p className="text-sm font-semibold text-green-900">
                                            {selectedBooking.deliveryPaymentType === 'cash' ? 'Cash' : 'Bank Transfer'}
                                        </p>
                                    </div>
                                )}
                                <div>
                                    <p className="text-xs text-green-700">Amount</p>
                                    <p className="text-sm font-semibold text-green-900">{selectedBooking.price}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-green-700">Payment Status</p>
                                    <p className="text-sm font-semibold text-green-900">
                                        {selectedBooking.paymentMethod === 'wallet' ? 'Paid' : 'Pending'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Booking Status */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-yellow-900 mb-3">Booking Status</h4>
                            <div className="flex items-center space-x-3">
                                <UberBadge
                                    variant={selectedBooking.status === 'Completed' ? 'success' : 'warning'}
                                    size="md"
                                >
                                    {selectedBooking.status}
                                </UberBadge>
                                <span className="text-sm text-yellow-700">
                                    {selectedBooking.status === 'Completed'
                                        ? 'Service has been completed successfully'
                                        : 'Service is currently being processed'}
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-4 pt-4">
                            <UberButton
                                variant="outline"
                                size="md"
                                onClick={() => setShowBookingDetailsModal(false)}
                                className="flex-1"
                            >
                                Close
                            </UberButton>
                            {selectedBooking.status === 'Pending' && (
                                <UberButton
                                    variant="primary"
                                    size="md"
                                    className="flex-1"
                                >
                                    Cancel Booking
                                </UberButton>
                            )}
                        </div>
                    </div>
                )}
            </UberModal>
        </div>
    );
};

export default UserDashboard; 