import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { classNames } from "primereact/utils";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { SplitButton } from "primereact/splitbutton";
import client from "../../../services/restClient";
import CommentsSection from "../../common/CommentsSection";
import ProjectLayout from "../../Layouts/ProjectLayout";


const SinglePersonalinformationPage = (props) => {
    const navigate = useNavigate();
    const urlParams = useParams();
    const [_entity, set_entity] = useState();
  const [isHelpSidebarVisible, setHelpSidebarVisible] = useState(false);

    const [name, setName] = useState([]);
const [Gender, setGender] = useState([]);
const [maritalStatus, setMaritalStatus] = useState([]);
const [religion, setReligion] = useState([]);
const [race, setRace] = useState([]);

    useEffect(() => {
        //on mount
        client
            .service("personalinformation")
            .get(urlParams.singlePersonalinformationId, { query: { $populate: [            {
                path: "createdBy",
                service: "users",
                select: ["name"],
              },{
                path: "updatedBy",
                service: "users",
                select: ["name"],
              },"name","Gender","maritalStatus","religion","race"] }})
            .then((res) => {
                set_entity(res || {});
                const name = Array.isArray(res.name)
            ? res.name.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.name
                ? [{ _id: res.name._id, name: res.name.name }]
                : [];
        setName(name);
const Gender = Array.isArray(res.Gender)
            ? res.Gender.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.Gender
                ? [{ _id: res.Gender._id, name: res.Gender.name }]
                : [];
        setGender(Gender);
const maritalStatus = Array.isArray(res.maritalStatus)
            ? res.maritalStatus.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.maritalStatus
                ? [{ _id: res.maritalStatus._id, name: res.maritalStatus.name }]
                : [];
        setMaritalStatus(maritalStatus);
const religion = Array.isArray(res.religion)
            ? res.religion.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.religion
                ? [{ _id: res.religion._id, name: res.religion.name }]
                : [];
        setReligion(religion);
const race = Array.isArray(res.race)
            ? res.race.map((elem) => ({ _id: elem._id, name: elem.name }))
            : res.race
                ? [{ _id: res.race._id, name: res.race.name }]
                : [];
        setRace(race);
            })
            .catch((error) => {
                console.log({ error });
                props.alert({ title: "Personalinformation", type: "error", message: error.message || "Failed get personalinformation" });
            });
    }, [props,urlParams.singlePersonalinformationId]);


    const goBack = () => {
        navigate("/personalinformation");
    };

      const toggleHelpSidebar = () => {
    setHelpSidebarVisible(!isHelpSidebarVisible);
  };

  const copyPageLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        props.alert({
          title: "Link Copied",
          type: "success",
          message: "Page link copied to clipboard!",
        });
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
        props.alert({
          title: "Error",
          type: "error",
          message: "Failed to copy page link.",
        });
      });
  };

    const menuItems = [
        {
            label: "Copy link",
            icon: "pi pi-copy",
            command: () => copyPageLink(),
        },
        {
            label: "Help",
            icon: "pi pi-question-circle",
            command: () => toggleHelpSidebar(),
        },
    ];

    return (
        <ProjectLayout>
        <div className="col-12 flex flex-column align-items-center">
            <div className="col-12">
                <div className="flex align-items-center justify-content-between">
                <div className="flex align-items-center">
                    <Button className="p-button-text" icon="pi pi-chevron-left" onClick={() => goBack()} />
                    <h3 className="m-0">Personal information</h3>
                    <SplitButton
                        model={menuItems.filter(
                        (m) => !(m.icon === "pi pi-trash" && items?.length === 0),
                        )}
                        dropdownIcon="pi pi-ellipsis-h"
                        buttonClassName="hidden"
                        menuButtonClassName="ml-1 p-button-text"
                    />
                </div>
                
                {/* <p>personalinformation/{urlParams.singlePersonalinformationId}</p> */}
            </div>
            <div className="card w-full">
                <div className="grid ">

            <div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Full Name</label><p className="m-0 ml-3" >{_entity?.fullName}</p></div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">First Name</label><p className="m-0 ml-3" >{_entity?.firstName}</p></div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Surname</label><p className="m-0 ml-3" >{_entity?.surname}</p></div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Nationality</label><p className="m-0 ml-3" >{_entity?.Nationality}</p></div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">NRIC</label><p className="m-0 ml-3" >{_entity?.NRIC}</p></div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Special Conditions</label><p className="m-0" ><i id="specialConditions" className={`pi ${_entity?.specialConditions?"pi-check": "pi-times"}`}  ></i></p></div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Former Sunway</label><p className="m-0" ><i id="formerSunway" className={`pi ${_entity?.formerSunway?"pi-check": "pi-times"}`}  ></i></p></div>
            <div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Name</label>
                    {name.map((elem) => (
                        <Link key={elem._id} to={`/users/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Gender</label>
                    {Gender.map((elem) => (
                        <Link key={elem._id} to={`/gender/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Marital Status</label>
                    {maritalStatus.map((elem) => (
                        <Link key={elem._id} to={`/maritalStatus/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Religion</label>
                    {religion.map((elem) => (
                        <Link key={elem._id} to={`/religion/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>
<div className="col-12 md:col-6 lg:col-3 mb-10"><label className="text-sm text-gray-600">Race</label>
                    {race.map((elem) => (
                        <Link key={elem._id} to={`/race/${elem._id}`}>
                        <div>
                  {" "}
                            <p className="text-xl text-primary">{elem.name}</p>
                            </div>
                        </Link>
                    ))}</div>

                    <div className="col-12">&nbsp;</div>
                </div>
            </div>
        </div>
        <div className="mt-2">
            <TabView>
                
            </TabView>
        </div>

      <CommentsSection
        recordId={urlParams.singlePersonalinformationId}
        user={props.user}
        alert={props.alert}
        serviceName="personalinformation"
      />
      <div
        id="rightsidebar"
        className={classNames("overlay-auto z-1 surface-overlay shadow-2 absolute right-0 w-20rem animation-duration-150 animation-ease-in-out", { "hidden" : !isHelpSidebarVisible })}
        style={{ top: "60px", height: "calc(100% - 60px)" }}
      >
        <div className="flex flex-column h-full p-4">
          <span className="text-xl font-medium text-900 mb-3">Help bar</span>
          <div className="border-2 border-dashed surface-border border-round surface-section flex-auto"></div>
        </div>
      </div>
      </div>
        </ProjectLayout>
    );
};

const mapState = (state) => {
    const { user, isLoggedIn } = state.auth;
    return { user, isLoggedIn };
};

const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(SinglePersonalinformationPage);
