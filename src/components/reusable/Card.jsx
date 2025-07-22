import React from "react";

function Card({ restaurant }) {
  const { name, cuisines, avgRating, costForTwo, cloudinaryImageId, sla } =
    restaurant.info;
  return (
    <div
      data-testid="resCard"
      className="m-4 p-2 w-[200px] bg-gray-100 rounded-lg hover:bg-gray-200"
    >
      <img
        className="rounded-lg "
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          cloudinaryImageId
        }
      />

      <h2 className="font-bold py-2 text-lg">{name}</h2>
      <h3 style={{ wordWrap: "break-word" }}>{cuisines.join(",")}</h3>
      <h4> {costForTwo} </h4>
      <h4>{avgRating} star</h4>
      <h4>{sla.slaString}</h4>
    </div>
  );
}
//Higher order component - it takes a component and return it with some modifications
export const OpenedCard = (Card) => {
  return (props) => {
    return (
      <div>
        <label className="bg-black rounded-lg m-1 p-1 absolute text-white">
          Opened
        </label>
        <Card {...props} />
      </div>
    );
  };
};
export default Card;
