import React from "react";
import { render, screen } from "@testing-library/react";

import ReligionEditDialogComponent from "../ReligionEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders religion edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ReligionEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("religion-edit-dialog-component"),
  ).toBeInTheDocument();
});
