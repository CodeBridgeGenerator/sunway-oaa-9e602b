import React from "react";
import { render, screen } from "@testing-library/react";

import GenderEditDialogComponent from "../GenderEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders gender edit dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <GenderEditDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("gender-edit-dialog-component")).toBeInTheDocument();
});
