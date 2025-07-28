import React, { useState, useEffect } from 'react';
import { useLocation } from '../../contexts/LocationContext';
import { Card } from '../ui/Card';
import LocationMap from './LocationMap';
import { MapPin, Users, Clock, Activity, Car, Filter } from 'lucide-react';

const AdminLocationDashboard: React.FC = () => {
  const { allUserLocations, loading, error } = useLocation();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 6.5244, lng: 3.3792 }); // Lagos

  // Filter locations based on selected filter
  const filteredLocations = allUserLocations.filter(location => {
    if (selectedFilter === 'active') return location.isActive;
    if (selectedFilter === 'inactive') return !location.isActive;
    return true;
  });

  // Get statistics
  const stats = {
    total: allUserLocations.length,
    active: allUserLocations.filter(loc => loc.isActive).length,
    inactive: allUserLocations.filter(loc => !loc.isActive).length,
    users: allUserLocations.filter(loc => loc.userRole === 'user').length,
    admins: allUserLocations.filter(loc => loc.userRole === 'admin').length
  };

  // Handle location click
  const handleLocationClick = (location: any) => {
    setSelectedUser(location.userId);
    setMapCenter({ lat: location.latitude, lng: location.longitude });
  };

  // Auto-center map when locations change
  useEffect(() => {
    if (filteredLocations.length > 0) {
      const bounds = filteredLocations.reduce((acc, loc) => {
        return {
          minLat: Math.min(acc.minLat, loc.latitude),
          maxLat: Math.max(acc.maxLat, loc.latitude),
          minLng: Math.min(acc.minLng, loc.longitude),
          maxLng: Math.max(acc.maxLng, loc.longitude)
        };
      }, {
        minLat: 90, maxLat: -90, minLng: 180, maxLng: -180
      });

      const centerLat = (bounds.minLat + bounds.maxLat) / 2;
      const centerLng = (bounds.minLng + bounds.maxLng) / 2;
      setMapCenter({ lat: centerLat, lng: centerLng });
    }
  }, [filteredLocations]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Service Locations</h2>
          <p className="text-gray-600 dark:text-gray-400">Real-time tracking of all user locations</p>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-400" />
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Locations</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Activity className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
              <Clock className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Inactive Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.inactive}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Regular Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.users}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <Car className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.admins}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Map */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-gray-500" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Filters</h3>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'all'
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>All Users</span>
                  <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                    {stats.total}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setSelectedFilter('active')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'active'
                    ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Active Users</span>
                  <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                    {stats.active}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setSelectedFilter('inactive')}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedFilter === 'inactive'
                    ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>Inactive Users</span>
                  <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                    {stats.inactive}
                  </span>
                </div>
              </button>
            </div>
          </Card>

          {/* User List */}
          <Card className="p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredLocations.slice(0, 10).map((location) => (
                <div
                  key={location.id}
                  onClick={() => handleLocationClick(location)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedUser === location.userId
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      location.isActive ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {location.userName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {location.address}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {location.lastUpdated.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Map */}
        <div className="lg:col-span-3">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Live Map</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Admin</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span>User</span>
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading locations...</p>
                </div>
              </div>
            ) : error ? (
              <div className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-red-600 dark:text-red-400">{error}</p>
                </div>
              </div>
            ) : (
              <LocationMap
                locations={filteredLocations}
                center={mapCenter}
                height="500px"
                showUserPins={true}
                onLocationClick={handleLocationClick}
                className="rounded-lg"
              />
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLocationDashboard; 