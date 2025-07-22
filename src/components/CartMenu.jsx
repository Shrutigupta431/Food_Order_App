import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearItem } from "../utils/redux/cartSlice";

function CartMenu() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const handleClearCart = () => {
    dispatch(clearItem());
  };

  return (
    <div className=" m-5 p-5 text-center  ">
      <div>
        <h1 className="text-xl font-bold">Cart </h1>
      </div>
      <div className="m-auto p-5  w-7/12">
        <button
          className="bg-black text-white m-2 p-2 rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        <ItemList items={cartItems} />
      </div>
      {cartItems.length === 0 && <p>Cart is empty !! Add some items</p>}
    </div>
  );
}

export default CartMenu;
