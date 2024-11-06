import React from "react";
import { render, screen } from "@testing-library/react";

import RelationshipEditDialogComponent from "../RelationshipEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders relationship edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RelationshipEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("relationship-edit-dialog-component")).toBeInTheDocument();
});
