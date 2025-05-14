export const geocodeAddress = async (address) => {
  // In a real application, you would use a proper geocoding service
  // This is a mock implementation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        lat: 51.505 + (Math.random() - 0.5) * 0.1,
        lng: -0.09 + (Math.random() - 0.5) * 0.1
      });
    }, 500);
  });
};

export const getMapPreview = (lat, lng) => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
};