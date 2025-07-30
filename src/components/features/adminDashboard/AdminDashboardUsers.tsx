import React from 'react';
import UberCard from '../../ui/UberCard';
import UberButton from '../../ui/UberButton';
import UberBadge from '../../ui/UberBadge';
import { Plus, User } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    status: string;
}

interface AdminDashboardUsersProps {
    users: User[];
    setIsAddUserModalOpen: (open: boolean) => void;
}

const AdminDashboardUsers: React.FC<AdminDashboardUsersProps> = ({
    users,
    setIsAddUserModalOpen
}) => (
    <div className="space-y-10">
        <UberCard variant="elevated" padding="lg">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-heading font-semibold text-gray-900">User Management</h3>
                <UberButton
                    variant="primary"
                    size="md"
                    icon={<Plus className="h-5 w-5" />}
                    onClick={() => setIsAddUserModalOpen(true)}
                >
                    Add User
                </UberButton>
            </div>
            <div className="space-y-6">
                {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                                <User className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <p className="text-body font-semibold text-gray-900">{user.name}</p>
                                <p className="text-caption text-gray-600">{user.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <UberBadge variant="success" size="md">
                                {user.status}
                            </UberBadge>
                            <UberButton variant="outline" size="sm">
                                Edit
                            </UberButton>
                        </div>
                    </div>
                ))}
            </div>
        </UberCard>
    </div>
);

export default AdminDashboardUsers; 