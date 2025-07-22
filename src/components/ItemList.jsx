import React from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/redux/cartSlice";
function ItemList({ items }) {
  const dispatch = useDispatch();
 const cartItems = useSelector((state) => state.cart.items);

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };
  console.log(cartItems,"cartItems")
  return (
    <div>
      {items.map((item) => (
        <div
          key={item?.card?.info?.id}
          className="p-4 m-2 border-b-2 border-gray-400 text-left flex justify-between"
        >
          <div className=" w-9/12">
            <div className="py-2">
              <span className="text-lg">{item?.card?.info.name}</span>

              <span>
                {" "}
                - ₹{" "}
                {item?.card?.info.price
                  ? item?.card?.info.price / 100
                  : item?.card?.info.defaultPrice / 100}
              </span>
            </div>

            <div>
              <p className="text-xs">{item?.card?.info.description}</p>
            </div>
          </div>
          <div className="w-3/12 p-2">
            <div className="absolute">
              {cartItems.length===0}
              <button
                className="shadow-lg p-1 m-auto bg-black text-white rounded-lg "
                onClick={() => handleAddItem(item)}
              >
                Add +{" "}
              </button>
            </div>
            <img src={CDN_URL + item?.card?.info?.imageId} alt="img" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemList;
