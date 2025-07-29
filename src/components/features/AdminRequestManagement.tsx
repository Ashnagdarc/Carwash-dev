import React, { useState, useMemo } from 'react';
import {
    Calendar,
    Clock,
    Car,
    User,
    Phone,
    Mail,
    MapPin,
    DollarSign,
    CheckCircle,
    XCircle,
    AlertCircle,
    Filter,
    Search,
    Eye,
    Ban,
    RotateCcw,
    MessageSquare,
    CreditCard,
    Wallet
} from 'lucide-react';
import UberCard from '../ui/UberCard';
import UberButton from '../ui/UberButton';
import UberModal from '../ui/UberModal';
import UberBadge from '../ui/UberBadge';
import { demoBookings, demoUsers, demoTransactions, DemoBooking } from '../../data/demoData';

interface AdminRequestManagementProps {
    className?: string;
}

export function AdminRequestManagement({ className }: AdminRequestManagementProps) {
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'refunded'>('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedBooking, setSelectedBooking] = useState<DemoBooking | null>(null);
    const [showBookingDetails, setShowBookingDetails] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showRefundModal, setShowRefundModal] = useState(false);
    const [cancellationReason, setCancellationReason] = useState('');
    const [refundAmount, setRefundAmount] = useState(0);
    const [refundMethod, setRefundMethod] = useState<'wallet' | 'transfer'>('wallet');

    // Filter and search bookings
    const filteredBookings = useMemo(() => {
        let filtered = demoBookings;

        // Apply status filter
        if (selectedFilter !== 'all') {
            filtered = filtered.filter(booking => booking.status === selectedFilter);
        }

        // Apply search filter
        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(booking =>
                booking.userName.toLowerCase().includes(searchLower) ||
                booking.userEmail.toLowerCase().includes(searchLower) ||
                booking.licensePlate.toLowerCase().includes(searchLower) ||
                booking.service.toLowerCase().includes(searchLower) ||
                booking.location.toLowerCase().includes(searchLower)
            );
        }

        return filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [selectedFilter, searchTerm]);

    // Get user by ID
    const getUserById = (userId: string) => {
        return demoUsers.find(user => user.id === userId);
    };

    // Get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'yellow';
            case 'confirmed': return 'blue';
            case 'in-progress': return 'purple';
            case 'completed': return 'green';
            case 'cancelled': return 'red';
            case 'refunded': return 'gray';
            default: return 'gray';
        }
    };

    // Get payment method icon
    const getPaymentIcon = (method: string) => {
        switch (method) {
            case 'wallet': return <Wallet className="h-4 w-4" />;
            case 'transfer': return <CreditCard className="h-4 w-4" />;
            case 'cash': return <DollarSign className="h-4 w-4" />;
            default: return <DollarSign className="h-4 w-4" />;
        }
    };

    // Handle booking cancellation
    const handleCancelBooking = () => {
        if (!selectedBooking || !cancellationReason.trim()) return;

        // In a real app, this would make an API call
        console.log('Cancelling booking:', selectedBooking.id, 'Reason:', cancellationReason);

        setShowCancelModal(false);
        setCancellationReason('');
        setSelectedBooking(null);
    };

    // Handle refund processing
    const handleProcessRefund = () => {
        if (!selectedBooking || refundAmount <= 0) return;

        // In a real app, this would make an API call
        console.log('Processing refund:', {
            bookingId: selectedBooking.id,
            amount: refundAmount,
            method: refundMethod
        });

        setShowRefundModal(false);
        setRefundAmount(0);
        setRefundMethod('wallet');
        setSelectedBooking(null);
    };

    // Calculate statistics
    const stats = useMemo(() => {
        const total = demoBookings.length;
        const pending = demoBookings.filter(b => b.status === 'pending').length;
        const confirmed = demoBookings.filter(b => b.status === 'confirmed').length;
        const inProgress = demoBookings.filter(b => b.status === 'in-progress').length;
        const completed = demoBookings.filter(b => b.status === 'completed').length;
        const cancelled = demoBookings.filter(b => b.status === 'cancelled').length;
        const totalRevenue = demoBookings
            .filter(b => b.paymentStatus === 'paid')
            .reduce((sum, b) => sum + b.servicePrice, 0);

        return { total, pending, confirmed, inProgress, completed, cancelled, totalRevenue };
    }, []);

    return (
        <div className={`space-y-8 ${className}`}>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-display font-bold text-gray-900 mb-2">Request Management</h1>
                <p className="text-body text-gray-600">Manage all car wash bookings and customer requests</p>
            </div>

            {/* Statistics Cards */}
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

            {/* Filters and Search */}
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

            {/* Bookings List */}
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
                                                <Car className="h-6 w-6 text-blue-600" />
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
                                                        <Car className="h-4 w-4 text-gray-400" />
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

            {/* Booking Details Modal */}
            <UberModal
                isOpen={showBookingDetails}
                onClose={() => setShowBookingDetails(false)}
                title="Booking Details"
                size="lg"
            >
                {selectedBooking && (
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <div>
                            <h3 className="text-subheading font-semibold text-gray-900 mb-3">Customer Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center space-x-3">
                                    <User className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{selectedBooking.userName}</p>
                                        <p className="text-xs text-gray-600">Customer</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{selectedBooking.userEmail}</p>
                                        <p className="text-xs text-gray-600">Email</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{selectedBooking.userPhone}</p>
                                        <p className="text-xs text-gray-600">Phone</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="h-5 w-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{selectedBooking.location}</p>
                                        <p className="text-xs text-gray-600">Location</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vehicle Information */}
                        <div>
                            <h3 className="text-subheading font-semibold text-gray-900 mb-3">Vehicle Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Make & Model</p>
                                    <p className="text-sm font-medium text-gray-900">{selectedBooking.carMake} {selectedBooking.carModel}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Year</p>
                                    <p className="text-sm font-medium text-gray-900">{selectedBooking.carYear}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">License Plate</p>
                                    <p className="text-sm font-medium text-gray-900">{selectedBooking.licensePlate}</p>
                                </div>
                            </div>
                        </div>

                        {/* Service Information */}
                        <div>
                            <h3 className="text-subheading font-semibold text-gray-900 mb-3">Service Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Service</p>
                                    <p className="text-sm font-medium text-gray-900">{selectedBooking.service}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Price</p>
                                    <p className="text-sm font-medium text-gray-900">₦{selectedBooking.servicePrice.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Date & Time</p>
                                    <p className="text-sm font-medium text-gray-900">{selectedBooking.date} at {selectedBooking.time}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Payment Method</p>
                                    <p className="text-sm font-medium text-gray-900 capitalize">{selectedBooking.paymentMethod}</p>
                                </div>
                            </div>
                        </div>

                        {/* Status Information */}
                        <div>
                            <h3 className="text-subheading font-semibold text-gray-900 mb-3">Status Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <p className="text-sm text-gray-600">Booking Status</p>
                                    <UberBadge variant={getStatusColor(selectedBooking.status)}>
                                        {selectedBooking.status.replace('-', ' ')}
                                    </UberBadge>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Payment Status</p>
                                    <UberBadge variant={selectedBooking.paymentStatus === 'paid' ? 'green' : 'yellow'}>
                                        {selectedBooking.paymentStatus}
                                    </UberBadge>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Created</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(selectedBooking.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Last Updated</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(selectedBooking.updatedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {selectedBooking.notes && (
                            <div>
                                <h3 className="text-subheading font-semibold text-gray-900 mb-3">Notes</h3>
                                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedBooking.notes}</p>
                            </div>
                        )}

                        {selectedBooking.cancellationReason && (
                            <div>
                                <h3 className="text-subheading font-semibold text-gray-900 mb-3">Cancellation Reason</h3>
                                <p className="text-sm text-gray-600 bg-red-50 p-3 rounded-lg">{selectedBooking.cancellationReason}</p>
                            </div>
                        )}

                        {selectedBooking.refundAmount && (
                            <div>
                                <h3 className="text-subheading font-semibold text-gray-900 mb-3">Refund Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Refund Amount</p>
                                        <p className="text-sm font-medium text-gray-900">₦{selectedBooking.refundAmount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Refund Date</p>
                                        <p className="text-sm font-medium text-gray-900">
                                            {selectedBooking.refundDate ? new Date(selectedBooking.refundDate).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </UberModal>

            {/* Cancel Booking Modal */}
            <UberModal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                title="Cancel Booking"
                size="md"
            >
                {selectedBooking && (
                    <div className="space-y-4">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <AlertCircle className="h-5 w-5 text-yellow-600" />
                                <p className="text-sm font-medium text-yellow-800">Cancel Booking</p>
                            </div>
                            <p className="text-sm text-yellow-700 mt-2">
                                Are you sure you want to cancel this booking? This action cannot be undone.
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-900 mb-2">Booking Details</p>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">{selectedBooking.service}</span> for {selectedBooking.userName}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {selectedBooking.date} at {selectedBooking.time} - ₦{selectedBooking.servicePrice.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Cancellation Reason <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                value={cancellationReason}
                                onChange={(e) => setCancellationReason(e.target.value)}
                                placeholder="Enter the reason for cancellation..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                rows={3}
                            />
                        </div>

                        <div className="flex space-x-3 pt-4">
                            <UberButton
                                variant="outline"
                                onClick={() => setShowCancelModal(false)}
                                className="flex-1"
                            >
                                Cancel
                            </UberButton>
                            <UberButton
                                variant="destructive"
                                onClick={handleCancelBooking}
                                disabled={!cancellationReason.trim()}
                                className="flex-1"
                            >
                                Confirm Cancellation
                            </UberButton>
                        </div>
                    </div>
                )}
            </UberModal>

            {/* Refund Modal */}
            <UberModal
                isOpen={showRefundModal}
                onClose={() => setShowRefundModal(false)}
                title="Process Refund"
                size="md"
            >
                {selectedBooking && (
                    <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-center space-x-2">
                                <RotateCcw className="h-5 w-5 text-blue-600" />
                                <p className="text-sm font-medium text-blue-800">Process Refund</p>
                            </div>
                            <p className="text-sm text-blue-700 mt-2">
                                Process a refund for this booking. The customer will be notified automatically.
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-900 mb-2">Booking Details</p>
                            <div className="bg-gray-50 rounded-lg p-3">
                                <p className="text-sm text-gray-600">
                                    <span className="font-medium">{selectedBooking.service}</span> for {selectedBooking.userName}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {selectedBooking.date} at {selectedBooking.time}
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Refund Amount <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                                <input
                                    type="number"
                                    value={refundAmount}
                                    onChange={(e) => setRefundAmount(Number(e.target.value))}
                                    min="0"
                                    max={selectedBooking.servicePrice}
                                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Maximum refund amount: ₦{selectedBooking.servicePrice.toLocaleString()}
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Refund Method <span className="text-red-500">*</span>
                            </label>
                            <div className="space-y-2">
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        value="wallet"
                                        checked={refundMethod === 'wallet'}
                                        onChange={(e) => setRefundMethod(e.target.value as 'wallet' | 'transfer')}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-900">Wallet Credit</span>
                                </label>
                                <label className="flex items-center space-x-3">
                                    <input
                                        type="radio"
                                        value="transfer"
                                        checked={refundMethod === 'transfer'}
                                        onChange={(e) => setRefundMethod(e.target.value as 'wallet' | 'transfer')}
                                        className="text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-900">Bank Transfer</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex space-x-3 pt-4">
                            <UberButton
                                variant="outline"
                                onClick={() => setShowRefundModal(false)}
                                className="flex-1"
                            >
                                Cancel
                            </UberButton>
                            <UberButton
                                variant="default"
                                onClick={handleProcessRefund}
                                disabled={refundAmount <= 0 || refundAmount > selectedBooking.servicePrice}
                                className="flex-1"
                            >
                                Process Refund
                            </UberButton>
                        </div>
                    </div>
                )}
            </UberModal>
        </div>
    );
} 