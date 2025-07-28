import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export interface Notification {
    id: number;
    type: 'success' | 'warning' | 'info';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}

interface NotificationsWidgetProps {
    notifications: Notification[];
    loading?: boolean;
}

const NotificationsWidget: React.FC<NotificationsWidgetProps> = ({ notifications, loading = false }) => {
    // Ensure notifications is always an array
    const safeNotifications = Array.isArray(notifications) ? notifications : [];

    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="h-5 w-5 text-green-500" />;
            case 'warning':
                return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
            case 'info':
                return <Info className="h-5 w-5 text-blue-500" />;
            default:
                return <Bell className="h-5 w-5 text-gray-500" />;
        }
    };

    const getTypeStyles = (type: Notification['type']) => {
        switch (type) {
            case 'success':
                return 'border-l-green-500 bg-green-50';
            case 'warning':
                return 'border-l-yellow-500 bg-yellow-50';
            case 'info':
                return 'border-l-blue-500 bg-blue-50';
            default:
                return 'border-l-gray-500 bg-gray-50';
        }
    };

    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8">Loading notifications...</div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <h2 className="text-xl font-semibold text-gray-900">Recent Notifications</h2>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {safeNotifications.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            <Bell className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                            <p>No notifications yet</p>
                        </div>
                    ) : (
                        safeNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`p-4 rounded-lg border-l-4 ${getTypeStyles(notification.type)} ${!notification.read ? 'ring-2 ring-blue-200' : ''
                                    }`}
                            >
                                <div className="flex items-start space-x-3">
                                    {getIcon(notification.type)}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                                        <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default NotificationsWidget; 