import React, { useState } from "react";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import ProgrammedetailsCreateDialogComponent from "../app_components/ProgrammedetailsPage/ProgrammedetailsCreateDialogComponent"; 
import PersonalinformationCreateDialogComponent from "../app_components/PersonalinformationPage/PersonalinformationCreateDialogComponent";
import ContactInformationCreateDialogComponent from "../app_components/ContactInformationPage/ContactInformationCreateDialogComponent";
import SupportingDocumentsCreateDialogComponent from "../app_components/SupportingDocumentsPage/SupportingDocumentsCreateDialogComponent";
import TermsandconditionsCreateDialogComponent from "../app_components/TermsandconditionsPage/TermsandconditionsCreateDialogComponent";
import ProgrammedetailsPage from "../app_components/ProgrammedetailsPage/ProgrammedetailsPage";

export const CourseRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
  // State for each dialog's visibility
  const [showProgrammeDialog, setShowProgrammeDialog] = useState(false);
  const [showPersonalInfoDialog, setShowPersonalInfoDialog] = useState(false);
  const [showContactInfoDialog, setShowContactInfoDialog] = useState(false);
  const [showSupportingDocsDialog, setShowSupportingDocsDialog] = useState(false);
  const [showTermsDialog, setShowTermsDialog] = useState(false);

  const steps = [
    { label: "Programme Details", icon: "pi pi-info-circle" },
    { label: "Personal Information", icon: "pi pi-user" },
    { label: "Contact Information", icon: "pi pi-phone" },
    { label: "Supporting Documents", icon: "pi pi-file" },
    { label: "Terms and Conditions", icon: "pi pi-check-square" },
    { label: "Preview", icon: "pi pi-eye" },
    { label: "Payment Gateway", icon: "pi pi-credit-card" }
  ];

  return (
    <div className="surface-ground px-4 py-8 md:px-6 lg:px-8">
      <div className="p-fluid flex flex-column lg:flex-row">
        {/* Sidebar Navigation */}
        <ul className="list-none m-0 p-0 flex flex-row lg:flex-column justify-content-evenly md:justify-content-between lg:justify-content-start mb-5 lg:pr-8 lg:mb-0">
          {steps.map((step, index) => (
            <li key={index}>
              <a
                className={classNames(
                  "p-ripple flex align-items-center cursor-pointer p-3 border-round text-800 hover:surface-hover transition-duration-150 transition-colors",
                  { "text-primary": activeStep === index }
                )}
                onClick={() => setActiveStep(index)}
              >
                <i className={`${step.icon} md:mr-2`}></i>
                <span className="font-medium hidden md:block">{step.label}</span>
                <Ripple />
              </a>
            </li>
          ))}
        </ul>

        {/* Step Content Area */}
        <div className="surface-card p-5 shadow-2 border-round flex-auto">
          <div className="text-900 font-semibold text-lg mt-3">{steps[activeStep].label}</div>
          <Divider />

          {/* Step Content */}
          <div className="flex gap-5 flex-column-reverse md:flex-row mt-4">
            {activeStep === 0 && (
              <div>
                <p>Programme Details Content</p>
                <ProgrammedetailsPage
                  onHide={() => setShowProgrammeDialog(false)}
                  onCreateResult={(newEntity) => console.log("Created Programme Details:", newEntity)}
                />
              </div>
            )}
            {activeStep === 1 && (
              <div>
                <p>Personal Information Content</p>
                <Button label="Add Personal Information" icon="pi pi-plus" onClick={() => setShowPersonalInfoDialog(true)} />
                <PersonalinformationCreateDialogComponent
                  show={showPersonalInfoDialog}
                  onHide={() => setShowPersonalInfoDialog(false)}
                  onCreateResult={(newEntity) => console.log("Created Personal Information:", newEntity)}
                />
              </div>
            )}
            {activeStep === 2 && (
              <div>
                <p>Contact Information Content</p>
                <Button label="Add Contact Information" icon="pi pi-plus" onClick={() => setShowContactInfoDialog(true)} />
                <ContactInformationCreateDialogComponent
                  show={showContactInfoDialog}
                  onHide={() => setShowContactInfoDialog(false)}
                  onCreateResult={(newEntity) => console.log("Created Contact Information:", newEntity)}
                />
              </div>
            )}
            {activeStep === 3 && (
              <div>
                <p>Supporting Documents Content</p>
                <Button label="Add Supporting Document" icon="pi pi-plus" onClick={() => setShowSupportingDocsDialog(true)} />
                <SupportingDocumentsCreateDialogComponent
                  show={showSupportingDocsDialog}
                  onHide={() => setShowSupportingDocsDialog(false)}
                  onCreateResult={(newEntity) => console.log("Created Supporting Document:", newEntity)}
                />
              </div>
            )}
            {activeStep === 4 && (
              <div>
                <p>Terms and Conditions Content</p>
                <Button label="Add Terms and Conditions" icon="pi pi-plus" onClick={() => setShowTermsDialog(true)} />
                <TermsandconditionsCreateDialogComponent
                  show={showTermsDialog}
                  onHide={() => setShowTermsDialog(false)}
                  onCreateResult={(newEntity) => console.log("Created Terms and Conditions:", newEntity)}
                />
              </div>
            )}
            {activeStep === 5 && <div>Preview Content</div>}
            {activeStep === 6 && <div>Payment Gateway Content</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseRegistration;
