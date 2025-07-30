import React from 'react';
import UberCard from '../../ui/UberCard';
import { Calendar, DollarSign, Users, Star, CheckCircle, Clock } from 'lucide-react';
import { CarIcon } from '../../ui/CarIcons';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { RevenueData } from '../../../hooks/useRevenueData';

interface AdminDashboardOverviewProps {
    stats: {
        totalBookings: number;
        totalRevenue: number;
        activeUsers: number;
        averageRating: number;
        pendingBookings: number;
        completedBookings: number;
    };
    revenueData: RevenueData[];
    revenueLoading: boolean;
}

const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({ stats, revenueData, revenueLoading }) => (
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
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
                            <XAxis dataKey="date" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-64 flex items-center justify-center">
                        <div className="text-body text-gray-600">No data available</div>
                    </div>
                )}
            </UberCard>
            {/* Monthly Target */}
            <UberCard variant="elevated" padding="lg">
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="text-center">
                        <p className="text-caption text-gray-600 mb-1">Monthly Target</p>
                        <p className="text-2xl font-bold text-gray-900">85%</p>
                        <p className="text-xs text-blue-600 mt-1">of ₦150,000 goal</p>
                    </div>
                </div>
            </UberCard>
        </div>

        {/* Booking Trends & Service Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
            {/* Booking Trends */}
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
            {/* Service Performance */}
            <UberCard variant="elevated" padding="lg">
                <h3 className="text-heading font-semibold text-gray-900 mb-6">Service Performance</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                                <CarIcon className="h-4 w-4 text-white" />
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
                </div>
            </UberCard>
        </div>

        {/* Top Performing Services */}
        <UberCard variant="elevated" padding="lg" className="mt-10">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">Top Performing Services</h3>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <CarIcon className="h-5 w-5 text-blue-600" />
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
);

export default AdminDashboardOverview;