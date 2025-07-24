import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/hooks/useOnlineStatus";
import userContext from "../utils/userContext";
import { useSelector } from "react-redux";
import { LOGO_URL } from "../utils/constants";
import logo from "../assets/images/brandlogo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
function Header() {
  //subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);
  const [btnName, setbtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(userContext);

  const totalCartCount = cartItems.reduce((total,item)=>total+item.quantity,0);
//   let total = 0;
// for (let item of cartItems) {
//   total += item.quantity;
// };
// console.log(total); // 3

  return (
    <nav className="flex justify-between bg-white shadow-2xl mb-3  sticky top-0 z-50 ">
      <div className="w-24 p-4 m-4 h-20">
        <img src={logo} alt="swiggy-logo" />
      </div>

      <div className="flex items-center">
        <ul className="flex p-4 m-4">
          <li className="px-4">
            {" "}
            Online Status :{onlineStatus ? " 🟢" : " 🔴"}
          </li>
          <li className="px-4">
            {" "}
            <Link to="/">Home</Link>
          </li>
          <li className="px-4">
            {" "}
            <Link to="/about">About</Link>
          </li>
          <li className="px-4">
            {" "}
            <Link to="/contactus">Contact Us</Link>
          </li>
          <li className="px-4">
            {" "}
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="px-4 font-bold text-xl relative">
            <Link to="/cartmenu">
              <div className="relative inline-block">
                <ShoppingCartIcon style={{ color: "black", fontSize: 28 }} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalCartCount}
                  </span>
                )}
              </div>
            </Link>
          </li>

          <button
            className="btn"
            onClick={() => {
              btnName === "Login" ? setbtnName("Logout") : setbtnName("Login");
            }}
          >
            {btnName}
          </button>
          <li className="px-4 font-bold">
            {" "}
            {btnName === "Login" ? "" : loggedInUser}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
