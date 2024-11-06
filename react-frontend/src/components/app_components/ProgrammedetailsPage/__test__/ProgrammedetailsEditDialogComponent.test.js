import React from "react";
import { render, screen } from "@testing-library/react";

import ProgrammedetailsEditDialogComponent from "../ProgrammedetailsEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders programmedetails edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ProgrammedetailsEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("programmedetails-edit-dialog-component")).toBeInTheDocument();
});
