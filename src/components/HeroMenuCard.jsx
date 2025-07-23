import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Card from "./reusable/Card";
import { useCardAPI } from "../utils/hooks/useRestaurantMenu";

const HeroMenuCard = () => {
  const [searchParams] = useSearchParams();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [resData, setResData] = useState([]);

  // Extract query params
  const collection = searchParams.get("collection_id");
  const tags = searchParams.get("tags");
  const type = searchParams.get("type");
  const { heroData } = useCardAPI();

  useEffect(() => {
    if (collection && tags && type) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    const API_URL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.2124007&lng=78.1772053&collection=${collection}&tags=${encodeURIComponent(
      tags
    )}&sortBy=&filters=&type=${type}&offset=24&page_type=null`;

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log("Swiggy Data", json);

      const restaurants =
        json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      setResData(json);
      setData(restaurants);
      setFilteredData(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const menuData = resData?.data?.cards.filter(
    (c) =>
      c?.card.card?.["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.Restaurant"
  );
  console.log("resData",resData)
  return (
    <div className="p-4 flex-col justify-center">
        <div className="ml-5 mb-8">

       <p className="text-3xl font-bold">  {resData?.data?.cards[0]?.card.card.title}</p>
       <p className="text-lg font-bold text-slate-500">{resData?.data?.cards[0]?.card.card.description}</p>
        </div>
        <div className="ml-5">
           <p className="text-3xl font-bold"> {resData?.data?.cards[2]?.card.card.gridElements.infoWithStyle.text}</p>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl ">
        {menuData?.map((restaurant) => (
          <div key={restaurant?.card.card.info?.id}>
            <Card restaurant={restaurant?.card.card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroMenuCard;
