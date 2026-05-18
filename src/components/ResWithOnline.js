import { Link } from "react-router-dom";
import { useCardAPI } from "../utils/hooks/useRestaurantMenu";
import Card, { OpenedCard } from "./reusable/Card";
import { useEffect } from "react";

export const ResWithOnline = () => {
    const { resData,loadMore } = useCardAPI();
    const RestaurantOpened = OpenedCard(Card);

    const filterData = resData?.data?.cards[4].card.card.gridElements?.infoWithStyle
        ?.restaurants || [];
    const title = resData?.data?.cards?.[2]?.card?.card?.title ||
        "Top Restaurants Chains"

        useEffect(() => {
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500
    ) {
      loadMore(); // when 500px close to bottom
    }
  };

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
    return (
        <div>
            <h2 className="font-bold py-1 text-2xl ml-4">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {filterData?.map((restaurant) => (
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {filterData?.map((restaurant) => (
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
    )
}