import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UberCard from '../ui/UberCard';
import UberButton from '../ui/UberButton';
import UberBadge from '../ui/UberBadge';
import UberModal from '../ui/UberModal';
import { useWallet } from '../../contexts/WalletContext';
import {
    ArrowLeft,
    Plus,
    CreditCard,
    Banknote,
    ChevronRight,
    Wallet,
    DollarSign,
    Gift,
    CheckCircle,
    Trash2
} from 'lucide-react';

const WalletPage = () => {
    const navigate = useNavigate();
    const { wallet, addMoney, addPaymentMethod, removePaymentMethod, setPreferredPaymentMethod, addVoucher, formatCurrency } = useWallet();

    const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
    const [isAddVoucherModalOpen, setIsAddVoucherModalOpen] = useState(false);
    const [isAddMoneyModalOpen, setIsAddMoneyModalOpen] = useState(false);
    const [voucherCode, setVoucherCode] = useState('');
    const [addMoneyAmount, setAddMoneyAmount] = useState('');

    const getIconComponent = (iconName: string) => {
        switch (iconName) {
            case 'Banknote':
                return Banknote;
            case 'CreditCard':
                return CreditCard;
            default:
                return Wallet;
        }
    };

    const handleAddMoney = () => {
        const amount = parseFloat(addMoneyAmount);
        if (amount > 0) {
            addMoney(amount);
            setIsAddMoneyModalOpen(false);
            setAddMoneyAmount('');
        }
    };

    const handleAddVoucher = () => {
        if (voucherCode.trim()) {
            // Mock voucher data - in real app, this would validate with backend
            addVoucher(voucherCode, 1000, 'Welcome Bonus', '2024-12-31');
            setIsAddVoucherModalOpen(false);
            setVoucherCode('');
        }
    };

    const handleAddPaymentMethod = (type: 'card' | 'bank') => {
        const newMethod = {
            type,
            name: type === 'card' ? 'New Card' : 'Bank Account',
            isPreferred: false,
            icon: type === 'card' ? 'CreditCard' : 'Banknote',
            color: type === 'card' ? 'bg-blue-500' : 'bg-green-500'
        };
        addPaymentMethod(newMethod);
        setIsAddPaymentModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-white font-uber pt-16">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center space-x-2 text-body text-gray-600 hover:text-gray-900 transition-colors font-medium mb-6"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        <span>Back to Dashboard</span>
                    </button>
                    <h1 className="text-display font-bold text-gray-900 mb-2">Wallet</h1>
                    <p className="text-body text-gray-600">Manage your payments and transactions</p>
                </div>

                {/* Uber Cash Section */}
                <UberCard variant="elevated" padding="lg" className="mb-8">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-2xl flex items-center justify-center">
                                    <Wallet className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-subheading font-semibold text-gray-900">My Wallet</h2>
                                    <p className="text-caption text-gray-600">Your wallet balance</p>
                                </div>
                            </div>
                            <UberButton
                                variant="primary"
                                size="sm"
                                icon={<Plus className="h-4 w-4" />}
                                onClick={() => setIsAddMoneyModalOpen(true)}
                            >
                                Add Money
                            </UberButton>
                        </div>
                        <div className="text-center">
                            <p className="text-display font-bold text-gray-900 mb-2">
                                {formatCurrency(wallet.balance)}
                            </p>
                            <p className="text-caption text-gray-600">
                                {wallet.balance === 0 ? 'No balance available' : 'Available for payments'}
                            </p>
                        </div>
                    </div>
                </UberCard>

                {/* Payment Methods Section */}
                <div className="mb-8">
                    <h2 className="text-heading font-semibold text-gray-900 mb-6">Payment Methods</h2>
                    <div className="space-y-4">
                        {wallet.paymentMethods.map((method) => {
                            const IconComponent = getIconComponent(method.icon);
                            return (
                                <UberCard
                                    key={method.id}
                                    variant={method.isPreferred ? "elevated" : "default"}
                                    padding="lg"
                                    className="cursor-pointer hover:shadow-lg transition-all duration-200"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-12 h-12 ${method.color} rounded-2xl flex items-center justify-center`}>
                                                <IconComponent className="h-6 w-6 text-white" />
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <p className="text-body font-semibold text-gray-900">{method.name}</p>
                                                    {method.isPreferred && (
                                                        <UberBadge variant="success" size="sm">
                                                            Preferred
                                                        </UberBadge>
                                                    )}
                                                </div>
                                                <p className="text-caption text-gray-600">
                                                    {method.type === 'cash' ? 'Pay with cash' : 'Credit card payment'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            {!method.isPreferred && method.type !== 'cash' && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setPreferredPaymentMethod(method.id);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </button>
                                            )}
                                            {method.type !== 'cash' && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removePaymentMethod(method.id);
                                                    }}
                                                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                            <ChevronRight className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </UberCard>
                            );
                        })}

                        <UberCard variant="default" padding="lg" className="cursor-pointer hover:shadow-lg transition-all duration-200">
                            <div
                                className="flex items-center space-x-4"
                                onClick={() => setIsAddPaymentModalOpen(true)}
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                                    <Plus className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-body font-semibold text-gray-900">Add Payment Method</p>
                                    <p className="text-caption text-gray-600">Add a new card or payment option</p>
                                </div>
                            </div>
                        </UberCard>
                    </div>
                </div>

                {/* Vouchers Section */}
                <div className="mb-8">
                    <h2 className="text-heading font-semibold text-gray-900 mb-6">Vouchers</h2>
                    {wallet.vouchers.length > 0 ? (
                        <div className="space-y-4">
                            {wallet.vouchers.map((voucher) => (
                                <UberCard key={voucher.id} variant="default" padding="lg">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${voucher.isUsed ? 'bg-gray-100' : 'bg-yellow-100'
                                                }`}>
                                                <Gift className={`h-6 w-6 ${voucher.isUsed ? 'text-gray-400' : 'text-yellow-600'
                                                    }`} />
                                            </div>
                                            <div>
                                                <p className="text-body font-semibold text-gray-900">{voucher.description}</p>
                                                <p className="text-caption text-gray-600">{voucher.code}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-body font-semibold text-green-600">
                                                {formatCurrency(voucher.amount)}
                                            </p>
                                            <UberBadge
                                                variant={voucher.isUsed ? 'secondary' : 'success'}
                                                size="sm"
                                            >
                                                {voucher.isUsed ? 'Used' : 'Available'}
                                            </UberBadge>
                                        </div>
                                    </div>
                                </UberCard>
                            ))}
                        </div>
                    ) : (
                        <UberCard variant="default" padding="lg" className="cursor-pointer hover:shadow-lg transition-all duration-200">
                            <div
                                className="flex items-center space-x-4"
                                onClick={() => setIsAddVoucherModalOpen(true)}
                            >
                                <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
                                    <Plus className="h-6 w-6 text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-body font-semibold text-gray-900">Add voucher</p>
                                    <p className="text-caption text-gray-600">Enter a promo code or gift voucher</p>
                                </div>
                            </div>
                        </UberCard>
                    )}
                </div>

                {/* Recent Transactions */}
                <div className="mb-8">
                    <h2 className="text-heading font-semibold text-gray-900 mb-6">Recent Transactions</h2>
                    <div className="space-y-4">
                        {wallet.transactions.slice(0, 5).map((transaction) => (
                            <UberCard key={transaction.id} variant="default" padding="lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                                            }`}>
                                            <DollarSign className={`h-5 w-5 ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                                }`} />
                                        </div>
                                        <div>
                                            <p className="text-body font-semibold text-gray-900">{transaction.description}</p>
                                            <p className="text-caption text-gray-600">{transaction.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className={`text-body font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                            }`}>
                                            {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                                        </p>
                                        <UberBadge variant="success" size="sm">
                                            {transaction.status}
                                        </UberBadge>
                                    </div>
                                </div>
                            </UberCard>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add Money Modal */}
            <UberModal
                isOpen={isAddMoneyModalOpen}
                onClose={() => setIsAddMoneyModalOpen(false)}
                title="Add Money to Wallet"
                size="md"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-caption font-medium text-gray-700 mb-3">
                            Amount (NGN)
                        </label>
                        <input
                            type="number"
                            placeholder="Enter amount"
                            value={addMoneyAmount}
                            onChange={(e) => setAddMoneyAmount(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-body focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                    </div>

                    <div className="flex gap-4">
                        <UberButton
                            variant="outline"
                            size="md"
                            onClick={() => setIsAddMoneyModalOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </UberButton>
                        <UberButton
                            variant="primary"
                            size="md"
                            onClick={handleAddMoney}
                            className="flex-1"
                        >
                            Add Money
                        </UberButton>
                    </div>
                </div>
            </UberModal>

            {/* Add Payment Method Modal */}
            <UberModal
                isOpen={isAddPaymentModalOpen}
                onClose={() => setIsAddPaymentModalOpen(false)}
                title="Add Payment Method"
                size="lg"
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <UberCard
                            variant="default"
                            padding="lg"
                            className="cursor-pointer hover:shadow-lg transition-all duration-200"
                            onClick={() => handleAddPaymentMethod('card')}
                        >
                            <div className="text-center">
                                <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <CreditCard className="h-6 w-6 text-blue-600" />
                                </div>
                                <p className="text-body font-semibold text-gray-900 mb-2">Credit/Debit Card</p>
                                <p className="text-caption text-gray-600">Add a new card</p>
                            </div>
                        </UberCard>

                        <UberCard
                            variant="default"
                            padding="lg"
                            className="cursor-pointer hover:shadow-lg transition-all duration-200"
                            onClick={() => handleAddPaymentMethod('bank')}
                        >
                            <div className="text-center">
                                <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Banknote className="h-6 w-6 text-green-600" />
                                </div>
                                <p className="text-body font-semibold text-gray-900 mb-2">Bank Transfer</p>
                                <p className="text-caption text-gray-600">Connect your bank account</p>
                            </div>
                        </UberCard>
                    </div>

                    <div className="flex gap-4">
                        <UberButton
                            variant="outline"
                            size="md"
                            onClick={() => setIsAddPaymentModalOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </UberButton>
                    </div>
                </div>
            </UberModal>

            {/* Add Voucher Modal */}
            <UberModal
                isOpen={isAddVoucherModalOpen}
                onClose={() => setIsAddVoucherModalOpen(false)}
                title="Add Voucher"
                size="md"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-caption font-medium text-gray-700 mb-3">
                            Voucher Code
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your voucher code"
                            value={voucherCode}
                            onChange={(e) => setVoucherCode(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-body focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        />
                    </div>

                    <div className="flex gap-4">
                        <UberButton
                            variant="outline"
                            size="md"
                            onClick={() => setIsAddVoucherModalOpen(false)}
                            className="flex-1"
                        >
                            Cancel
                        </UberButton>
                        <UberButton
                            variant="primary"
                            size="md"
                            onClick={handleAddVoucher}
                            className="flex-1"
                        >
                            Add Voucher
                        </UberButton>
                    </div>
                </div>
            </UberModal>
        </div>
    );
};

export default WalletPage;