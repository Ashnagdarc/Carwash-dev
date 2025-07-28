import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardHeader, CardContent } from '../ui/Card';

export interface RevenueData {
    date: string;
    revenue: number;
}

interface RevenueChartProps {
    data: RevenueData[];
    loading?: boolean;
}

const RevenueChart: React.FC<RevenueChartProps> = ({ data, loading = false }) => {
    // Ensure data is always an array
    const safeData = Array.isArray(data) ? data : [];

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Revenue Over Time</h2>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">Loading revenue data...</div>
                </CardContent>
            </Card>
        );
    }

    if (safeData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Revenue Over Time</h2>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-gray-500">
                        No revenue data available
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Revenue Over Time</h2>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={safeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                            dataKey="date"
                            stroke="#6b7280"
                            fontSize={12}
                            tickLine={false}
                        />
                        <YAxis
                            stroke="#6b7280"
                            fontSize={12}
                            tickLine={false}
                            tickFormatter={(value) => `₦${value.toLocaleString()}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#fff',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                            }}
                            formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Revenue']}
                            labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Line
                            type="monotone"
                            dataKey="revenue"
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ fill: '#2563eb', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#2563eb', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default RevenueChart; 