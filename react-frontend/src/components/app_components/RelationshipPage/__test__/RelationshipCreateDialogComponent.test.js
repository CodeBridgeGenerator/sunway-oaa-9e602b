import React from "react";
import { render, screen } from "@testing-library/react";

import RelationshipCreateDialogComponent from "../RelationshipCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders relationship create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RelationshipCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("relationship-create-dialog-component"),
  ).toBeInTheDocument();
});
