import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    switchRole: (newRole: 'admin' | 'user') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    // Start with no user logged in - require proper authentication
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock login logic - in real app, this would be an API call
            if (email === 'admin@carwash.com' && password === 'admin123') {
                setUser({ id: 1, name: 'Admin User', email: 'admin@carwash.com', role: 'admin' });
            } else if (email === 'user@example.com' && password === 'user123') {
                setUser({ id: 2, name: 'John Doe', email: 'user@example.com', role: 'user' });
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Login failed');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setError(null);
    };

    const clearError = () => {
        setError(null);
    };

    const switchRole = (newRole: 'admin' | 'user') => {
        if (user) {
            setUser({ ...user, role: newRole });
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            login,
            logout,
            clearError,
            switchRole
        }}>
            {children}
        </AuthContext.Provider>
    );
}; 