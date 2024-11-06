import React from "react";
import { render, screen } from "@testing-library/react";

import RacePage from "../RacePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders race page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RacePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("race-datatable")).toBeInTheDocument();
    expect(screen.getByRole("race-add-button")).toBeInTheDocument();
});
