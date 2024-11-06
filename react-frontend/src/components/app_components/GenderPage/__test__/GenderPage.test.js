import React from "react";
import { render, screen } from "@testing-library/react";

import GenderPage from "../GenderPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders gender page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <GenderPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("gender-datatable")).toBeInTheDocument();
    expect(screen.getByRole("gender-add-button")).toBeInTheDocument();
});
