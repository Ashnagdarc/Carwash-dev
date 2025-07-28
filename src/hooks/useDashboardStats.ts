import { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, Car, CreditCard, TrendingUp } from 'lucide-react';
import { Stat } from '../components/dashboard/StatsGrid';

export function useDashboardStats() {
    const [stats, setStats] = useState<Stat[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                setError(null);

                // Try to fetch from real API first
                const response = await axios.get('/api/dashboard-stats');
                setStats(response.data);
            } catch (err) {
                console.log('API not available, using mock data');
                // Fallback to mock data for development
                setStats([
                    { label: 'Total Bookings', value: '12', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Active Vehicles', value: '3', icon: Car, color: 'text-green-600', bg: 'bg-green-50' },
                    { label: 'Total Spent', value: '₦45,000', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-50' },
                    { label: 'Loyalty Points', value: '850', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50' }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return { stats, loading, error };
} 