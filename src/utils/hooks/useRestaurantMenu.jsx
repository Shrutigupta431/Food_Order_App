import { useEffect, useState } from "react";
import { MENU_URL } from "../constants";

function useRestaurantMenu( resId ) {
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

export default useRestaurantMenu;
