// ItemList.js
import { useState } from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearItem } from "../utils/redux/cartSlice";
import ConfirmModal from "../utils/modal/ConfirmModal";

function ItemList({ items, SlectedCardData }) {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartRestaurantId = useSelector((state) => state.cart.restaurantId); // 👈 current restaurant in cart

  const [showModal, setShowModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null);

  // Get quantity of a specific item in cart
  const getQuantity = (id) => {
    const item = cartItems.find((i) => i.id === id);
    return item?.quantity || 0;
  };

  const handleAdd = (item) => {
    const itemData = {
      ...item.card.info,
      restaurantId: SlectedCardData.id,
      restaurant:SlectedCardData
    };

    // 🛑 If cart has items from different restaurant, show modal
    if (
      cartItems.length > 0 &&
      cartRestaurantId &&
      cartRestaurantId !== SlectedCardData.id
    ) {
      setPendingItem(itemData); // store the item to be added after confirm
      setShowModal(true); // open modal
      return;
    }

    dispatch(addItem(itemData));
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ ...item.card.info }));
  };

  // ✅ Called if user clicks "Yes" in modal
  const handleConfirm = () => {
    dispatch(clearItem());
    dispatch(addItem(pendingItem));
    setShowModal(false);
    setPendingItem(null);
  };

  const handleClose = () => {
    setShowModal(false);
    setPendingItem(null);
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

      {/* ✅ Confirmation Modal */}
      <ConfirmModal
        isOpen={showModal}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

export default ItemList;
