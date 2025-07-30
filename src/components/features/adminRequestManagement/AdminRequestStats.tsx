import React from 'react';
import UberCard from '../../ui/UberCard';
import {
    Calendar,
    Clock,
    CheckCircle,
    DollarSign
} from 'lucide-react';

interface Stats {
    total: number;
    pending: number;
    completed: number;
    totalRevenue: number;
}

interface AdminRequestStatsProps {
    stats: Stats;
}

const AdminRequestStats: React.FC<AdminRequestStatsProps> = ({ stats }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <UberCard variant="default" padding="lg">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <p className="text-caption text-gray-600">Total Bookings</p>
                    <p className="text-subheading font-bold text-gray-900">{stats.total}</p>
                </div>
            </div>
        </UberCard>

        <UberCard variant="default" padding="lg">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-2xl flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                    <p className="text-caption text-gray-600">Pending</p>
                    <p className="text-subheading font-bold text-gray-900">{stats.pending}</p>
                </div>
            </div>
        </UberCard>

        <UberCard variant="default" padding="lg">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                    <p className="text-caption text-gray-600">Completed</p>
                    <p className="text-subheading font-bold text-gray-900">{stats.completed}</p>
                </div>
            </div>
        </UberCard>

        <UberCard variant="default" padding="lg">
            <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                    <p className="text-caption text-gray-600">Total Revenue</p>
                    <p className="text-subheading font-bold text-gray-900">₦{stats.totalRevenue.toLocaleString()}</p>
                </div>
            </div>
        </UberCard>
    </div>
);

export default AdminRequestStats; 