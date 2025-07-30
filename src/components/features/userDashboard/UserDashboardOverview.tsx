import React from 'react';
import UberCard from '../../ui/UberCard';
import UberButton from '../../ui/UberButton';
import UberBadge from '../../ui/UberBadge';
import {
    Calendar,
    TrendingUp,
    DollarSign,
    Star,
    CheckCircle,
    Plus,
    Wallet,
    MessageCircle,
    MapPin,
    Navigation,
    Activity
} from 'lucide-react';
import { CarIcon } from '../../ui/CarIcons';

interface CurrentBooking {
    serviceType: string;
    vehicle: string;
    price: string;
    estimatedTime: string;
    status: string;
    progress: Array<{
        step: string;
        completed: boolean;
    }>;
}

interface Vehicle {
    name: string;
    licensePlate: string;
    lastService: string;
}

interface RecentActivity {
    action: string;
    time: string;
    type: 'success' | 'info';
}

interface UserDashboardOverviewProps {
    currentBooking: CurrentBooking;
    vehicles: Vehicle[];
    recentActivity: RecentActivity[];
    setShowBookingModal: (show: boolean) => void;
    setShowVehicleModal: (show: boolean) => void;
    navigate: (path: string) => void;
}

const UserDashboardOverview: React.FC<UserDashboardOverviewProps> = ({
    currentBooking,
    vehicles,
    recentActivity,
    setShowBookingModal,
    setShowVehicleModal,
    navigate
}) => (
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
                                    <CarIcon className="h-6 w-6 text-blue-600" />
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
);

export default UserDashboardOverview; 