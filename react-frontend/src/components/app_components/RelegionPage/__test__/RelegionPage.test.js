import React from "react";
import { render, screen } from "@testing-library/react";

import RelegionPage from "../RelegionPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders relegion page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RelegionPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("relegion-datatable")).toBeInTheDocument();
    expect(screen.getByRole("relegion-add-button")).toBeInTheDocument();
});
