import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammedetailsCreateDialogComponent from "../ProgrammedetailsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programmedetails create dialog", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProgrammedetailsCreateDialogComponent show={true} />
      </MemoryRouter>
    </Provider>,
  );
  expect(
    screen.getByRole("programmedetails-create-dialog-component"),
  ).toBeInTheDocument();
});
