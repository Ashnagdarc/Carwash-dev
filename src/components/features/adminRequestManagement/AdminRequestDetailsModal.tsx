import React from 'react';
import UberModal from '../../ui/UberModal';
import UberBadge from '../../ui/UberBadge';
import {
    User,
    Mail,
    Phone,
    MapPin
} from 'lucide-react';
import { DemoBooking } from '../../../data/demoData';

interface AdminRequestDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedBooking: DemoBooking | null;
    getStatusColor: (status: string) => string;
}

const AdminRequestDetailsModal: React.FC<AdminRequestDetailsModalProps> = ({
    isOpen,
    onClose,
    selectedBooking,
    getStatusColor
}) => (
    <UberModal
        isOpen={isOpen}
        onClose={onClose}
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
);

export default AdminRequestDetailsModal; 