import { lazy, Suspense, useEffect, useState } from "react";

import { Provider } from "react-redux";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import ShimmerUi from "./components/ShimmerUi";
import userContext from "./utils/userContext";
import appStore from "./utils/redux/appStore";
import CartMenu from "./components/CartMenu";
import HeroMenuCard from "./components/HeroMenuCard";
import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ContactUs = lazy(() => import("./components/ContactUs"));

const Grocery = lazy(() => import("./components/Grocery"));

const App = () => {

  const [userName, setUserName] = useState();

  useEffect(() => {
    const data = {
      name: "John Doe",
    };
    setUserName(data.name);
  }, []);
  return (
    <Provider store={appStore}>
      <userContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </userContext.Provider>
    </Provider>
  );
};

// Define the routes using createBrowserRouter
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {path:'/heromenu',
        element:<HeroMenuCard />
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contactus",
        element: (
          <Suspense fallback={<ShimmerUi />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<ShimmerUi />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cartmenu",
        element: <CartMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={appRouter} />;
};

export default AppRouter;
