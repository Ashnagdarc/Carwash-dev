import React from 'react';
import UberModal from '../../ui/UberModal';
import UberButton from '../../ui/UberButton';
import { AlertCircle } from 'lucide-react';
import { DemoBooking } from '../../../data/demoData';

interface AdminRequestCancelModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedBooking: DemoBooking | null;
    cancellationReason: string;
    setCancellationReason: (reason: string) => void;
    handleCancelBooking: () => void;
}

const AdminRequestCancelModal: React.FC<AdminRequestCancelModalProps> = ({
    isOpen,
    onClose,
    selectedBooking,
    cancellationReason,
    setCancellationReason,
    handleCancelBooking
}) => (
    <UberModal
        isOpen={isOpen}
        onClose={onClose}
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
                        onClick={onClose}
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
);

export default AdminRequestCancelModal; 