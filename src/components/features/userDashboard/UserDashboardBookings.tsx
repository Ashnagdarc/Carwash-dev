import React from 'react';
import UberCard from '../../ui/UberCard';
import UberButton from '../../ui/UberButton';
import UberBadge from '../../ui/UberBadge';
import { Calendar } from 'lucide-react';

interface Booking {
    id: number;
    service: string;
    date: string;
    time: string;
    status: string;
    carMake: string;
    carModel: string;
    licensePlate: string;
    price: string;
    paymentMethod: string;
    deliveryPaymentType: string;
}

interface UserDashboardBookingsProps {
    userBookings: Booking[];
    setSelectedBooking: (booking: Booking) => void;
    setShowBookingDetailsModal: (show: boolean) => void;
    setShowBookingModal: (show: boolean) => void;
}

const UserDashboardBookings: React.FC<UserDashboardBookingsProps> = ({
    userBookings,
    setSelectedBooking,
    setShowBookingDetailsModal,
    setShowBookingModal
}) => (
    <div className="space-y-10">
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">My Bookings</h3>
            <div className="space-y-6">
                {userBookings.length > 0 ? (
                    userBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                    <Calendar className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-body font-semibold text-gray-900">
                                        {booking.service}
                                    </p>
                                    <p className="text-caption text-gray-600">
                                        {booking.carMake} {booking.carModel} • {booking.licensePlate}
                                    </p>
                                    <p className="text-caption text-gray-600">
                                        {booking.date} at {booking.time}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-body font-semibold text-gray-900">{booking.price}</p>
                                    <p className="text-xs text-gray-500">
                                        {booking.paymentMethod === 'wallet' ? 'Wallet Payment' :
                                            `${booking.deliveryPaymentType === 'cash' ? 'Cash' : 'Transfer'} on Delivery`}
                                    </p>
                                </div>
                                <UberBadge
                                    variant={booking.status === 'Completed' ? 'success' : 'warning'}
                                    size="md"
                                >
                                    {booking.status}
                                </UberBadge>
                                <UberButton
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedBooking(booking);
                                        setShowBookingDetailsModal(true);
                                    }}
                                >
                                    View Details
                                </UberButton>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Calendar className="h-8 w-8 text-gray-400" />
                        </div>
                        <p className="text-body text-gray-600 mb-4">No bookings found</p>
                        <UberButton
                            variant="primary"
                            size="md"
                            icon={<Calendar className="h-5 w-5" />}
                            onClick={() => setShowBookingModal(true)}
                        >
                            Book Your First Service
                        </UberButton>
                    </div>
                )}
            </div>
        </UberCard>
    </div>
);

export default UserDashboardBookings; 