import React, { useState, useMemo } from 'react';
import { CreditCard, Wallet, DollarSign } from 'lucide-react';
import { CarIcon } from '../ui/CarIcons';
import { demoBookings, demoUsers, DemoBooking } from '../../data/demoData';
import AdminRequestStats from './adminRequestManagement/AdminRequestStats';
import AdminRequestFilters from './adminRequestManagement/AdminRequestFilters';
import AdminRequestList from './adminRequestManagement/AdminRequestList';
import AdminRequestDetailsModal from './adminRequestManagement/AdminRequestDetailsModal';
import AdminRequestCancelModal from './adminRequestManagement/AdminRequestCancelModal';
import AdminRequestRefundModal from './adminRequestManagement/AdminRequestRefundModal';

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

    // Calculate stats
    const stats = useMemo(() => {
        const total = demoBookings.length;
        const pending = demoBookings.filter(b => b.status === 'pending').length;
        const confirmed = demoBookings.filter(b => b.status === 'confirmed').length;
        const inProgress = demoBookings.filter(b => b.status === 'in-progress').length;
        const completed = demoBookings.filter(b => b.status === 'completed').length;
        const totalRevenue = demoBookings.reduce((sum, booking) => sum + booking.servicePrice, 0);

        return { total, pending, confirmed, inProgress, completed, totalRevenue };
    }, []);

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



    return (
        <div className={`space-y-8 ${className}`}>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-display font-bold text-gray-900 mb-2">Request Management</h1>
                <p className="text-body text-gray-600">Manage all car wash bookings and customer requests</p>
            </div>

            {/* Statistics Cards */}
            <AdminRequestStats stats={stats} />

            {/* Filters and Search */}
            <AdminRequestFilters
                selectedFilter={selectedFilter}
                searchTerm={searchTerm}
                stats={stats}
                setSelectedFilter={setSelectedFilter}
                setSearchTerm={setSearchTerm}
            />

            {/* Bookings List */}
            <AdminRequestList
                filteredBookings={filteredBookings}
                getUserById={getUserById}
                getStatusColor={getStatusColor}
                getPaymentIcon={getPaymentIcon}
                setSelectedBooking={setSelectedBooking}
                setShowBookingDetails={setShowBookingDetails}
                setShowCancelModal={setShowCancelModal}
                setShowRefundModal={setShowRefundModal}
                setRefundAmount={setRefundAmount}
            />

            {/* Booking Details Modal */}
            <AdminRequestDetailsModal
                isOpen={showBookingDetails}
                onClose={() => setShowBookingDetails(false)}
                selectedBooking={selectedBooking}
                getStatusColor={getStatusColor}
            />

            {/* Cancel Booking Modal */}
            <AdminRequestCancelModal
                isOpen={showCancelModal}
                onClose={() => setShowCancelModal(false)}
                selectedBooking={selectedBooking}
                cancellationReason={cancellationReason}
                setCancellationReason={setCancellationReason}
                handleCancelBooking={handleCancelBooking}
            />

            {/* Refund Modal */}
            <AdminRequestRefundModal
                isOpen={showRefundModal}
                onClose={() => setShowRefundModal(false)}
                selectedBooking={selectedBooking}
                refundAmount={refundAmount}
                refundMethod={refundMethod}
                setRefundAmount={setRefundAmount}
                setRefundMethod={setRefundMethod}
                handleProcessRefund={handleProcessRefund}
            />
        </div>
    );
} 