import React from 'react';
import UberCard from '../../ui/UberCard';
import UberInput from '../../ui/UberInput';

interface AdminDashboardSettingsProps {
    settings: any;
    handleGeneralSettingChange: (field: string, value: string) => void;
    handleServiceSettingChange: (service: string, field: string, value: number | boolean) => void;
    handleNotificationChange: (type: string, value: boolean) => void;
    handlePaymentMethodChange: (method: string, value: boolean) => void;
    handleWalletSettingChange: (field: string, value: number | boolean) => void;
    handleSecuritySettingChange: (field: string, value: number | boolean) => void;
}

const AdminDashboardSettings: React.FC<AdminDashboardSettingsProps> = ({
    settings,
    handleGeneralSettingChange,
    handleServiceSettingChange,
    handleNotificationChange,
    handlePaymentMethodChange,
    handleWalletSettingChange,
    handleSecuritySettingChange,
}) => (
    <div className="space-y-10">
        {/* General Settings */}
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">General Settings</h3>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UberInput
                        label="Company Name"
                        placeholder="CarWash Pro"
                        value={settings.general.companyName}
                        onChange={(value) => handleGeneralSettingChange('companyName', value)}
                    />
                    <UberInput
                        label="Contact Email"
                        placeholder="admin@carwashpro.com"
                        value={settings.general.contactEmail}
                        onChange={(value) => handleGeneralSettingChange('contactEmail', value)}
                        type="email"
                    />
                    <UberInput
                        label="Phone Number"
                        placeholder="+234 801 234 5678"
                        value={settings.general.phoneNumber}
                        onChange={(value) => handleGeneralSettingChange('phoneNumber', value)}
                    />
                    <UberInput
                        label="Business Address"
                        placeholder="123 Main Street, Lagos"
                        value={settings.general.businessAddress}
                        onChange={(value) => handleGeneralSettingChange('businessAddress', value)}
                    />
                </div>
                <div>
                    <label className="block text-caption font-medium text-gray-700 mb-3">
                        Business Hours
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Opening Time</label>
                            <input
                                type="time"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-body focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                value={settings.general.openingTime}
                                onChange={(e) => handleGeneralSettingChange('openingTime', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">Closing Time</label>
                            <input
                                type="time"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-body focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                value={settings.general.closingTime}
                                onChange={(e) => handleGeneralSettingChange('closingTime', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </UberCard>
        {/* Service Settings */}
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">Service Settings</h3>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Basic Wash */}
                    <div className="p-4 bg-blue-50 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Basic Wash</h4>
                        <UberInput
                            label="Price (₦)"
                            placeholder="2500"
                            value={settings.services.basicWash.price.toString()}
                            onChange={(value) => handleServiceSettingChange('basicWash', 'price', parseInt(value) || 0)}
                            type="number"
                        />
                        <div className="mt-3">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="rounded text-blue-600"
                                    checked={settings.services.basicWash.active}
                                    onChange={(e) => handleServiceSettingChange('basicWash', 'active', e.target.checked)}
                                />
                                <span className="text-xs text-gray-600">Active</span>
                            </label>
                        </div>
                    </div>
                    {/* Premium Wash */}
                    <div className="p-4 bg-green-50 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Premium Wash</h4>
                        <UberInput
                            label="Price (₦)"
                            placeholder="5000"
                            value={settings.services.premiumWash.price.toString()}
                            onChange={(value) => handleServiceSettingChange('premiumWash', 'price', parseInt(value) || 0)}
                            type="number"
                        />
                        <div className="mt-3">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="rounded text-blue-600"
                                    checked={settings.services.premiumWash.active}
                                    onChange={(e) => handleServiceSettingChange('premiumWash', 'active', e.target.checked)}
                                />
                                <span className="text-xs text-gray-600">Active</span>
                            </label>
                        </div>
                    </div>
                    {/* Full Detailing */}
                    <div className="p-4 bg-purple-50 rounded-xl">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Full Detailing</h4>
                        <UberInput
                            label="Price (₦)"
                            placeholder="8500"
                            value={settings.services.fullDetailing.price.toString()}
                            onChange={(value) => handleServiceSettingChange('fullDetailing', 'price', parseInt(value) || 0)}
                            type="number"
                        />
                        <div className="mt-3">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    className="rounded text-blue-600"
                                    checked={settings.services.fullDetailing.active}
                                    onChange={(e) => handleServiceSettingChange('fullDetailing', 'active', e.target.checked)}
                                />
                                <span className="text-xs text-gray-600">Active</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </UberCard>
        {/* Notification Settings */}
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">Notification Settings</h3>
            <div className="space-y-4">
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={settings.notifications.email}
                        onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    />
                    <span className="text-body text-gray-700">Email Notifications</span>
                </label>
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={settings.notifications.sms}
                        onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                    />
                    <span className="text-body text-gray-700">SMS Notifications</span>
                </label>
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={settings.notifications.push}
                        onChange={(e) => handleNotificationChange('push', e.target.checked)}
                    />
                    <span className="text-body text-gray-700">Push Notifications</span>
                </label>
            </div>
        </UberCard>
        {/* Payment Settings */}
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">Payment Settings</h3>
            <div className="space-y-4">
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={settings.payment.methods.cashOnDelivery}
                        onChange={(e) => handlePaymentMethodChange('cashOnDelivery', e.target.checked)}
                    />
                    <span className="text-body text-gray-700">Cash on Delivery</span>
                </label>
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={settings.payment.methods.bankTransfer}
                        onChange={(e) => handlePaymentMethodChange('bankTransfer', e.target.checked)}
                    />
                    <span className="text-body text-gray-700">Bank Transfer</span>
                </label>
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={settings.payment.methods.creditCard}
                        onChange={(e) => handlePaymentMethodChange('creditCard', e.target.checked)}
                    />
                    <span className="text-body text-gray-700">Credit Card</span>
                </label>
                <label className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={settings.payment.methods.inAppWallet}
                        onChange={(e) => handlePaymentMethodChange('inAppWallet', e.target.checked)}
                    />
                    <span className="text-body text-gray-700">In-App Wallet</span>
                </label>
            </div>
        </UberCard>
        {/* Wallet Settings */}
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">Wallet Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <UberInput
                    label="Min Balance (₦)"
                    placeholder="1000"
                    value={settings.payment.wallet.minBalance.toString()}
                    onChange={(value) => handleWalletSettingChange('minBalance', parseInt(value) || 0)}
                    type="number"
                />
                <UberInput
                    label="Max Balance (₦)"
                    placeholder="50000"
                    value={settings.payment.wallet.maxBalance.toString()}
                    onChange={(value) => handleWalletSettingChange('maxBalance', parseInt(value) || 0)}
                    type="number"
                />
                <label className="flex items-center space-x-3 mt-6">
                    <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={settings.payment.wallet.autoRecharge}
                        onChange={(e) => handleWalletSettingChange('autoRecharge', e.target.checked)}
                    />
                    <span className="text-body text-gray-700">Auto Recharge</span>
                </label>
            </div>
        </UberCard>
        {/* Security Settings */}
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">Security Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <UberInput
                    label="Session Timeout (minutes)"
                    placeholder="30"
                    value={settings.security.sessionTimeout.toString()}
                    onChange={(value) => handleSecuritySettingChange('sessionTimeout', parseInt(value) || 0)}
                    type="number"
                />
                <UberInput
                    label="Max Login Attempts"
                    placeholder="5"
                    value={settings.security.maxLoginAttempts.toString()}
                    onChange={(value) => handleSecuritySettingChange('maxLoginAttempts', parseInt(value) || 0)}
                    type="number"
                />
                <label className="flex items-center space-x-3 mt-6">
                    <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={settings.security.twoFactorAuth}
                        onChange={(e) => handleSecuritySettingChange('twoFactorAuth', e.target.checked)}
                    />
                    <span className="text-body text-gray-700">Two-Factor Authentication</span>
                </label>
                <label className="flex items-center space-x-3 mt-6">
                    <input
                        type="checkbox"
                        className="rounded text-blue-600"
                        checked={settings.security.passwordPolicy}
                        onChange={(e) => handleSecuritySettingChange('passwordPolicy', e.target.checked)}
                    />
                    <span className="text-body text-gray-700">Enforce Strong Passwords</span>
                </label>
            </div>
        </UberCard>
    </div>
);

export default AdminDashboardSettings;