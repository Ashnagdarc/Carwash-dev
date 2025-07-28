import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Car, Moon, Sun, User, Settings, BarChart3, Calendar, Users, Package, Activity, TrendingUp, Clock, MapPin } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activityDropdownOpen, setActivityDropdownOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const activityDropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isDashboard = location.pathname.includes('/dashboard');

  // Handle clicking outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activityDropdownRef.current && !activityDropdownRef.current.contains(event.target as Node)) {
        setActivityDropdownOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate('/auth');
  };

  const handleViewAllActivity = () => {
    setActivityDropdownOpen(false);
    navigate('/activity');
  };

  // Define navigation items based on context
  const dashboardNavItems = user?.role === 'admin' ? [
    { href: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
    { href: '/admin/dashboard?tab=analytics', label: 'Analytics', icon: TrendingUp },
    { href: '/admin/dashboard?tab=users', label: 'Users', icon: Users },
    { href: '/admin/dashboard?tab=settings', label: 'Settings', icon: Settings }
  ] : [
    { href: '/user/dashboard', label: 'My Dashboard', icon: BarChart3 },
    { href: '/user/dashboard?tab=bookings', label: 'My Bookings', icon: Calendar },
    { href: '/user/dashboard?tab=vehicles', label: 'My Vehicles', icon: Car },
    { href: '/user/dashboard?tab=profile', label: 'Profile', icon: User }
  ];

  const siteNavItems = [
    { href: '/#services', label: 'Services', icon: undefined },
    { href: '/#about', label: 'About', icon: undefined },
    { href: '/#contact', label: 'Contact', icon: undefined }
  ];

  // Use appropriate navigation items based on current route
  const navItems = isDashboard ? dashboardNavItems : siteNavItems;

  const recentActivities = [
    {
      id: 1,
      type: 'booking',
      title: 'New booking created',
      description: 'Premium wash scheduled for tomorrow',
      time: '2 minutes ago',
      icon: Car,
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'service',
      title: 'Service completed',
      description: 'Basic wash finished for Toyota Camry',
      time: '15 minutes ago',
      icon: Clock,
      color: 'text-green-600'
    },
    {
      id: 3,
      type: 'location',
      title: 'Location updated',
      description: 'Service location changed to downtown',
      time: '1 hour ago',
      icon: MapPin,
      color: 'text-purple-600'
    },
    {
      id: 4,
      type: 'analytics',
      title: 'Performance update',
      description: 'Customer satisfaction increased by 15%',
      time: '2 hours ago',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Brand and Service Categories */}
          <div className="flex items-center space-x-8">
            {/* Brand Name */}
            <div className="flex items-center space-x-2 select-none">
              <Car className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">Carwash</span>
            </div>

            {/* Service Categories - Only show on dashboard */}
            {isDashboard && (
              <div className="hidden md:flex items-center space-x-8">
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white font-medium text-base">
                  <Car className="h-4 w-4" />
                  <span>Service</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center space-x-4">
            {/* Activity Button - Only show on dashboard */}
            {isDashboard && (
              <div className="relative">
                <button
                  onClick={() => setActivityDropdownOpen(!activityDropdownOpen)}
                  className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full font-medium text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Activity className="h-4 w-4" />
                  <span>Activity</span>
                </button>

                {/* Activity Dropdown */}
                {activityDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50" ref={activityDropdownRef}>
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Your latest updates</p>
                        </div>
                      </div>
                    </div>

                    {/* Activities List */}
                    <div className="max-h-64 overflow-y-auto">
                      <div className="space-y-1">
                        {recentActivities.map((activity) => {
                          const IconComponent = activity.icon;
                          return (
                            <div
                              key={activity.id}
                              className="flex items-start space-x-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                            >
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 flex-shrink-0`}>
                                <IconComponent className={`h-3 w-3 ${activity.color}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                  {activity.title}
                                </h4>
                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                  {activity.description}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                                  {activity.time}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                      <button
                        onClick={handleViewAllActivity}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <Activity className="h-4 w-4" />
                        <span>View All Activity</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Theme Toggle */}
            <button
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* User Profile / Sign In */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    aria-label="Profile menu"
                    onClick={() => setProfileOpen((v) => !v)}
                    className="flex items-center space-x-2 p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </div>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50" ref={profileDropdownRef}>
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="px-4 py-2">
                        <div className="grid grid-cols-3 gap-2">
                          <button className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-1">
                              <Activity className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">Help</span>
                          </button>
                          <button className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-1">
                              <Package className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">Wallet</span>
                          </button>
                          <button
                            onClick={() => {
                              setActivityDropdownOpen(true);
                              setProfileOpen(false);
                            }}
                            className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                          >
                            <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mb-1">
                              <BarChart3 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-xs text-gray-600 dark:text-gray-400">Activity</span>
                          </button>
                        </div>
                      </div>

                      {/* Account Options */}
                      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                        <button className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition">
                          Manage account
                        </button>
                        <button className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition">
                          Promotions
                        </button>
                      </div>

                      {/* Sign Out */}
                      <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => navigate('/auth')}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  <User className="h-5 w-5" />
                  <span className="hidden md:block">Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Open menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4" ref={mobileMenuRef}>
            {isDashboard && (
              <div className="flex space-x-4 mb-4">
                <button className="flex items-center space-x-2 px-3 py-2 text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white font-medium text-base">
                  <Car className="h-4 w-4" />
                  <span>Service</span>
                </button>
              </div>
            )}

            <div className="space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition text-base"
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                  {item.label}
                </a>
              ))}

              {/* User-specific mobile menu items */}
              {user ? (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <div className="px-4 py-3">
                      <p className="text-base font-medium text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActivityDropdownOpen(true);
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition text-base"
                    >
                      <Activity className="h-5 w-5 mr-3" />
                      Activity
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition text-base"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <button
                    onClick={() => {
                      navigate('/auth');
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition text-base"
                  >
                    <User className="h-5 w-5 mr-3" />
                    Sign In
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}