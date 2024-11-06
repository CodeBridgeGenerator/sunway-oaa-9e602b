import React from "react";
import { render, screen } from "@testing-library/react";

import MaritalStatusPage from "../MaritalStatusPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders maritalStatus page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MaritalStatusPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("maritalStatus-datatable")).toBeInTheDocument();
    expect(screen.getByRole("maritalStatus-add-button")).toBeInTheDocument();
});
