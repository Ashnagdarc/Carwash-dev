import React from 'react';
import UberCard from '../../ui/UberCard';
import UberButton from '../../ui/UberButton';

interface User {
    name?: string;
    email?: string;
}

interface UserDashboardProfileProps {
    user: User | null;
    handleProfileSave: () => void;
}

const UserDashboardProfile: React.FC<UserDashboardProfileProps> = ({
    user,
    handleProfileSave
}) => (
    <div className="space-y-10">
        {/* Personal Information */}
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                    <input
                        type="text"
                        defaultValue={user?.name || 'John Doe'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                    <input
                        type="email"
                        defaultValue={user?.email || 'john.doe@example.com'}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        placeholder="+234 801 234 5678"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Date of Birth</label>
                    <input
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    />
                </div>
            </div>
        </UberCard>

        {/* Address Information */}
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">Address Information</h3>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Street Address</label>
                    <input
                        type="text"
                        placeholder="123 Main Street"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">City</label>
                        <input
                            type="text"
                            placeholder="Lagos"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">State</label>
                        <input
                            type="text"
                            placeholder="Lagos State"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Postal Code</label>
                        <input
                            type="text"
                            placeholder="100001"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200"
                        />
                    </div>
                </div>
            </div>
        </UberCard>

        {/* Service Preferences */}
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">Service Preferences</h3>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Service Time</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200">
                        <option value="">Select preferred time</option>
                        <option value="morning">Morning (6:00 AM - 12:00 PM)</option>
                        <option value="afternoon">Afternoon (12:00 PM - 5:00 PM)</option>
                        <option value="evening">Evening (5:00 PM - 8:00 PM)</option>
                        <option value="anytime">Anytime</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Preferred Service Type</label>
                    <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <span className="text-body text-gray-900">Basic Wash</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                            <span className="text-body text-gray-900">Premium Wash</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <span className="text-body text-gray-900">Full Detailing</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <span className="text-body text-gray-900">Interior Cleaning</span>
                        </label>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Special Instructions</label>
                    <textarea
                        placeholder="Any special instructions for your car wash services..."
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200 resize-none"
                    />
                </div>
            </div>
        </UberCard>

        {/* Account Settings */}
        <UberCard variant="elevated" padding="lg">
            <h3 className="text-heading font-semibold text-gray-900 mb-6">Account Settings</h3>
            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Language</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-200">
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="de">German</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Notifications</label>
                    <div className="space-y-3">
                        <label className="flex items-center space-x-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                            <span className="text-body text-gray-900">Email notifications</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                            <span className="text-body text-gray-900">SMS notifications</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" defaultChecked />
                            <span className="text-body text-gray-900">Push notifications</span>
                        </label>
                        <label className="flex items-center space-x-3">
                            <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                            <span className="text-body text-gray-900">Marketing emails</span>
                        </label>
                    </div>
                </div>
            </div>
        </UberCard>

        {/* Action Buttons */}
        <div className="flex space-x-4">
            <UberButton
                variant="outline"
                size="lg"
                className="flex-1"
            >
                Cancel Changes
            </UberButton>
            <UberButton
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={handleProfileSave}
            >
                Save Changes
            </UberButton>
        </div>
    </div>
);

export default UserDashboardProfile; 