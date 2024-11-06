import React from "react";
import { render, screen } from "@testing-library/react";

import RelegionCreateDialogComponent from "../RelegionCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders relegion create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RelegionCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("relegion-create-dialog-component"),
  ).toBeInTheDocument();
});
