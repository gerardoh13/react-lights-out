import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Board from "./Board";

it("renders without crashing", function () {
  render(<Board />);
});

it("matches snapshot", function () {
  const { asFragment } = render(<Board test/>);
  expect(asFragment()).toMatchSnapshot();
});

it("displays win message if game is won", function () {
  const { queryByTestId } = render(<Board test/>);

  const button = queryByTestId("0-0");
  fireEvent.click(button);

  const msg = screen.getByText("You Win!");
  expect(msg).toBeInTheDocument();
});


