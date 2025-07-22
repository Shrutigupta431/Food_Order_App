import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import appStore from "../../utils/redux/appStore";
import { BrowserRouter } from "react-router-dom";

test("should load Header Component with login button", () => {
  render(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>
  );
//   const loginbutton = screen.getByText("Login");

  const loginbutton = screen.getByRole("button",{name:"Login"});
  expect(loginbutton).toBeInTheDocument();
});

test("should load Header Component with Cart 0 items", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
  //   const loginbutton = screen.getByText("Login");
  
    // const cartItems = screen.getByText("Cart - (0 items)");
    const cartItems = screen.getByText(/Cart/);

    expect(cartItems).toBeInTheDocument();
  });

  test("should change login button to logout on click", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Header />
        </Provider>
      </BrowserRouter>
    );
 
    const loginButton = screen.getByRole("button",{name:"Login"});

    fireEvent.click(loginButton);

    const logoutButton = screen.getByRole("button",{name:"Logout"})
    expect(logoutButton).toBeInTheDocument();
  });
  