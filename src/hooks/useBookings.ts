import { useState, useEffect } from 'react';
import axios from 'axios';
import { Booking } from '../components/dashboard/RecentBookings';

export function useBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                setLoading(true);
                setError(null);

                // Try to fetch from real API first
                const response = await axios.get('/api/bookings');
                setBookings(response.data);
            } catch (err) {
                console.log('API not available, using mock data');
                // Fallback to mock data for development
                setBookings([
                    { id: 1, service: 'Premium Wash', car: '2022 Toyota Camry', date: '2024-01-15', status: 'Completed', amount: '₦8,500' },
                    { id: 2, service: 'Deluxe Detail', car: '2021 Honda Accord', date: '2024-01-10', status: 'In Progress', amount: '₦15,000' },
                    { id: 3, service: 'Basic Wash', car: '2023 Nissan Altima', date: '2024-01-05', status: 'Completed', amount: '₦5,000' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    return { bookings, loading, error };
} 