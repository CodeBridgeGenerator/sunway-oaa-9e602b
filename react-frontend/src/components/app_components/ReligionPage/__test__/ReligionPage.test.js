import React from "react";
import { render, screen } from "@testing-library/react";

import ReligionPage from "../ReligionPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders religion page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ReligionPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("religion-datatable")).toBeInTheDocument();
    expect(screen.getByRole("religion-add-button")).toBeInTheDocument();
});
