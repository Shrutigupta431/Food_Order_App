import React, { useEffect, useState } from "react";
import ShimmerUi from "./ShimmerUi";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/hooks/useRestaurantMenu";
import RestaurantCategories from "./RestaurantCategories";
function RestaurantMenu() {
  const [showIndex, setShowIndex] = useState(null);
  const { resId } = useParams();
  const resMenu = useRestaurantMenu(resId);

  // const handleClick =()=>{
  //     setShowItems(!showItems)
  // }

  // useEffect(()=>{
  //     fetchMenu();
  // },[]);

  // const fetchMenu = async ()=>{
  //     const data = await fetch(MENU_URL + resId);

  //     const json = await data.json();

  //     // console.log(json?.data?.cards[2]?.card?.card?.info)
  //     // console.log(json.data)
  //     setResMenu(json.data)
  //     // console.log(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3].card.card.itemCards)
  // }
  if (resMenu === null) return <ShimmerUi />;

  const { name, cuisines, costForTwoMessage } =
    resMenu.cards[2]?.card?.card?.info;

  const categories =
    resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );

 const SlectedCardData =   resMenu?.cards[2]?.card.card.info; 
const handleClick = (index) => {
  if (showIndex === index) {
    setShowIndex(null); // close if same index clicked again
  } else {
    setShowIndex(index); // open this index
  }
};
  return (
    <div className="text-center">
      <h1 className="font-bold my-6 text-2xl">{name}</h1>
      <p className="font-bold text-lg">
        {cuisines.join(",")} - {costForTwoMessage}
      </p>
      {categories.map((category, index) => (
        <RestaurantCategories
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex}
          SlectedCardData={SlectedCardData}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}

export default RestaurantMenu;
