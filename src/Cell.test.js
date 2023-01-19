import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

let cell = (
  <table>
    <tbody>
      <tr>
        <Cell />
      </tr>
    </tbody>
  </table>
);

it("renders without crashing", function () {
  render(cell);
});

it("matches snapshot", function () {
  const { asFragment } = render(cell);
  expect(asFragment()).toMatchSnapshot();
});
