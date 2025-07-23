// ItemList.js
import { CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../utils/redux/cartSlice";

function ItemList({ items }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const getQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item?.quantity || 0;
  };

  const handleAdd = (item) => {
    dispatch(addItem({ ...item.card.info }));
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ ...item.card.info }));
  };

  return (
    <div>
      {items.map((item) => {
        const info = item.card.info;
        const quantity = getQuantity(info.id);

        return (
          <div
            key={info.id}
            className="p-4 m-2 border-b-2 border-gray-400 text-left flex justify-between"
          >
            <div className="w-9/12">
              <div className="py-2">
                <span className="text-lg font-semibold">{info.name}</span>
                <span> - ₹{(info.price || info.defaultPrice) / 100}</span>
              </div>
              <p className="text-sm">{info.description}</p>
            </div>

            <div className="w-3/12 relative">
              <img
                className="rounded-lg"
                src={CDN_URL + info.imageId}
                alt="img"
              />
              <div className="absolute bottom-2 left-9">
                {quantity === 0 ? (
                  <button
                    onClick={() => handleAdd(item)}
                    className="bg-black text-white text-sm px-3 py-1 rounded-lg shadow"
                  >
                    Add +
                  </button>
                ) : (
                  <div className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded-lg">
                    <button onClick={() => handleRemove(item)}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleAdd(item)}>+</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ItemList;
