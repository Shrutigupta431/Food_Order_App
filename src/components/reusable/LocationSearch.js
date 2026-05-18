import React, { useState } from "react";
import { getLatLng } from "../../utils/getLatLong";
import { useLocation } from "../../utils/context/LocationContext";
const LocationSearch = () => {
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setCoords } = useLocation(); 

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && location.trim()) {
      setLoading(true);
      setError("");

      const result = await getLatLng(location);

      if (result) {
        setCoords(result); // 🔥 stored in context
        console.log("Set global coords:", result);
      } else {
        setError("Location not found");
      }

      setLoading(false);
    }
  };

  return (
    <div className=" max-w-md mx-auto">
      <input
        type="text"
        placeholder="Bangalore"
        className="p-2 border rounded w-full"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LocationSearch;
