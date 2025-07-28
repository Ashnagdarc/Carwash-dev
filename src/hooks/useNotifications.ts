import { useState, useEffect } from 'react';
import axios from 'axios';
import { Notification } from '../components/dashboard/NotificationsWidget';

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true);
                setError(null);

                // Try to fetch from real API first
                const response = await axios.get('/api/notifications');
                setNotifications(response.data);
            } catch (err) {
                console.log('API not available, using mock notifications data');
                // Fallback to mock data for development
                const mockData: Notification[] = [
                    {
                        id: 1,
                        type: 'success',
                        title: 'Booking Completed',
                        message: 'Your Premium Wash service has been completed successfully.',
                        timestamp: '2 hours ago',
                        read: false
                    },
                    {
                        id: 2,
                        type: 'info',
                        title: 'New Service Available',
                        message: 'We\'ve added a new Deluxe Detail service to our offerings.',
                        timestamp: '1 day ago',
                        read: true
                    },
                    {
                        id: 3,
                        type: 'warning',
                        title: 'Payment Reminder',
                        message: 'Please complete your payment for the recent booking.',
                        timestamp: '2 days ago',
                        read: false
                    },
                    {
                        id: 4,
                        type: 'success',
                        title: 'Loyalty Points Earned',
                        message: 'You\'ve earned 50 loyalty points for your recent service.',
                        timestamp: '3 days ago',
                        read: true
                    }
                ];
                setNotifications(mockData);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return { notifications, loading, error };
} 