import React from 'react';
import UberCard from '../../ui/UberCard';
import { Search } from 'lucide-react';

interface Stats {
    total: number;
    pending: number;
    confirmed: number;
    inProgress: number;
    completed: number;
}

interface AdminRequestFiltersProps {
    selectedFilter: 'all' | 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'refunded';
    searchTerm: string;
    stats: Stats;
    setSelectedFilter: (filter: 'all' | 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'refunded') => void;
    setSearchTerm: (term: string) => void;
}

const AdminRequestFilters: React.FC<AdminRequestFiltersProps> = ({
    selectedFilter,
    searchTerm,
    stats,
    setSelectedFilter,
    setSearchTerm
}) => (
    <UberCard variant="default" padding="lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Status Filters */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={() => setSelectedFilter('all')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedFilter === 'all'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    All ({stats.total})
                </button>
                <button
                    onClick={() => setSelectedFilter('pending')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedFilter === 'pending'
                        ? 'bg-yellow-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Pending ({stats.pending})
                </button>
                <button
                    onClick={() => setSelectedFilter('confirmed')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedFilter === 'confirmed'
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Confirmed ({stats.confirmed})
                </button>
                <button
                    onClick={() => setSelectedFilter('in-progress')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedFilter === 'in-progress'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    In Progress ({stats.inProgress})
                </button>
                <button
                    onClick={() => setSelectedFilter('completed')}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedFilter === 'completed'
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                >
                    Completed ({stats.completed})
                </button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full lg:w-64"
                />
            </div>
        </div>
    </UberCard>
);

export default AdminRequestFilters; 