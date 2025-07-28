import React from 'react';
import { Button } from '../ui/Button';
import { Card, CardHeader, CardContent } from '../ui/Card';

export interface Booking {
    id: number;
    service: string;
    car: string;
    date: string;
    status: string;
    amount: string;
}

interface RecentBookingsProps {
    bookings: Booking[];
}

const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings }) => {
    // Ensure bookings is always an array
    const safeBookings = Array.isArray(bookings) ? bookings : [];

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {safeBookings.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No recent bookings
                        </div>
                    ) : (
                        safeBookings.map((booking) => (
                            <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <h3 className="font-medium text-gray-900">{booking.service}</h3>
                                    <p className="text-sm text-gray-600">{booking.car}</p>
                                    <p className="text-sm text-gray-500">{booking.date}</p>
                                </div>
                                <div className="text-right">
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${booking.status === 'Completed'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-blue-100 text-blue-800'
                                        }`}>
                                        {booking.status}
                                    </span>
                                    <p className="text-sm font-medium text-gray-900 mt-1">{booking.amount}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
                <Button variant="outline" className="w-full mt-4">
                    View All Bookings
                </Button>
            </CardContent>
        </Card>
    );
};

export default RecentBookings; 