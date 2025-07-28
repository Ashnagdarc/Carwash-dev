import React, { useState, useEffect } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon } from 'lucide-react';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

const AuthForm: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [form, setForm] = useState(initialState);
    const { user, loading, error, login, clearError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (error) {
            clearError();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isSignUp) {
            // For now, just show an error since signup is not implemented
            alert('Sign up functionality is not implemented yet. Please use the test credentials to log in.');
            return;
        } else {
            await login(form.email, form.password);
        }
    };

    const handleToggle = () => {
        setIsSignUp((prev) => !prev);
        setForm(initialState);
        clearError();
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-black flex-col">
            <Link
                to="/"
                className="mb-6 text-gray-400 hover:text-blue-400 transition-colors text-sm font-medium flex items-center gap-1"
                tabIndex={0}
            >
                <span className="text-lg">←</span> Back to Home
            </Link>
            <div className="w-full max-w-md rounded-3xl bg-[#181A20] p-10 shadow-2xl">
                <div className="mb-8">
                    <div className="text-xs font-semibold text-gray-400 tracking-widest mb-2">START FOR FREE</div>
                    <h2 className="text-4xl font-extrabold text-white flex items-center gap-2">
                        {isSignUp ? 'Create new account' : 'Welcome back'}
                        <span className="text-blue-400 text-5xl leading-none">.</span>
                    </h2>
                    <div className="mt-2 text-sm text-gray-400">
                        {isSignUp ? (
                            <>
                                Already A Member?{' '}
                                <button
                                    type="button"
                                    className="text-blue-400 hover:underline font-medium"
                                    onClick={handleToggle}
                                    disabled={loading}
                                >
                                    Log In
                                </button>
                            </>
                        ) : (
                            <>
                                New here?{' '}
                                <button
                                    type="button"
                                    className="text-blue-400 hover:underline font-medium"
                                    onClick={handleToggle}
                                    disabled={loading}
                                >
                                    Sign Up
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* Test Credentials Info */}
                {!isSignUp && (
                    <div className="mb-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                        <h3 className="text-blue-400 font-semibold mb-2">Test Credentials:</h3>
                        <div className="text-sm text-gray-300 space-y-1">
                            <div><strong>Admin:</strong> admin@carwash.com / admin123</div>
                            <div><strong>User:</strong> user@example.com / user123</div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    {isSignUp && (
                        <div className="flex gap-4">
                            <Input
                                name="firstName"
                                placeholder="First name"
                                value={form.firstName}
                                onChange={handleChange}
                                autoComplete="given-name"
                                required
                                disabled={loading}
                                icon={<UserIcon className="w-4 h-4" />}
                                className="bg-[#23262F] text-white border-none focus:ring-2 focus:ring-blue-400"
                            />
                            <Input
                                name="lastName"
                                placeholder="Last name"
                                value={form.lastName}
                                onChange={handleChange}
                                autoComplete="family-name"
                                required
                                disabled={loading}
                                icon={<UserIcon className="w-4 h-4" />}
                                className="bg-[#23262F] text-white border-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                    )}
                    <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                        disabled={loading}
                        icon={<Mail className="w-4 h-4" />}
                        className="bg-[#23262F] text-white border-none focus:ring-2 focus:ring-blue-400"
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete={isSignUp ? 'new-password' : 'current-password'}
                        required
                        disabled={loading}
                        icon={<Lock className="w-4 h-4" />}
                        className="bg-[#23262F] text-white border-none focus:ring-2 focus:ring-blue-400"
                    />
                    {error && (
                        <div className="text-red-400 text-sm font-medium text-center">{error}</div>
                    )}
                    <div className="flex gap-4 mt-2">
                        <Button
                            type="button"
                            variant="secondary"
                            className="w-1/2 bg-[#23262F] text-white border-none hover:bg-gray-700"
                            onClick={handleToggle}
                            disabled={loading}
                        >
                            Change method
                        </Button>
                        <Button
                            type="submit"
                            className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-bold"
                            disabled={loading}
                        >
                            {loading ? (isSignUp ? 'Creating account...' : 'Logging in...') : isSignUp ? 'Create account' : 'Log in'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm; 