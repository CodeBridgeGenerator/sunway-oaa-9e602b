import React from "react";
import { render, screen } from "@testing-library/react";

import RelegionEditDialogComponent from "../RelegionEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders relegion edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RelegionEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("relegion-edit-dialog-component")).toBeInTheDocument();
});
