import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Card from "./reusable/Card";
import {  useHeroCardAPI } from "../utils/hooks/useRestaurantMenu";

const HeroMenuCard = () => {
 
   const {resData} = useHeroCardAPI();
 console.log("resData",resData)
  const menuData = resData?.data?.cards.filter(
    (c) =>
      c?.card.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );
 
  return (
    <div className="p-4 flex-col justify-center">
      <div className="ml-5 mb-8">
        <p className="text-3xl font-bold">
          {" "}
          {resData?.data?.cards[0]?.card.card.title}
        </p>
        <p className="text-lg font-bold text-slate-500">
          {resData?.data?.cards[0]?.card.card.description}
        </p>
      </div>
      <div className="ml-5">
        <p className="text-3xl font-bold">
          {" "}
          {resData?.data?.cards[2]?.card.card.gridElements.infoWithStyle.text}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl ">
        {menuData?.map((restaurant) => (
         
            <Link key={restaurant?.card.card.info?.id}  to={"/restaurants/" + restaurant?.card.card.info.id}>
              <Card restaurant={restaurant?.card.card} />
            </Link>
         
        ))}
      </div>
    </div>
  );
};

export default HeroMenuCard;
