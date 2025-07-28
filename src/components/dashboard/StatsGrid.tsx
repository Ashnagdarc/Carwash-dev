import React from 'react';
import { Card, CardContent } from '../ui/Card';

export interface Stat {
    label: string;
    value: string;
    icon: React.ElementType;
    color: string;
    bg: string;
}

interface StatsGridProps {
    stats: Stat[];
    loading?: boolean;
}

const StatsGrid: React.FC<StatsGridProps> = ({ stats, loading = false }) => {
    // Ensure stats is always an array
    const safeStats = Array.isArray(stats) ? stats : [];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((index) => (
                    <Card key={index}>
                        <CardContent className="p-6">
                            <div className="animate-pulse">
                                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                                <div className="h-12 w-12 bg-gray-200 rounded"></div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (safeStats.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                No stats available
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {safeStats.map((stat, index) => (
                <Card key={index}>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                            <div className={`p-3 rounded-lg ${stat.bg}`}>
                                <stat.icon className={`h-6 w-6 ${stat.color}`} />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default StatsGrid; 