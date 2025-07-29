import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface PaymentMethod {
    id: number;
    type: 'cash' | 'card' | 'bank';
    name: string;
    isPreferred: boolean;
    icon: string;
    color: string;
    lastFour?: string;
    expiryDate?: string;
}

export interface Transaction {
    id: number;
    type: 'credit' | 'debit';
    amount: number;
    description: string;
    date: string;
    status: 'pending' | 'completed' | 'failed';
    paymentMethod?: string;
}

export interface Voucher {
    id: number;
    code: string;
    amount: number;
    description: string;
    expiryDate: string;
    isUsed: boolean;
}

export interface WalletData {
    balance: number;
    currency: string;
    paymentMethods: PaymentMethod[];
    transactions: Transaction[];
    vouchers: Voucher[];
}

interface WalletContextType {
    wallet: WalletData;
    addMoney: (amount: number) => void;
    makePayment: (amount: number, description: string, paymentMethodId?: number) => void;
    addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
    removePaymentMethod: (id: number) => void;
    setPreferredPaymentMethod: (id: number) => void;
    addVoucher: (code: string, amount: number, description: string, expiryDate: string) => void;
    useVoucher: (id: number) => void;
    formatCurrency: (amount: number) => string;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Mock initial data
const initialWalletData: WalletData = {
    balance: 0.00,
    currency: 'NGN',
    paymentMethods: [
        {
            id: 1,
            type: 'cash',
            name: 'Cash',
            isPreferred: true,
            icon: 'Banknote',
            color: 'bg-green-500'
        },
        {
            id: 2,
            type: 'card',
            name: 'Visa ending in 1234',
            isPreferred: false,
            icon: 'CreditCard',
            color: 'bg-blue-500',
            lastFour: '1234',
            expiryDate: '12/25'
        }
    ],
    transactions: [
        {
            id: 1,
            type: 'credit',
            amount: 5000,
            description: 'Premium Car Wash',
            date: '2024-01-15',
            status: 'completed',
            paymentMethod: 'Cash'
        },
        {
            id: 2,
            type: 'debit',
            amount: 2000,
            description: 'Basic Wash Service',
            date: '2024-01-10',
            status: 'completed',
            paymentMethod: 'Visa ending in 1234'
        }
    ],
    vouchers: []
};

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [wallet, setWallet] = useState<WalletData>(() => {
        // Load from localStorage if available
        const saved = localStorage.getItem('carwash-wallet');
        return saved ? JSON.parse(saved) : initialWalletData;
    });

    // Save to localStorage whenever wallet changes
    useEffect(() => {
        localStorage.setItem('carwash-wallet', JSON.stringify(wallet));
    }, [wallet]);

    const addMoney = (amount: number) => {
        setWallet(prev => ({
            ...prev,
            balance: prev.balance + amount,
            transactions: [
                {
                    id: Date.now(),
                    type: 'credit',
                    amount,
                    description: 'Wallet Top-up',
                    date: new Date().toISOString().split('T')[0],
                    status: 'completed'
                },
                ...prev.transactions
            ]
        }));
    };

    const makePayment = (amount: number, description: string, paymentMethodId?: number) => {
        const paymentMethod = paymentMethodId
            ? wallet.paymentMethods.find(m => m.id === paymentMethodId)
            : wallet.paymentMethods.find(m => m.isPreferred);

        setWallet(prev => ({
            ...prev,
            balance: prev.balance - amount,
            transactions: [
                {
                    id: Date.now(),
                    type: 'debit',
                    amount,
                    description,
                    date: new Date().toISOString().split('T')[0],
                    status: 'completed',
                    paymentMethod: paymentMethod?.name || 'Cash'
                },
                ...prev.transactions
            ]
        }));
    };

    const addPaymentMethod = (method: Omit<PaymentMethod, 'id'>) => {
        setWallet(prev => ({
            ...prev,
            paymentMethods: [
                ...prev.paymentMethods,
                {
                    ...method,
                    id: Date.now()
                }
            ]
        }));
    };

    const removePaymentMethod = (id: number) => {
        setWallet(prev => ({
            ...prev,
            paymentMethods: prev.paymentMethods.filter(m => m.id !== id)
        }));
    };

    const setPreferredPaymentMethod = (id: number) => {
        setWallet(prev => ({
            ...prev,
            paymentMethods: prev.paymentMethods.map(m => ({
                ...m,
                isPreferred: m.id === id
            }))
        }));
    };

    const addVoucher = (code: string, amount: number, description: string, expiryDate: string) => {
        setWallet(prev => ({
            ...prev,
            vouchers: [
                ...prev.vouchers,
                {
                    id: Date.now(),
                    code,
                    amount,
                    description,
                    expiryDate,
                    isUsed: false
                }
            ]
        }));
    };

    const useVoucher = (id: number) => {
        const voucher = wallet.vouchers.find(v => v.id === id);
        if (voucher && !voucher.isUsed) {
            setWallet(prev => ({
                ...prev,
                balance: prev.balance + voucher.amount,
                vouchers: prev.vouchers.map(v =>
                    v.id === id ? { ...v, isUsed: true } : v
                ),
                transactions: [
                    {
                        id: Date.now(),
                        type: 'credit',
                        amount: voucher.amount,
                        description: `Voucher: ${voucher.description}`,
                        date: new Date().toISOString().split('T')[0],
                        status: 'completed'
                    },
                    ...prev.transactions
                ]
            }));
        }
    };

    const formatCurrency = (amount: number) => {
        return `${wallet.currency} ${amount.toLocaleString('en-NG', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    };

    const value: WalletContextType = {
        wallet,
        addMoney,
        makePayment,
        addPaymentMethod,
        removePaymentMethod,
        setPreferredPaymentMethod,
        addVoucher,
        useVoucher,
        formatCurrency
    };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
};