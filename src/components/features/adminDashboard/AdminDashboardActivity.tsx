import React from 'react';
import UberCard from '../../ui/UberCard';

import { BarChart3, Calendar, Car, DollarSign } from 'lucide-react';

interface Activity {
    id: number;
    type: string;
    title: string;
    description: string;
    timestamp: string;
    icon: React.ElementType;
    color: string;
}

interface AdminDashboardActivityProps {
    activityStats: {
        totalActivities: number;
        thisWeek: number;
        activeServices: number;
        revenueToday: number;
    };
    activities: Activity[];
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}

const AdminDashboardActivity: React.FC<AdminDashboardActivityProps> = ({ activityStats, activities, activeFilter, setActiveFilter }) => (
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
);

export default AdminDashboardActivity;