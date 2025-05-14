import { useState, useEffect } from 'react';
import axios from 'axios';

export const useMap = (address) => {
  const [coordinates, setCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!address) return;

    const fetchCoordinates = async () => {
      setLoading(true);
      try {
    
        const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
        
        if (response.data && response.data.length > 0) {
          const { lat, lon } = response.data[0];
          setCoordinates([parseFloat(lat), parseFloat(lon)]);
        } else {
          // Fallback to random coordinates if no results
          setCoordinates([
            51.505 + (Math.random() - 0.5) * 0.1,
            -0.09 + (Math.random() - 0.5) * 0.1
          ]);
        }
      } catch (err) {
        setError(err.message);
        console.error('Geocoding error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoordinates();
  }, [address]);

  return { coordinates, loading, error };
};