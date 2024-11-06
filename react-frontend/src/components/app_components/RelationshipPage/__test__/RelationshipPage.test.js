import React from "react";
import { render, screen } from "@testing-library/react";

import RelationshipPage from "../RelationshipPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders relationship page", async () => {
  const store = init({ models });
  render(
    <Provider store={store}>
      <MemoryRouter>
        <RelationshipPage />
      </MemoryRouter>
    </Provider>,
  );
  expect(screen.getByRole("relationship-datatable")).toBeInTheDocument();
  expect(screen.getByRole("relationship-add-button")).toBeInTheDocument();
});
