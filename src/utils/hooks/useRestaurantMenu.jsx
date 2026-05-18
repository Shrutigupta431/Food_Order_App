import { useEffect, useState } from "react";
import { CARD_API, getCardAPI, MENU_URL } from "../constants";
import { useSearchParams } from "react-router-dom";
import { useLocation } from "../context/LocationContext";
const DEFAULT_COORDS = {
  lat: 28.6328027,
  lng: 77.2197713,
};



export const useCardAPI = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [title, setTitle] = useState("");
  const [offset, setOffset] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
    const[resData,setResData] = useState([])
 
  const { coords } = useLocation();
  const lat = coords?.lat || DEFAULT_COORDS.lat;
  const lng = coords?.lng || DEFAULT_COORDS.lng;

  useEffect(() => {
    fetchData(lat, lng, offset);
  }, [lat, lng, offset]);

  const fetchData = async (lat, lng, offset) => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&offset=${offset}`
      );
      const json = await response.json();
      setResData(json);

      console.log("resData",resData)
      const extractedTitle =
        json?.data?.cards?.[1]?.card?.card?.header?.title ||
        "Top Restaurants Chains";
      setTitle(extractedTitle);

      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setData(restaurants);
      setFilteredData(restaurants);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsFetching(false);
  };

  const loadMore = () => {
    setOffset((prev) => prev + 16); // or 20 based on Swiggy's page size
  };

  return { data, title, filteredData, setFilteredData, loadMore,resData };
};

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
export const useHeroCardAPI = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [resData, setResData] = useState([]);

  // Extract query params
  const collection = searchParams.get("collection_id");
  const tags = searchParams.get("tags");
  const type = searchParams.get("type");
  const { coords } = useLocation();

  useEffect(() => {
    if (collection && tags && type) {
      const lat = coords?.lat || DEFAULT_COORDS.lat;
      const lng = coords?.lng || DEFAULT_COORDS.lng;
      fetchData(lat, lng);
    }
  }, [coords]);

  const fetchData = async (lat, lng) => {
    const API_URL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&collection=${collection}&tags=${encodeURIComponent(
      tags
    )}&sortBy=&filters=&type=${type}&offset=24&page_type=null`;

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      const restaurants =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setResData(json);
      setData(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return { data, resData };
};

export default useRestaurantMenu;
