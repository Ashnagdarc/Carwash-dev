import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { UserLocation } from '../../contexts/LocationContext';
import { Car, MapPin } from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationMapProps {
  locations: UserLocation[];
  center?: { lat: number; lng: number };
  zoom?: number;
  height?: string;
  showUserPins?: boolean;
  showServiceLocation?: boolean;
  serviceLocation?: { lat: number; lng: number; address: string };
  onLocationClick?: (location: UserLocation) => void;
  className?: string;
}

const LocationMap: React.FC<LocationMapProps> = ({
  locations,
  center = { lat: 6.5244, lng: 3.3792 }, // Lagos, Nigeria
  zoom = 12,
  height = '400px',
  showUserPins = true,
  showServiceLocation = false,
  serviceLocation,
  onLocationClick,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current).setView([center.lat, center.lng], zoom);
    mapInstanceRef.current = map;

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center.lat, center.lng, zoom]);

  // Update markers when locations change
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add user location markers
    if (showUserPins) {
      locations.forEach(location => {
        // Create custom icon based on user role
        const icon = L.divIcon({
          className: 'custom-marker',
          html: `
            <div class="marker-container">
              <div class="marker-icon ${location.userRole === 'admin' ? 'admin-marker' : 'user-marker'}">
                ${location.userRole === 'admin' ? 
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>' :
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/></svg>'
                }
              </div>
              <div class="marker-label">${location.userName}</div>
            </div>
          `,
          iconSize: [40, 40],
          iconAnchor: [20, 40],
          popupAnchor: [0, -40]
        });

        const marker = L.marker([location.latitude, location.longitude], { icon })
          .addTo(map)
          .bindPopup(`
            <div class="marker-popup">
              <h3>${location.userName}</h3>
              <p><strong>Role:</strong> ${location.userRole}</p>
              <p><strong>Address:</strong> ${location.address}</p>
              <p><strong>Last Updated:</strong> ${location.lastUpdated.toLocaleTimeString()}</p>
              <p><strong>Status:</strong> <span class="status-${location.isActive ? 'active' : 'inactive'}">${location.isActive ? 'Active' : 'Inactive'}</span></p>
            </div>
          `);

        if (onLocationClick) {
          marker.on('click', () => onLocationClick(location));
        }

        markersRef.current.push(marker);
      });
    }

    // Add service location marker
    if (showServiceLocation && serviceLocation) {
      const serviceIcon = L.divIcon({
        className: 'custom-marker',
        html: `
          <div class="marker-container">
            <div class="marker-icon service-marker">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="marker-label">Service Location</div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40]
      });

      const serviceMarker = L.marker([serviceLocation.lat, serviceLocation.lng], { icon: serviceIcon })
        .addTo(map)
        .bindPopup(`
          <div class="marker-popup">
            <h3>Service Location</h3>
            <p><strong>Address:</strong> ${serviceLocation.address}</p>
          </div>
        `);

      markersRef.current.push(serviceMarker);
    }

    // Fit map to show all markers
    if (markersRef.current.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.1));
    }

  }, [locations, showUserPins, showServiceLocation, serviceLocation, onLocationClick]);

  return (
    <div className={`location-map ${className}`} style={{ height }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      
      {/* Custom CSS for markers */}
      <style jsx>{`
        .location-map {
          border-radius: 8px;
          overflow: hidden;
        }
        
        .custom-marker {
          background: none !important;
          border: none !important;
        }
        
        .marker-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .marker-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
        
        .admin-marker {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .user-marker {
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        }
        
        .service-marker {
          background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        }
        
        .marker-label {
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          margin-top: 2px;
          white-space: nowrap;
        }
        
        .marker-popup {
          text-align: center;
        }
        
        .marker-popup h3 {
          margin: 0 0 8px 0;
          color: #333;
        }
        
        .marker-popup p {
          margin: 4px 0;
          font-size: 12px;
        }
        
        .status-active {
          color: #10b981;
          font-weight: bold;
        }
        
        .status-inactive {
          color: #ef4444;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default LocationMap; 