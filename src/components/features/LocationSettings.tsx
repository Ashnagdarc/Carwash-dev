import React, { useState, useEffect } from 'react';
import { useLocation } from '../../contexts/LocationContext';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Card } from '../ui/Card';
import { MapPin, Navigation, Clock, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const LocationSettings: React.FC = () => {
  const { user } = useAuth();
  const { userLocation, setUserLocation, getCurrentLocation, geocodeAddress, loading, error } = useLocation();
  
  const [address, setAddress] = useState(userLocation?.address || '');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    if (userLocation?.address) {
      setAddress(userLocation.address);
    }
  }, [userLocation]);

  const handleUseCurrentLocation = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    setUpdateStatus('idle');
    setStatusMessage('Getting your current location...');

    try {
      const coords = await getCurrentLocation();
      
      // Reverse geocode to get address
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      const fullAddress = data.display_name || `${coords.latitude}, ${coords.longitude}`;
      
      setAddress(fullAddress);
      
      // Update location
      setUserLocation({
        userId: user.id.toString(),
        userName: user.name,
        userRole: user.role,
        latitude: coords.latitude,
        longitude: coords.longitude,
        address: fullAddress,
        isActive: true
      });

      setUpdateStatus('success');
      setStatusMessage('Location updated successfully!');
      
      setTimeout(() => {
        setUpdateStatus('idle');
        setStatusMessage('');
      }, 3000);

    } catch (error) {
      setUpdateStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Failed to get location');
      
      setTimeout(() => {
        setUpdateStatus('idle');
        setStatusMessage('');
      }, 5000);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleUpdateAddress = async () => {
    if (!user || !address.trim()) return;
    
    setIsUpdating(true);
    setUpdateStatus('idle');
    setStatusMessage('Updating location...');

    try {
      const coords = await geocodeAddress(address);
      
      setUserLocation({
        userId: user.id.toString(),
        userName: user.name,
        userRole: user.role,
        latitude: coords.latitude,
        longitude: coords.longitude,
        address: address.trim(),
        isActive: true
      });

      setUpdateStatus('success');
      setStatusMessage('Location updated successfully!');
      
      setTimeout(() => {
        setUpdateStatus('idle');
        setStatusMessage('');
      }, 3000);

    } catch (error) {
      setUpdateStatus('error');
      setStatusMessage(error instanceof Error ? error.message : 'Failed to update location');
      
      setTimeout(() => {
        setUpdateStatus('idle');
        setStatusMessage('');
      }, 5000);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusIcon = () => {
    switch (updateStatus) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (updateStatus) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
          <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Service Location</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Set your default service location</p>
        </div>
      </div>

      {/* Current Location Display */}
      {userLocation && (
        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
              <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">Current Location</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{userLocation.address}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500 dark:text-gray-400">
                <span>Lat: {userLocation.latitude.toFixed(6)}</span>
                <span>Lng: {userLocation.longitude.toFixed(6)}</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Updated {userLocation.lastUpdated.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Location Update Form */}
      <div className="space-y-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Service Address
          </label>
          <Input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your service address (e.g., 123 Main Street, Lagos)"
            className="w-full"
            disabled={isUpdating}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleUpdateAddress}
            disabled={isUpdating || !address.trim()}
            className="flex-1"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Updating...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Update Location
              </>
            )}
          </Button>

          <Button
            onClick={handleUseCurrentLocation}
            disabled={isUpdating}
            variant="outline"
            className="flex-1"
          >
            {isUpdating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Getting Location...
              </>
            ) : (
              <>
                <Navigation className="h-4 w-4 mr-2" />
                Use Current Location
              </>
            )}
          </Button>
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`flex items-center space-x-2 p-3 rounded-lg ${updateStatus === 'success' ? 'bg-green-50 dark:bg-green-900/20' : updateStatus === 'error' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-blue-50 dark:bg-blue-900/20'}`}>
            {getStatusIcon()}
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {statusMessage}
            </span>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-sm text-red-600 dark:text-red-400">{error}</span>
          </div>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">How it works:</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Set your default service location for car wash bookings</li>
          <li>• Use "Current Location" to automatically detect your position</li>
          <li>• Enter an address manually for precise location setting</li>
          <li>• Your location will be shared with service providers</li>
        </ul>
      </div>
    </Card>
  );
};

export default LocationSettings; 