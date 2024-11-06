import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Tag } from 'primereact/tag';
import moment from "moment";
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';


const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = {};
    for (const key in errorObj.errors) {
        if (Object.hasOwnProperty.call(errorObj.errors, key)) {
            const element = errorObj.errors[key];
            if (element?.message) {
                errMsg.push(element.message);
            }
        }
    }
    return errMsg.length ? errMsg : errorObj.message ? errorObj.message : null;
};

const ContactInformationCreateDialogComponent = (props) => {
    const [_entity, set_entity] = useState({});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const urlParams = useParams();
    const [name, setName] = useState([])
const [relationship, setRelationship] = useState([])
const [emergencyContactRelationship, setEmergencyContactRelationship] = useState([])

    useEffect(() => {
        set_entity(props.entity);
    }, [props.entity, props.show]);

     useEffect(() => {
                    //on mount users
                    client
                        .service("users")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleUsersId } })
                        .then((res) => {
                            setName(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Users", type: "error", message: error.message || "Failed get users" });
                        });
                }, []);
 useEffect(() => {
                    //on mount relationship
                    client
                        .service("relationship")
                        .find({ query: { $limit: 10000, $sort: { createdAt: -1 }, _id : urlParams.singleRelationshipId } })
                        .then((res) => {
                            setRelationship(res.data.map((e) => { return { name: e['name'], value: e._id }}));
                        })
                        .catch((error) => {
                            console.log({ error });
                            props.alert({ title: "Relationship", type: "error", message: error.message || "Failed get relationship" });
                        });
                }, []);

    const onSave = async () => {
        let _data = {
            name: _entity?.name?._id,
fullCorrespondenceAddress: _entity?.fullCorrespondenceAddress,
state: _entity?.state,
country: _entity?.country,
studentMobileNumber: _entity?.studentMobileNumber,
studentemail: _entity?.studentemail,
permanentAddress: _entity?.permanentAddress,
parentGuardianName: _entity?.parentGuardianName,
relationship: _entity?.relationship?._id,
parentGuardianNumber: _entity?.parentGuardianNumber,
parentGuardianEmail: _entity?.parentGuardianEmail,
parentGuardianOfficeNumber: _entity?.parentGuardianOfficeNumber,
monthlyHouseholdIncome: _entity?.monthlyHouseholdIncome,
emergencyContactName: _entity?.emergencyContactName,
emergencyContactNumber: _entity?.emergencyContactNumber,
emergencyContactRelationship: _entity?.emergencyContactRelationship?._id,
emergencyContactEmail: _entity?.emergencyContactEmail,
        };

        setLoading(true);
        try {
            
        await client.service("contactInformation").patch(_entity._id, _data);
        const eagerResult = await client
            .service("contactInformation")
            .find({ query: { $limit: 10000 ,  _id :  { $in :[_entity._id]}, $populate : [
                {
                    path : "name",
                    service : "users",
                    select:["name"]},{
                    path : "relationship",
                    service : "relationship",
                    select:["name"]}
            ] }});
        props.onHide();
        props.alert({ type: "success", title: "Edit info", message: "Info contactInformation updated successfully" });
        props.onEditResult(eagerResult.data[0]);
        } catch (error) {
            console.log("error", error);
            setError(getSchemaValidationErrorsStrings(error) || "Failed to update info");
            props.alert({ type: "error", title: "Edit info", message: "Failed to update info" });
        }
        setLoading(false);
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="save" className="p-button-text no-focus-effect" onClick={onSave} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const setValByKey = (key, val) => {
        let new_entity = { ..._entity, [key]: val };
        set_entity(new_entity);
        setError({});
    };

    const nameOptions = name.map((elem) => ({ name: elem.name, value: elem.value }));
const relationshipOptions = relationship.map((elem) => ({ name: elem.name, value: elem.value }));
const emergencyContactRelationshipOptions = emergencyContactRelationship.map((elem) => ({ name: elem.name, value: elem.value }));

    return (
        <Dialog header="Edit Contact Information" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div className="grid p-fluid overflow-y-auto"
            style={{ maxWidth: "55vw" }} role="contactInformation-edit-dialog-component">
                <div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="name">Name:</label>
                <Dropdown id="name" value={_entity?.name?._id} optionLabel="name" optionValue="value" options={nameOptions} onChange={(e) => setValByKey("name", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["name"]) && (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="fullCorrespondenceAddress">Full Correspondence Address:</label>
                <InputText id="fullCorrespondenceAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.fullCorrespondenceAddress} onChange={(e) => setValByKey("fullCorrespondenceAddress", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["fullCorrespondenceAddress"]) && (
              <p className="m-0" key="error-fullCorrespondenceAddress">
                {error["fullCorrespondenceAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="state">State:</label>
                <InputText id="state" className="w-full mb-3 p-inputtext-sm" value={_entity?.state} onChange={(e) => setValByKey("state", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["state"]) && (
              <p className="m-0" key="error-state">
                {error["state"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="country">Country:</label>
                <InputText id="country" className="w-full mb-3 p-inputtext-sm" value={_entity?.country} onChange={(e) => setValByKey("country", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["country"]) && (
              <p className="m-0" key="error-country">
                {error["country"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="studentMobileNumber">Student Mobile Number:</label>
                <InputText id="studentMobileNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.studentMobileNumber} onChange={(e) => setValByKey("studentMobileNumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["studentMobileNumber"]) && (
              <p className="m-0" key="error-studentMobileNumber">
                {error["studentMobileNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="studentemail">Student Email:</label>
                <InputText id="studentemail" className="w-full mb-3 p-inputtext-sm" value={_entity?.studentemail} onChange={(e) => setValByKey("studentemail", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["studentemail"]) && (
              <p className="m-0" key="error-studentemail">
                {error["studentemail"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="permanentAddress">Permanent Address:</label>
                <InputText id="permanentAddress" className="w-full mb-3 p-inputtext-sm" value={_entity?.permanentAddress} onChange={(e) => setValByKey("permanentAddress", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["permanentAddress"]) && (
              <p className="m-0" key="error-permanentAddress">
                {error["permanentAddress"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parentGuardianName">Parent Guardian Name:</label>
                <InputText id="parentGuardianName" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentGuardianName} onChange={(e) => setValByKey("parentGuardianName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentGuardianName"]) && (
              <p className="m-0" key="error-parentGuardianName">
                {error["parentGuardianName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="relationship">Relationship:</label>
                <Dropdown id="relationship" value={_entity?.relationship?._id} optionLabel="name" optionValue="value" options={relationshipOptions} onChange={(e) => setValByKey("relationship", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["relationship"]) && (
              <p className="m-0" key="error-relationship">
                {error["relationship"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parentGuardianNumber">Parent Guardian Number:</label>
                <InputText id="parentGuardianNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentGuardianNumber} onChange={(e) => setValByKey("parentGuardianNumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentGuardianNumber"]) && (
              <p className="m-0" key="error-parentGuardianNumber">
                {error["parentGuardianNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parentGuardianEmail">Parent Guardian Email:</label>
                <InputText id="parentGuardianEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentGuardianEmail} onChange={(e) => setValByKey("parentGuardianEmail", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentGuardianEmail"]) && (
              <p className="m-0" key="error-parentGuardianEmail">
                {error["parentGuardianEmail"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="parentGuardianOfficeNumber">Parent Guardian Office Number:</label>
                <InputText id="parentGuardianOfficeNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.parentGuardianOfficeNumber} onChange={(e) => setValByKey("parentGuardianOfficeNumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["parentGuardianOfficeNumber"]) && (
              <p className="m-0" key="error-parentGuardianOfficeNumber">
                {error["parentGuardianOfficeNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="monthlyHouseholdIncome">Monthly Household Income:</label>
                <InputText id="monthlyHouseholdIncome" className="w-full mb-3 p-inputtext-sm" value={_entity?.monthlyHouseholdIncome} onChange={(e) => setValByKey("monthlyHouseholdIncome", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["monthlyHouseholdIncome"]) && (
              <p className="m-0" key="error-monthlyHouseholdIncome">
                {error["monthlyHouseholdIncome"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emergencyContactName">Emergency Contact Name:</label>
                <InputText id="emergencyContactName" className="w-full mb-3 p-inputtext-sm" value={_entity?.emergencyContactName} onChange={(e) => setValByKey("emergencyContactName", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emergencyContactName"]) && (
              <p className="m-0" key="error-emergencyContactName">
                {error["emergencyContactName"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emergencyContactNumber">Emergency Contact Number:</label>
                <InputText id="emergencyContactNumber" className="w-full mb-3 p-inputtext-sm" value={_entity?.emergencyContactNumber} onChange={(e) => setValByKey("emergencyContactNumber", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emergencyContactNumber"]) && (
              <p className="m-0" key="error-emergencyContactNumber">
                {error["emergencyContactNumber"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emergencyContactRelationship">Emergency Contact Relationship:</label>
                <Dropdown id="emergencyContactRelationship" value={_entity?.emergencyContactRelationship?._id} optionLabel="name" optionValue="value" options={emergencyContactRelationshipOptions} onChange={(e) => setValByKey("emergencyContactRelationship", {_id : e.value})}  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emergencyContactRelationship"]) && (
              <p className="m-0" key="error-emergencyContactRelationship">
                {error["emergencyContactRelationship"]}
              </p>
            )}
          </small>
            </div>
<div className="col-12 md:col-6 field">
            <span className="align-items-center">
                <label htmlFor="emergencyContactEmail">Emergency Contact Email:</label>
                <InputText id="emergencyContactEmail" className="w-full mb-3 p-inputtext-sm" value={_entity?.emergencyContactEmail} onChange={(e) => setValByKey("emergencyContactEmail", e.target.value)}  required  />
            </span>
            <small className="p-error">
            {!_.isEmpty(error["emergencyContactEmail"]) && (
              <p className="m-0" key="error-emergencyContactEmail">
                {error["emergencyContactEmail"]}
              </p>
            )}
          </small>
            </div>
                <div className="col-12">&nbsp;</div>
                <small className="p-error">
                {Array.isArray(Object.keys(error))
                ? Object.keys(error).map((e, i) => (
                    <p className="m-0" key={i}>
                        {e}: {error[e]}
                    </p>
                    ))
                : error}
            </small>
            </div>
        </Dialog>
    );
};

const mapState = (state) => {
    const { user } = state.auth;
    return { user };
};
const mapDispatch = (dispatch) => ({
    alert: (data) => dispatch.toast.alert(data),
});

export default connect(mapState, mapDispatch)(ContactInformationCreateDialogComponent);
