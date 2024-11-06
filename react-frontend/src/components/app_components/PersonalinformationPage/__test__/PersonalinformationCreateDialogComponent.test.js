import React from "react";
import { render, screen } from "@testing-library/react";

import PersonalinformationCreateDialogComponent from "../PersonalinformationCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders personalinformation create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PersonalinformationCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("personalinformation-create-dialog-component")).toBeInTheDocument();
});
