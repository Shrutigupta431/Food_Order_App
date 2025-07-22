import { fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";
import appStore from "../../utils/redux/appStore";
import { Provider } from "react-redux";
import { RES_MENU } from "../mock/mockResListData";

global.fetch = jest.fn(() => {
    return Promise.resolve({
      json: () => {
        Promise.resolve(RES_MENU);
      },
    });
  });

test("Should Render the Body Component with Search Button", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
        <Body />
      </Provider>
      </BrowserRouter>
    );
  });


//   const cards = screen.queryAllByTestId("resCard");
//   expect(cards.length).toBe(8);
  const searchBtn = screen.getByRole("button", { name: "Search" });
  const searchButton = screen.getByTestId("searchInput");

  fireEvent.change(searchButton, { target: { value: "burger" } });
  fireEvent.click(searchBtn);

  const cards = screen.queryAllByTestId("resCard");
  expect(cards.length).toBe(2);
});
