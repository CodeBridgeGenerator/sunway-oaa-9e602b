import React, { useState } from "react";
import { classNames } from "primereact/utils";
import { Ripple } from "primereact/ripple";
import ProgrammedetailsCreateDialogComponent from "../app_components/ProgrammedetailsPage/ProgrammedetailsCreateDialogComponent";
import PersonalinformationCreateDialogComponent from "../app_components/PersonalinformationPage/PersonalinformationCreateDialogComponent";
import ContactInformationCreateDialogComponent from "../app_components/ContactInformationPage/ContactInformationCreateDialogComponent";
import SupportingDocumentsCreateDialogComponent from "../app_components/SupportingDocumentsPage/SupportingDocumentsCreateDialogComponent";
import TermsandconditionsCreateDialogComponent from "../app_components/TermsandconditionsPage/TermsandconditionsCreateDialogComponent";

export const CourseRegistration = () => {
  const [activeStep, setActiveStep] = useState(0);
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
    <div className="p-4">
      <h2 className="text-center">Course Registration</h2>
      
      {/* Step Navigation */}
      <ul className="bg-red-500 p-2 m-0 list-none flex overflow-x-auto select-none" style={{ borderRadius: '30px' }}>
        {steps.map((step, index) => (
          <li key={index} className="mr-2">
            <a
              className={classNames(
                'p-ripple cursor-pointer px-4 py-3 flex align-items-center hover:bg-indigo-400 transition-colors transition-duration-150',
                {
                  'bg-white hover:bg-white text-indigo-900': activeStep === index,
                  'text-white': activeStep !== index
                }
              )}
              onClick={() => setActiveStep(index)}
              style={{ borderRadius: '30px' }}
            >
              <i className={`${step.icon} mr-2`}></i>
              <span className="font-medium">{step.label}</span>
              <Ripple />
            </a>
          </li>
        ))}
      </ul>

      {/* Step Content */}
      <div className="mt-4">
        {activeStep === 0 && (
          <div>
            Programme Details Content
            <button className="p-button p-button-rounded p-button-outlined mt-3" onClick={() => setShowProgrammeDialog(true)}>
              Add Programme Details
            </button>
            <ProgrammedetailsCreateDialogComponent
              show={showProgrammeDialog}
              onHide={() => setShowProgrammeDialog(false)}
              onCreateResult={(newEntity) => console.log("Created Programme Details:", newEntity)}
            />
          </div>
        )}
        {activeStep === 1 && (
          <div>
            Personal Information Content
            <button className="p-button p-button-rounded p-button-outlined mt-3" onClick={() => setShowPersonalInfoDialog(true)}>
              Add Personal Information
            </button>
            <PersonalinformationCreateDialogComponent
              show={showPersonalInfoDialog}
              onHide={() => setShowPersonalInfoDialog(false)}
              onCreateResult={(newEntity) => console.log("Created Personal Information:", newEntity)}
            />
          </div>
        )}
        {activeStep === 2 && (
          <div>
            Contact Information Content
            <button className="p-button p-button-rounded p-button-outlined mt-3" onClick={() => setShowContactInfoDialog(true)}>
              Add Contact Information
            </button>
            <ContactInformationCreateDialogComponent
              show={showContactInfoDialog}
              onHide={() => setShowContactInfoDialog(false)}
              onCreateResult={(newEntity) => console.log("Created Contact Information:", newEntity)}
            />
          </div>
        )}
        {activeStep === 3 && (
          <div>
            Supporting Documents Content
            <button className="p-button p-button-rounded p-button-outlined mt-3" onClick={() => setShowSupportingDocsDialog(true)}>
              Add Supporting Document
            </button>
            <SupportingDocumentsCreateDialogComponent
              show={showSupportingDocsDialog}
              onHide={() => setShowSupportingDocsDialog(false)}
              onCreateResult={(newEntity) => console.log("Created Supporting Document:", newEntity)}
            />
          </div>
        )}
        {activeStep === 4 && (
          <div>
            Terms and Conditions Content
            <button className="p-button p-button-rounded p-button-outlined mt-3" onClick={() => setShowTermsDialog(true)}>
              Add Terms and Conditions
            </button>
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
  );
};

export default CourseRegistration;
