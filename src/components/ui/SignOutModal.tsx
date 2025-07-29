import React from 'react';
import { X } from 'lucide-react';
import UberButton from './UberButton';

interface SignOutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const SignOutModal: React.FC<SignOutModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    {/* Content */}
                    <div className="p-6 pt-8">
                        {/* Title */}
                        <h2 className="text-heading font-bold text-gray-900 mb-3 text-center">
                            Do you want to sign out?
                        </h2>

                        {/* Informational Text */}
                        <p className="text-body text-gray-600 text-center mb-8">
                            Stay signed in to book your next service faster
                        </p>

                        {/* Buttons */}
                        <div className="space-y-3">
                            <UberButton
                                variant="primary"
                                size="lg"
                                onClick={onClose}
                                className="w-full bg-gray-900 hover:bg-gray-800"
                            >
                                Cancel
                            </UberButton>
                            <UberButton
                                variant="outline"
                                size="lg"
                                onClick={handleConfirm}
                                className="w-full bg-gray-100 text-gray-900 hover:bg-gray-200 border-gray-300"
                            >
                                Confirm sign out
                            </UberButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignOutModal;