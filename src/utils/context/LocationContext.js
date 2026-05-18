import { createContext,useContext,useState } from "react";

const LocationContext = createContext();

export const useLocation = ()=> useContext(LocationContext);

export const LocationProvider =({children})=>{
     const [coords, setCoords] = useState(null);

  return (
    <LocationContext.Provider value={{ coords, setCoords }}>
      {children}
    </LocationContext.Provider>
  );
}
