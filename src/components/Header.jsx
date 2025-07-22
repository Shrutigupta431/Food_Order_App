import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/hooks/useOnlineStatus";
import userContext from "../utils/userContext";
import { useSelector } from "react-redux";
import { LOGO_URL } from "../utils/constants";
import logo from "../assets/images/brandlogo.png";
function Header() {
  //subscribing to the store using selector
  const cartItems = useSelector((store) => store.cart.items);
  const [btnName, setbtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();

  const { loggedInUser } = useContext(userContext);
  return (
    <nav className="flex justify-between bg-pink-400  shadow-2xl mb-3 sm:bg-pink-100 lg:bg-pink-500 ">
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
          <li className="px-4 font-bold text-xl ">
            <Link to="/cartmenu">Cart - ({cartItems.length} items)</Link>
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
