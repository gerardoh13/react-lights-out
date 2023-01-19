import React from "react";
import { render } from "@testing-library/react";
import NewGame from "./NewGame";


it("renders without crashing", function () {
  render(<NewGame/>);
});

it("matches snapshot", function () {
  const { asFragment } = render(<NewGame/>);
  expect(asFragment()).toMatchSnapshot();
});
