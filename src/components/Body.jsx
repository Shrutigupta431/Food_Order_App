import React, { useEffect } from "react";
import Card, { OpenedCard } from "./reusable/Card";
import { useState } from "react";
import { Link } from "react-router-dom";
import userContext from "../utils/userContext";
import { useContext } from "react";
import useOnlineStatus from "../utils/hooks/useOnlineStatus";
import ShimmerUi from "./ShimmerUi";
import { useCardAPI } from "../utils/hooks/useRestaurantMenu";
import HeroSection from "./HeroSection";
import { useLocation } from "../utils/context/LocationContext";
import { ResWithOnline } from "./ResWithOnline";

function Body() {
  const [searchText, setSearchText] = useState("");
  const [topRated, setTopRated] = useState(false);
  const onlineStatus = useOnlineStatus();

  const { loggedInUser, setUserName } = useContext(userContext);
  const RestaurantOpened = OpenedCard(Card);
  const { data, title, filteredData, setFilteredData } = useCardAPI();

  useEffect(() => {
    if (topRated) {
      setFilteredData(data);
    }
  }, [topRated]);

  useEffect(() => {
    if (searchText === "") {
      setFilteredData(data);
    }
  }, [searchText]);
  console.log("filteredData", filteredData);
  if (onlineStatus === false)
    return (
      <h1>
        Oops !! Looks like you are offline !! Please turn on your internet
      </h1>
    );
  return filteredData?.length === 0 ? (
    <ShimmerUi />
  ) : (
    <div className="body-cont w-10/12 mx-auto my-4  bg-white-100  shadow-lg ">
      <div>
        <HeroSection />
        <h2 className="font-bold py-1 text-2xl ml-4">{title}</h2>
        <div className="flex">
          <div className="p-4">
            <input
              data-testid="searchInput"
              type="text"
              className="border-solid border-black border-2 "
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              className="py-1 px-4 bg-gray-300 rounded-lg m-4"
              onClick={() => {
                const filtRes = data.filter((res) =>
                  res.info.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setFilteredData(filtRes);
              }}
            >
              Search
            </button>
          </div>
          <div className="p-4">
            <button
              className=" py-1 px-4 bg-gray-300 rounded-lg m-4 "
              onClick={() => {
                const filtData = data.filter((res) => res.info.avgRating > 4);
                setFilteredData(filtData);
                setTopRated(!topRated);
              }}
            >
              {" "}
              {topRated ? " Top Rated Restaurant" : "All Restaurant"}
            </button>

            <label>User Name : </label>
            <input
              className="p-2 border-black"
              value={loggedInUser}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex overflow-x-auto gap-4 p-2 no-scrollbar">
          {filteredData?.map((restaurant) => (
            <Link
              key={restaurant?.info?.id}
              to={"/restaurants/" + restaurant.info.id}
              className="min-w-[250px] max-w-[250px] flex-shrink-0"
            >
              {restaurant.info.isOpen ? (
                <RestaurantOpened restaurant={restaurant} />
              ) : (
                <Card restaurant={restaurant} />
              )}
            </Link>
          ))}
        </div>
        <ResWithOnline title={title} />
      </div>
    </div>
  );
}

export default Body;
