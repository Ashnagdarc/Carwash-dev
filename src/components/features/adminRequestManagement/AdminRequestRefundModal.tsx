import React from 'react';
import UberModal from '../../ui/UberModal';
import UberButton from '../../ui/UberButton';
import { RotateCcw } from 'lucide-react';
import { DemoBooking } from '../../../data/demoData';

interface AdminRequestRefundModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedBooking: DemoBooking | null;
    refundAmount: number;
    refundMethod: 'wallet' | 'transfer';
    setRefundAmount: (amount: number) => void;
    setRefundMethod: (method: 'wallet' | 'transfer') => void;
    handleProcessRefund: () => void;
}

const AdminRequestRefundModal: React.FC<AdminRequestRefundModalProps> = ({
    isOpen,
    onClose,
    selectedBooking,
    refundAmount,
    refundMethod,
    setRefundAmount,
    setRefundMethod,
    handleProcessRefund
}) => (
    <UberModal
        isOpen={isOpen}
        onClose={onClose}
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
                        onClick={onClose}
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
);

export default AdminRequestRefundModal; 