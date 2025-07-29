import { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { useIsMobile } from '@/hooks/use-mobile';

const Map = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const isMobile = useIsMobile();

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize map only on client-side
  useEffect(() => {
    if (!isClient || !mapContainer.current || map) return;

    // Dynamically import Leaflet
    import('leaflet').then((L) => {
      // Set default icon
      const DefaultIcon = new L.Icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      // Create map instance with disabled interactions on mobile
      const mapInstance = L.map(mapContainer.current, {
        scrollWheelZoom: false, // Disable scroll wheel zoom by default
        zoomControl: !isMobile, // Only show zoom control on desktop
        doubleClickZoom: !isMobile, // Disable double click zoom on mobile
        dragging: !isMobile, // Disable dragging on mobile
        touchZoom: !isMobile, // Disable pinch-to-zoom on mobile
        // tap: !isMobile, // tap is not a valid MapOption in Leaflet
        minZoom: 13, // Minimum zoom level
        maxZoom: 19, // Maximum zoom level
        boxZoom: !isMobile, // Disable box zoom on mobile
        keyboard: !isMobile, // Disable keyboard navigation on mobile
      }).setView([-6.333966996883769, 107.13328692441405], 15);
      
      // Add CSS class for mobile
      if (isMobile) {
        mapContainer.current.classList.add('pointer-events-none');
      }
      
      // Set view with bounds to prevent zooming out too far
      const bounds = L.latLngBounds(
        L.latLng(-6.4, 107.0), // Southwest corner
        L.latLng(-6.2, 107.3)  // Northeast corner
      );
      mapInstance.setMaxBounds(bounds);
      mapInstance.on('drag', function() {
        mapInstance.panInsideBounds(bounds, { animate: false });
      });

      // Add tile layer with hidden attribution
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 19,
      }).addTo(mapInstance);
      
      // Hide Leaflet attribution container
      const attribution = document.querySelector('.leaflet-control-attribution');
      if (attribution) {
        (attribution as HTMLElement).style.display = 'none';
      }

      // Add custom zoom control
      L.control.zoom({
        position: 'topright',
        zoomInTitle: 'Zoom in',
        zoomOutTitle: 'Zoom out'
      }).addTo(mapInstance);

      // Enable zoom with Ctrl + Scroll
      mapInstance.on('keydown', (e) => {
        if (e.originalEvent.ctrlKey) {
          mapInstance.scrollWheelZoom.enable();
        }
      });

      mapInstance.on('keyup', () => {
        mapInstance.scrollWheelZoom.disable();
      });

      // Disable scroll wheel zoom when mouse leaves the map
      mapInstance.getContainer().addEventListener('mouseleave', () => {
        mapInstance.scrollWheelZoom.disable();
      });

      // Add marker with the custom icon
      L.marker([-6.333966996883769, 107.13328692441405], { icon: DefaultIcon })
        .addTo(mapInstance)
        .bindPopup('<b>Politeknik META Industri Cikarang</b>')
        .openPopup();

      setMap(mapInstance);

      // Cleanup
      return () => {
        if (mapInstance) {
          mapInstance.remove();
        }
      };
    });
  }, [isClient, map]);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapContainer} 
        className="w-full h-full"
      />
      {isMobile && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 pointer-events-none">
          <div className="bg-white px-4 py-2 rounded-lg shadow-lg text-center">
            <p className="text-sm text-gray-700">Gunakan ponsel dalam mode landscape untuk interaksi peta</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Map;
