import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammedetailsPage from "../ProgrammedetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programmedetails page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <ProgrammedetailsPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("programmedetails-datatable")).toBeInTheDocument();
  expect(screen.getByRole("programmedetails-add-button")).toBeInTheDocument();
});
