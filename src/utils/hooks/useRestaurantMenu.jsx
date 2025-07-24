import { useEffect, useState } from "react";
import { CARD_API, MENU_URL } from "../constants";
// customHook
function useRestaurantMenu(resId) {
  const [resMenu, setResMenu] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_URL + resId);

    const json = await data.json();
  
    setResMenu(json.data);
   
  };
  return resMenu;
}

export const useCardAPI = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [resData,setResData] = useState([])
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(CARD_API);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
     
      setResData(data);
      setData(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
      setFilteredData(
        data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return { data, filteredData, setFilteredData ,resData};
};
export default useRestaurantMenu;
