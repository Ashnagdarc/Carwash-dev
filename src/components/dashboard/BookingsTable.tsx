import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Booking } from './RecentBookings';

interface BookingsTableProps {
    bookings: Booking[];
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings }) => {
    // Ensure bookings is always an array
    const safeBookings = Array.isArray(bookings) ? bookings : [];

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">All Bookings</h2>
            </CardHeader>
            <CardContent>
                {safeBookings.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No bookings available
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Service</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Vehicle</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                                    <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {safeBookings.map((booking) => (
                                    <tr key={booking.id} className="border-b border-gray-100">
                                        <td className="py-3 px-4">{booking.service}</td>
                                        <td className="py-3 px-4">{booking.car}</td>
                                        <td className="py-3 px-4">{booking.date}</td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${booking.status === 'Completed'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 font-medium">{booking.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default BookingsTable; 