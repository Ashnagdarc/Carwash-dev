import React, { useState, useEffect } from 'react';
import UberInput from '../ui/UberInput';
import UberButton from '../ui/UberButton';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User as UserIcon, ArrowLeft } from 'lucide-react';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
};

const AuthForm: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [form, setForm] = useState(initialState);
    const { user, login, loading, error, clearError } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const handleChange = (name: string, value: string) => {
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
            try {
                await login(form.email, form.password);
                // Redirect to dashboard after successful login
                navigate('/dashboard');
            } catch (error) {
                // Error is already handled by the login function
                console.error('Login failed:', error);
            }
        }
    };

    const handleToggle = () => {
        setIsSignUp((prev) => !prev);
        setForm(initialState);
        clearError();
    };

    return (
        <div className="min-h-screen bg-white font-uber flex items-center justify-center flex-col">
            <Link
                to="/"
                className="mb-8 text-body text-gray-600 hover:text-gray-900 transition-colors font-medium flex items-center space-x-2"
                tabIndex={0}
            >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
            </Link>

            <div className="w-full max-w-md">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
                    <div className="mb-8">
                        <div className="text-caption font-semibold text-gray-500 tracking-wider mb-3">START FOR FREE</div>
                        <h2 className="text-heading font-bold text-gray-900 flex items-center gap-2 mb-2">
                            {isSignUp ? 'Create new account' : 'Welcome back'}
                            <span className="text-blue-500 text-display leading-none">.</span>
                        </h2>
                        <div className="text-body text-gray-600">
                            {isSignUp ? (
                                <>
                                    Already A Member?{' '}
                                    <button
                                        type="button"
                                        className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
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
                                        className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
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
                        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                            <h3 className="text-subheading font-semibold text-blue-900 mb-2">Test Credentials:</h3>
                            <div className="text-body text-blue-800 space-y-1">
                                <div><strong>Admin:</strong> admin@carwash.com / admin123</div>
                                <div><strong>User:</strong> user@example.com / user123</div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {isSignUp && (
                            <div className="grid grid-cols-2 gap-4">
                                <UberInput
                                    label="First Name"
                                    placeholder="Enter first name"
                                    value={form.firstName}
                                    onChange={(value) => handleChange('firstName', value)}
                                    icon={<UserIcon className="w-4 h-4" />}
                                    required
                                    disabled={loading}
                                />
                                <UberInput
                                    label="Last Name"
                                    placeholder="Enter last name"
                                    value={form.lastName}
                                    onChange={(value) => handleChange('lastName', value)}
                                    icon={<UserIcon className="w-4 h-4" />}
                                    required
                                    disabled={loading}
                                />
                            </div>
                        )}

                        <UberInput
                            label="Email Address"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={(value) => handleChange('email', value)}
                            icon={<Mail className="w-4 h-4" />}
                            required
                            disabled={loading}
                        />

                        <UberInput
                            label="Password"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={(value) => handleChange('password', value)}
                            icon={<Lock className="w-4 h-4" />}
                            required
                            disabled={loading}
                        />

                        {error && (
                            <div className="text-caption text-red-600 font-medium text-center p-3 bg-red-50 border border-red-200 rounded-xl">
                                {error}
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            <UberButton
                                type="button"
                                variant="outline"
                                size="md"
                                onClick={handleToggle}
                                disabled={loading}
                                className="flex-1"
                            >
                                Change method
                            </UberButton>
                            <UberButton
                                type="submit"
                                variant="primary"
                                size="md"
                                disabled={loading}
                                className="flex-1"
                            >
                                {loading ? (isSignUp ? 'Creating account...' : 'Logging in...') : isSignUp ? 'Create account' : 'Log in'}
                            </UberButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthForm; 