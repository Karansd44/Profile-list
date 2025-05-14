"use client";

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from "framer-motion";
const MapView = ({ location, address }) => {
  const mapRef = useRef(null);
  
  // Custom marker icon
  const customIcon = new L.Icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });

  useEffect(() => {
    if (mapRef.current && location) {
      mapRef.current.flyTo(location, 15, {
        duration: 1
      });
    }
  }, [location]);

  if (!location) return <div className="map-placeholder">Select a profile to view location</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="map-container"
    >
      <MapContainer
        center={location}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', borderRadius: '15px' }}
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={location} icon={customIcon}>
          <Popup>
            <div className="map-popup">
              <h4>{address.name}</h4>
              <p>{address.street}</p>
              <p>{address.city}, {address.country}</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </motion.div>
  );
};

export default MapView;