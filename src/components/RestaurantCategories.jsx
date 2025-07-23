//Controlled Compound
import { useState } from "react";
import ItemList from "./ItemList";

function RestaurantCategories({value, data, showItems, onClick }) {
 
  return (
    <div>
      <div className="w-6/12 mx-auto my-4 bg-gray-100  shadow-lg p-4 ">
        <div className="flex justify-between" onClick={onClick}>
          <span className="font-bold text-lg">
            {data.title}({data.itemCards.length})
          </span>
          <span className="cursor-pointer">⬇</span>
        </div>
        <div>{showItems && <ItemList items={data.itemCards} />}</div>
      </div>
    </div>
  );
}

export default RestaurantCategories;
