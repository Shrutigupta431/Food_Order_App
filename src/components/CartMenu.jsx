// CartMenu.js
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearItem } from "../utils/redux/cartSlice";
import { CDN_URL } from "../utils/constants";
import { Link } from "react-router-dom";

function CartMenu() {
  const dispatch = useDispatch();

  //Subscribing to the store using selector
  const cartItems = useSelector((state) => state.cart.items);
  const restaurant = useSelector((state) => state.cart.restaurant);

  const handleClearCart = () => dispatch(clearItem());

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + (item.price || item.defaultPrice) * item.quantity,
    0
  );
 
  return (
    <div className="m-5 p-5 text-center">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      <div className="flex justify-center gap-8">
        <Link key={restaurant?.id} to={"/restaurants/" + restaurant.id}>
          <h1 className="text-xl font-semibold">
            {restaurant?.name ? restaurant.name : ""}
          </h1>
          <img
            src={CDN_URL + restaurant.cloudinaryImageId}
            className="w-20 h-12 rounded"
            alt="product"
          />
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Cart is empty! Add some items.</p>
      ) : (
        <>
          <div className="m-auto p-5 w-7/12 text-left">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b-2  border-gray-300 p-4 flex justify-between items-center"
              >
                <div className="w-1/2">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm">{item.description}</p>
                  <p className="text-sm text-gray-600">
                    ₹ {(item.price || item.defaultPrice) / 100} ×{" "}
                    {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-3 w-1/2 justify-end">
                  <button
                    onClick={() => dispatch(removeItem(item))}
                    className="bg-black text-white px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(addItem(item))}
                    className="bg-black text-white px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <img
                    src={CDN_URL + item.imageId}
                    className="w-12 h-12 rounded"
                    alt="product"
                  />
                </div>
              </div>
            ))}
            <h3 className="text-xl font-bold mt-4">
              Total: ₹ {totalAmount / 100}
            </h3>
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-4 py-2 mt-4 rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartMenu;
