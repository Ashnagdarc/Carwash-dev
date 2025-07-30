import React from 'react';
import UberCard from '../../ui/UberCard';
import { BarChart3, Calendar, CheckCircle, Clock, Car, Star, Users } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { RevenueData } from '../../../hooks/useRevenueData';

interface AdminDashboardAnalyticsProps {
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

const AdminDashboardAnalytics: React.FC<AdminDashboardAnalyticsProps> = ({
    stats,
    revenueData,
    revenueLoading
}) => (
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
);

export default AdminDashboardAnalytics; 