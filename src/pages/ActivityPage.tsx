import React, { useState } from 'react';
import { Activity, Clock, MapPin, Car, TrendingUp, Filter, Calendar, BarChart3, Users, DollarSign } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const ActivityPage: React.FC = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');

    const activities = [
        {
            id: 1,
            type: 'booking',
            title: 'New booking created',
            description: 'Premium wash scheduled for tomorrow at 2:00 PM',
            time: '2 minutes ago',
            icon: Car,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900'
        },
        {
            id: 2,
            type: 'service',
            title: 'Service completed',
            description: 'Basic wash finished for Toyota Camry - Customer rated 5 stars',
            time: '15 minutes ago',
            icon: Clock,
            color: 'text-green-600',
            bgColor: 'bg-green-100 dark:bg-green-900'
        },
        {
            id: 3,
            type: 'location',
            title: 'Location updated',
            description: 'Service location changed to downtown area for better accessibility',
            time: '1 hour ago',
            icon: MapPin,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100 dark:bg-purple-900'
        },
        {
            id: 4,
            type: 'analytics',
            title: 'Performance update',
            description: 'Customer satisfaction increased by 15% this week',
            time: '2 hours ago',
            icon: TrendingUp,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100 dark:bg-orange-900'
        },
        {
            id: 5,
            type: 'booking',
            title: 'Booking cancelled',
            description: 'Deluxe detail cancelled by customer - refund processed',
            time: '3 hours ago',
            icon: Car,
            color: 'text-red-600',
            bgColor: 'bg-red-100 dark:bg-red-900'
        },
        {
            id: 6,
            type: 'service',
            title: 'Service started',
            description: 'Premium wash started for BMW X5 - estimated completion in 45 minutes',
            time: '4 hours ago',
            icon: Clock,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100 dark:bg-blue-900'
        }
    ];

    const stats = [
        { label: 'Total Activities', value: '1,247', icon: Activity, color: 'text-blue-600' },
        { label: 'This Week', value: '89', icon: Calendar, color: 'text-green-600' },
        { label: 'Active Services', value: '12', icon: Car, color: 'text-purple-600' },
        { label: 'Revenue Today', value: '$2,450', icon: DollarSign, color: 'text-orange-600' }
    ];

    const filters = [
        { id: 'all', label: 'All Activities', count: activities.length },
        { id: 'booking', label: 'Bookings', count: activities.filter(a => a.type === 'booking').length },
        { id: 'service', label: 'Services', count: activities.filter(a => a.type === 'service').length },
        { id: 'location', label: 'Location', count: activities.filter(a => a.type === 'location').length },
        { id: 'analytics', label: 'Analytics', count: activities.filter(a => a.type === 'analytics').length }
    ];

    const filteredActivities = selectedFilter === 'all'
        ? activities
        : activities.filter(activity => activity.type === selectedFilter);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-28 px-6 pb-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <Activity className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity Center</h1>
                            <p className="text-gray-600 dark:text-gray-400">Track all your car wash operations and performance</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => {
                        const IconComponent = stat.icon;
                        return (
                            <Card key={index} className="hover:shadow-lg transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                                        </div>
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800`}>
                                            <IconComponent className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Filters */}
                <div className="mb-6">
                    <div className="flex items-center space-x-4 overflow-x-auto pb-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                            <Filter className="h-4 w-4" />
                            <span>Filter by:</span>
                        </div>
                        {filters.map((filter) => (
                            <button
                                key={filter.id}
                                onClick={() => setSelectedFilter(filter.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedFilter === filter.id
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                                    }`}
                            >
                                {filter.label} ({filter.count})
                            </button>
                        ))}
                    </div>
                </div>

                {/* Activities List */}
                <div className="space-y-4">
                    {filteredActivities.map((activity) => {
                        const IconComponent = activity.icon;
                        return (
                            <Card key={activity.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.bgColor} flex-shrink-0`}>
                                            <IconComponent className={`h-6 w-6 ${activity.color}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                        {activity.title}
                                                    </h3>
                                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                                        {activity.description}
                                                    </p>
                                                </div>
                                                <span className="text-sm text-gray-500 dark:text-gray-500 ml-4">
                                                    {activity.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {filteredActivities.length === 0 && (
                    <div className="text-center py-12">
                        <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No activities found</h3>
                        <p className="text-gray-600 dark:text-gray-400">Try adjusting your filters to see more results.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ActivityPage; 