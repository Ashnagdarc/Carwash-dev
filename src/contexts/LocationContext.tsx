import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface UserLocation {
    id: string;
    userId: string;
    userName: string;
    userRole: 'admin' | 'user';
    latitude: number;
    longitude: number;
    address: string;
    lastUpdated: Date;
    isActive: boolean;
}

interface LocationContextType {
    userLocation: UserLocation | null;
    allUserLocations: UserLocation[];
    loading: boolean;
    error: string | null;
    setUserLocation: (location: Omit<UserLocation, 'id' | 'lastUpdated'>) => void;
    updateUserLocation: (userId: string, location: Partial<UserLocation>) => void;
    getUserLocation: (userId: string) => UserLocation | undefined;
    getCurrentLocation: () => Promise<{ latitude: number; longitude: number }>;
    geocodeAddress: (address: string) => Promise<{ latitude: number; longitude: number }>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const useLocation = () => {
    const context = useContext(LocationContext);
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
};

export const LocationProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth();
    const [userLocation, setUserLocationState] = useState<UserLocation | null>(null);
    const [allUserLocations, setAllUserLocations] = useState<UserLocation[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Mock data for development (in real app, this would come from a database)
    const mockLocations: UserLocation[] = [
        {
            id: '1',
            userId: '1',
            userName: 'Admin User',
            userRole: 'admin',
            latitude: 6.5244,
            longitude: 3.3792,
            address: 'Victoria Island, Lagos',
            lastUpdated: new Date(),
            isActive: true
        },
        {
            id: '2',
            userId: '2',
            userName: 'John Doe',
            userRole: 'user',
            latitude: 6.6018,
            longitude: 3.3515,
            address: 'Ikeja, Lagos',
            lastUpdated: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
            isActive: true
        },
        {
            id: '3',
            userId: '3',
            userName: 'Sarah Johnson',
            userRole: 'user',
            latitude: 6.4531,
            longitude: 3.3958,
            address: 'Surulere, Lagos',
            lastUpdated: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
            isActive: true
        },
        {
            id: '4',
            userId: '4',
            userName: 'Mike Chen',
            userRole: 'user',
            latitude: 6.5244,
            longitude: 3.3792,
            address: 'Lekki, Lagos',
            lastUpdated: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
            isActive: true
        }
    ];

    // Initialize with mock data
    useEffect(() => {
        setAllUserLocations(mockLocations);

        // Set current user's location
        if (user) {
            const currentUserLocation = mockLocations.find(loc => loc.userId === user.id.toString());
            if (currentUserLocation) {
                setUserLocationState(currentUserLocation);
            }
        }
    }, [user]);

    // Get current location using browser's geolocation API
    const getCurrentLocation = (): Promise<{ latitude: number; longitude: number }> => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    });
                },
                (error) => {
                    reject(new Error(`Geolocation error: ${error.message}`));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 60000
                }
            );
        });
    };

    // Geocode address using free OpenStreetMap Nominatim API
    const geocodeAddress = async (address: string): Promise<{ latitude: number; longitude: number }> => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                return {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon)
                };
            } else {
                throw new Error('Address not found');
            }
        } catch (error) {
            throw new Error(`Geocoding error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    // Set user location
    const setUserLocation = (location: Omit<UserLocation, 'id' | 'lastUpdated'>) => {
        if (!user) return;

        const newLocation: UserLocation = {
            ...location,
            id: Date.now().toString(),
            lastUpdated: new Date()
        };

        setUserLocationState(newLocation);

        // Update in all locations list
        setAllUserLocations(prev => {
            const filtered = prev.filter(loc => loc.userId !== user.id.toString());
            return [...filtered, newLocation];
        });
    };

    // Update user location
    const updateUserLocation = (userId: string, location: Partial<UserLocation>) => {
        setAllUserLocations(prev =>
            prev.map(loc =>
                loc.userId === userId
                    ? { ...loc, ...location, lastUpdated: new Date() }
                    : loc
            )
        );

        // Update current user location if it's the current user
        if (user && userId === user.id.toString()) {
            setUserLocationState(prev =>
                prev ? { ...prev, ...location, lastUpdated: new Date() } : null
            );
        }
    };

    // Get specific user location
    const getUserLocation = (userId: string): UserLocation | undefined => {
        return allUserLocations.find(loc => loc.userId === userId);
    };

    // Simulate real-time updates (in real app, this would be WebSocket or Firebase)
    useEffect(() => {
        const interval = setInterval(() => {
            setAllUserLocations(prev =>
                prev.map(loc => ({
                    ...loc,
                    lastUpdated: new Date()
                }))
            );
        }, 30000); // Update every 30 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <LocationContext.Provider value={{
            userLocation,
            allUserLocations,
            loading,
            error,
            setUserLocation,
            updateUserLocation,
            getUserLocation,
            getCurrentLocation,
            geocodeAddress
        }}>
            {children}
        </LocationContext.Provider>
    );
}; 