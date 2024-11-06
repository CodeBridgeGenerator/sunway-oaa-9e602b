import AppSideBar from "./appSideBar/AppSideBar.js";

/*

import ProductsPage from "../ProductsPage/ProductsPage";
import CoursesPage from "../CoursesPage/CoursesPage";
import CampusPage from "../CampusPage/CampusPage";
import LocationPage from "../LocationPage/LocationPage";
import ProgrammelevelPage from "../ProgrammelevelPage/ProgrammelevelPage";
import IntakePage from "../IntakePage/IntakePage";
import SchoolPage from "../SchoolPage/SchoolPage";
import ProgrammedetailsPage from "../ProgrammedetailsPage/ProgrammedetailsPage";
import PersonalinformationPage from "../PersonalinformationPage/PersonalinformationPage";
import MaritalStatusPage from "../MaritalStatusPage/MaritalStatusPage";
import RacePage from "../RacePage/RacePage";
import ReligionPage from "../ReligionPage/ReligionPage";
import GenderPage from "../GenderPage/GenderPage";
import ContactInformationPage from "../ContactInformationPage/ContactInformationPage";
import RelationshipPage from "../RelationshipPage/RelationshipPage";
import SupportingDocumentsPage from "../SupportingDocumentsPage/SupportingDocumentsPage";
import TermsandconditionsPage from "../TermsandconditionsPage/TermsandconditionsPage";
~cb-add-import~

~cb-add-services-card~

case "products":
                return <ProductsPage />;
case "courses":
                return <CoursesPage />;
case "campus":
                return <CampusPage />;
case "location":
                return <LocationPage />;
case "programmelevel":
                return <ProgrammelevelPage />;
case "intake":
                return <IntakePage />;
case "school":
                return <SchoolPage />;
case "programmedetails":
                return <ProgrammedetailsPage />;
case "personalinformation":
                return <PersonalinformationPage />;
case "maritalStatus":
                return <MaritalStatusPage />;
case "race":
                return <RacePage />;
case "religion":
                return <ReligionPage />;
case "gender":
                return <GenderPage />;
case "contactInformation":
                return <ContactInformationPage />;
case "relationship":
                return <RelationshipPage />;
case "supportingDocuments":
                return <SupportingDocumentsPage />;
case "termsandconditions":
                return <TermsandconditionsPage />;
~cb-add-thurthy~

*/

const AppLayout = (props) => {
  const { children, activeKey, activeDropdown } = props;

  return (
    <div className="flex min-h-[calc(100vh-5rem)] mt-20 bg-white">
      <AppSideBar activeKey={activeKey} activeDropdown={activeDropdown} />
      <div className="flex-1 ml-2">{children}</div>
    </div>
  );
};

export default AppLayout;
