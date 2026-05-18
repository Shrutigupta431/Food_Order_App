export const getLatLng = async (locationName) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${locationName}`
  );
  const data = await res.json();
  if (data.length > 0) {
    const { lat, lon } = data[0];
    return { lat, lng: lon };
  }
  return null;
};
