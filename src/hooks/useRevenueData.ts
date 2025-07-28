import { useState, useEffect } from 'react';
import axios from 'axios';
import { RevenueData } from '../components/dashboard/RevenueChart';

export function useRevenueData() {
    const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRevenueData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Try to fetch from real API first
                const response = await axios.get('/api/revenue');
                setRevenueData(response.data);
            } catch (err) {
                console.log('API not available, using mock revenue data');
                // Fallback to mock data for development
                const mockData: RevenueData[] = [
                    { date: '2024-01-01', revenue: 12000 },
                    { date: '2024-01-02', revenue: 15000 },
                    { date: '2024-01-03', revenue: 18000 },
                    { date: '2024-01-04', revenue: 14000 },
                    { date: '2024-01-05', revenue: 22000 },
                    { date: '2024-01-06', revenue: 25000 },
                    { date: '2024-01-07', revenue: 28000 },
                    { date: '2024-01-08', revenue: 32000 },
                    { date: '2024-01-09', revenue: 29000 },
                    { date: '2024-01-10', revenue: 35000 },
                    { date: '2024-01-11', revenue: 38000 },
                    { date: '2024-01-12', revenue: 42000 },
                    { date: '2024-01-13', revenue: 45000 },
                    { date: '2024-01-14', revenue: 48000 },
                    { date: '2024-01-15', revenue: 52000 }
                ];
                setRevenueData(mockData);
            } finally {
                setLoading(false);
            }
        };

        fetchRevenueData();
    }, []);

    return { revenueData, loading, error };
} 