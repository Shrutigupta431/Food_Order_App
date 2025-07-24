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
function Body() {
  // Local-State-Variable(hook) ----Super powerful variable
  // State variable -  Keeps UI layer in sync with Data Layer -->
  // Whenever the state variable changes react will re-render my components //
  // const[data,setData] = useState( [
  //     {
  //       restaurantName: "Kannor Kitchen",
  //       itemId: "595184df77c826cb6f223f9f",
  //       cuisines: "ASPARAGUS + ARUGULA SALAD",
  //       rating: "3.2",
  //       price: 7.99,
  //       category: "small plates",
  //       active: true,
  //       favorites: false,
  //       photoUrl: "https://images.unsplash.com/photo-1543353071-873f17a7a088", // Unique photo
  //     },
  //     {
  //       restaurantName: "Sushi Masa",
  //       itemId: "595184df77c826cc6f223f9a",
  //       cuisines: "Sushi, Sashimi",
  //       rating: "4.8",
  //       price: 15.99,
  //       category: "seafood",
  //       active: true,
  //       favorites: true,
  //       photoUrl: "https://images.unsplash.com/photo-1546069901-eacef0df6022", // Unique photo
  //     },
  //     {
  //       restaurantName: "Pasta La Vista",
  //       itemId: "595184df77c826cc6f223f9b",
  //       cuisines: "Fettuccine Alfredo",
  //       rating: "3.5",
  //       price: 12.49,
  //       category: "Italian",
  //       active: true,
  //       favorites: false,
  //       photoUrl: "https://images.unsplash.com/photo-1543353071-873f17a7a088", // Unique photo
  //     },
  //     {
  //       restaurantName: "Burger Bonanza",
  //       itemId: "595184df77c826cc6f223f9c",
  //       cuisines: "Classic Cheeseburger",
  //       rating: "4.0",
  //       price: 9.99,
  //       category: "fast food",
  //       active: true,
  //       favorites: true,
  //       photoUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349", // Unique photo
  //     },
  //     {
  //       restaurantName: "Taco Fiesta",
  //       itemId: "595184df77c826cc6f223f9d",
  //       cuisines: "Tacos, Quesadillas",
  //       rating: "4.3",
  //       price: 6.99,
  //       category: "Mexican",
  //       active: true,
  //       favorites: false,
  //       photoUrl: "https://images.unsplash.com/photo-1543353071-873f17a7a088", // Unique photo
  //     },
  //     {
  //       restaurantName: "The Curry Pot",
  //       itemId: "595184df77c826cc6f223f9e",
  //       cuisines: "Chicken Tikka Masala",
  //       rating: "3.8",
  //       price: 10.99,
  //       category: "Indian",
  //       active: true,
  //       favorites: true,
  //       photoUrl: "https://images.unsplash.com/photo-1562967916-eb82221dfb22", // Unique photo
  //     },
  //     {
  //       restaurantName: "Pizza Paradise",
  //       itemId: "595184df77c826cc6f223f9f",
  //       cuisines: "Margherita Pizza",
  //       rating: "4.2",
  //       price: 13.99,
  //       category: "Italian",
  //       active: true,
  //       favorites: true,
  //       photoUrl: "https://images.unsplash.com/photo-1548365328-9c1f33d4f514", // Unique photo
  //     },
  //     {
  //       restaurantName: "Dim Sum Delight",
  //       itemId: "595184df77c826cc6f223fa0",
  //       cuisines: "Pork Dumplings",
  //       rating: "4.4",
  //       price: 8.99,
  //       category: "Chinese",
  //       active: true,
  //       favorites: false,
  //       photoUrl: "https://images.unsplash.com/photo-1546069901-3e7f5f8e4691", // Unique photo
  //     },
  //     {
  //       restaurantName: "Grill House",
  //       itemId: "595184df77c826cc6f223fa1",
  //       cuisines: "BBQ Ribs",
  //       rating: "4.1",
  //       price: 18.99,
  //       category: "American",
  //       active: true,
  //       favorites: true,
  //       photoUrl: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e", // Unique photo
  //     },
  //     {
  //       restaurantName: "Vegan Vibes",
  //       itemId: "595184df77c826cc6f223fa2",
  //       cuisines: "Vegan Buddha Bowl",
  //       rating: "4.5",
  //       price: 11.49,
  //       category: "Vegan",
  //       active: true,
  //       favorites: false,
  //       photoUrl: "https://images.unsplash.com/photo-1543352646-4868b7da14e3", // Unique photo
  //     },
  //   ])

  const [searchText, setSearchText] = useState("");
  const [topRated, setTopRated] = useState(false);
  const onlineStatus = useOnlineStatus();

  const { loggedInUser, setUserName } = useContext(userContext);
  const RestaurantOpened = OpenedCard(Card);
  const { data, filteredData, setFilteredData } = useCardAPI();
  //normal JS variable
  // let data = []

  // const fetchData = async () => {
  //   const data = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=22.7568411&lng=75.9059173&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const response = await data.json();

  //   setData(
  //     response?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //       ?.restaurants
  //   );
  //   setFilteredData(
  //     response?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //       ?.restaurants
  //   );
  // };
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://www.swiggy.com/dapi/restaurants/list/v5?lat=26.2124007&lng=78.1772053&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //     );

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("Swiggy Data", data);
  //     setData(
  //       data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //         ?.restaurants
  //     );
  //     setFilteredData(
  //       data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
  //         ?.restaurants
  //     );
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

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
                const filtData = data.filter((res) => res.info.avgRating > 4.3);
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {filteredData?.map((restaurant) => (
            <Link
              key={restaurant?.info?.id}
              to={"/restaurants/" + restaurant.info.id}
            >
              {restaurant.info.isOpen ? (
                <RestaurantOpened restaurant={restaurant} />
              ) : (
                <Card restaurant={restaurant} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Body;
