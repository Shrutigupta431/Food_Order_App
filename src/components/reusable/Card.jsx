import React from "react";

function Card({ restaurant }) {
  const { name, cuisines, avgRating, costForTwo, cloudinaryImageId, sla } =
    restaurant.info;

  return (
   <div
  data-testid="resCard"
  className="relative min-w-[250px] max-w-[250px] flex-shrink-0 mt-2 mb-2 p-2 rounded-lg transition-transform duration-300 ease-in hover:shadow-md bg-white"
>
      <img
        className="rounded-lg w-full h-[150px] object-cover"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          cloudinaryImageId
        }
        alt={name}
      />

      <h2 className="font-bold py-1 text-lg">{name}</h2>
      <h2 className="font-semibold text-sm text-gray-700">
        ⭐{avgRating} • {sla?.slaString}
      </h2>
      <h3 className="text-sm text-gray-600">{cuisines.join(", ")}</h3>
    </div>
  );
}


//Higher order component - it takes a component and return it with some modifications
export const OpenedCard = (Card) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute top-2 left-2 bg-black rounded-lg px-2 py-1 text-white text-xs z-10">
          Trending
        </label>
        <Card {...props} />
      </div>
    );
  };
};

export default Card;
