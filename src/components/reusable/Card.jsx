import React from "react";

function Card({ restaurant }) {
  const { name, cuisines, avgRating, costForTwo, cloudinaryImageId, sla } =
    restaurant.info;
  return (
    <div
      data-testid="resCard"
      className="mx-2 p-4 w-[280px]  rounded-lg transition-transform duration-300 ease-in  hover:shadow-md px-auto"
    >
      <img
        className="rounded-lg w-[300px] h-[150px]"
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/" +
          cloudinaryImageId
        }
      />

      <h2 className="font-bold py-1 text-lg">{name}</h2>
      <h2 className="font-bold  text-lg"> * {avgRating} {sla.slaString} </h2>
      <h3 style={{ wordWrap: "break-word" }} className="text-[#02060c99] font-medium">{cuisines.join(",")}</h3>
      {/* <h4> {costForTwo} </h4> */}
      {/* <h4></h4> */}
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
