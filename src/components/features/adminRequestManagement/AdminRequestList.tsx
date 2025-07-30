import React from 'react';
import UberCard from '../../ui/UberCard';
import UberButton from '../../ui/UberButton';
import UberBadge from '../../ui/UberBadge';
import {
    Calendar,
    User,
    MapPin,
    MessageSquare,
    Eye,
    Ban,
    RotateCcw,
    CreditCard,
    Wallet,
    DollarSign
} from 'lucide-react';
import { CarIcon } from '../../ui/CarIcons';
import { DemoBooking } from '../../../data/demoData';

interface AdminRequestListProps {
    filteredBookings: DemoBooking[];
    getUserById: (userId: string) => any;
    getStatusColor: (status: string) => string;
    getPaymentIcon: (method: string) => React.ReactElement;
    setSelectedBooking: (booking: DemoBooking) => void;
    setShowBookingDetails: (show: boolean) => void;
    setShowCancelModal: (show: boolean) => void;
    setShowRefundModal: (show: boolean) => void;
    setRefundAmount: (amount: number) => void;
}

const AdminRequestList: React.FC<AdminRequestListProps> = ({
    filteredBookings,
    getUserById,
    getStatusColor,
    getPaymentIcon,
    setSelectedBooking,
    setShowBookingDetails,
    setShowCancelModal,
    setShowRefundModal,
    setRefundAmount
}) => (
    <div className="space-y-4">
        {filteredBookings.length === 0 ? (
            <UberCard variant="default" padding="lg">
                <div className="text-center py-12">
                    <Calendar className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                    <p className="text-gray-600">No bookings match your current filters.</p>
                </div>
            </UberCard>
        ) : (
            filteredBookings.map((booking) => {
                const user = getUserById(booking.userId);

                return (
                    <UberCard key={booking.id} variant="default" padding="lg">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                            {/* Booking Info */}
                            <div className="flex-1">
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <CarIcon className="h-6 w-6 text-blue-600" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <h3 className="text-body font-semibold text-gray-900">{booking.service}</h3>
                                            <UberBadge variant={getStatusColor(booking.status)}>
                                                {booking.status.replace('-', ' ')}
                                            </UberBadge>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <User className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-600">{booking.userName}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <CarIcon className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-600">{booking.carMake} {booking.carModel} ({booking.licensePlate})</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-600">{booking.date} at {booking.time}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-4 w-4 text-gray-400" />
                                                <span className="text-gray-600">{booking.location}</span>
                                            </div>
                                        </div>

                                        {booking.notes && (
                                            <div className="mt-2 flex items-start space-x-2">
                                                <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5" />
                                                <span className="text-sm text-gray-600">{booking.notes}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Payment and Actions */}
                            <div className="flex flex-col items-end space-y-3">
                                <div className="text-right">
                                    <div className="flex items-center space-x-2 mb-1">
                                        {getPaymentIcon(booking.paymentMethod)}
                                        <span className="text-sm text-gray-600 capitalize">{booking.paymentMethod}</span>
                                    </div>
                                    <p className="text-lg font-bold text-gray-900">₦{booking.servicePrice.toLocaleString()}</p>
                                    <UberBadge variant={booking.paymentStatus === 'paid' ? 'green' : 'yellow'}>
                                        {booking.paymentStatus}
                                    </UberBadge>
                                </div>

                                <div className="flex space-x-2">
                                    <UberButton
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedBooking(booking);
                                            setShowBookingDetails(true);
                                        }}
                                    >
                                        <Eye className="h-4 w-4 mr-2" />
                                        View
                                    </UberButton>

                                    {booking.status === 'pending' && (
                                        <UberButton
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedBooking(booking);
                                                setShowCancelModal(true);
                                            }}
                                        >
                                            <Ban className="h-4 w-4 mr-2" />
                                            Cancel
                                        </UberButton>
                                    )}

                                    {booking.paymentStatus === 'paid' && ['pending', 'confirmed'].includes(booking.status) && (
                                        <UberButton
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedBooking(booking);
                                                setRefundAmount(booking.servicePrice);
                                                setShowRefundModal(true);
                                            }}
                                        >
                                            <RotateCcw className="h-4 w-4 mr-2" />
                                            Refund
                                        </UberButton>
                                    )}
                                </div>
                            </div>
                        </div>
                    </UberCard>
                );
            })
        )}
    </div>
);

export default AdminRequestList; 