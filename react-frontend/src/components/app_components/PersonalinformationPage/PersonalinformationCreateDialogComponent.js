import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import client from "../../../services/restClient";
import _ from "lodash";
import initilization from "../../../utils/init";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Checkbox } from "primereact/checkbox";

const getSchemaValidationErrorsStrings = (errorObj) => {
  let errMsg = {};
  for (const key in errorObj.errors) {
    if (Object.hasOwnProperty.call(errorObj.errors, key)) {
      const element = errorObj.errors[key];
      if (element?.message) {
        errMsg[key] = element.message;
      }
    }
  }
  return errMsg.length
    ? errMsg
    : errorObj.message
      ? { error: errorObj.message }
      : {};
};

const PersonalinformationCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [name, setName] = useState([]);
  const [Gender, setGender] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [religion, setReligion] = useState([]);
  const [race, setRace] = useState([]);

  useEffect(() => {
    let init = { specialConditions: false, formerSunway: false };
    if (!_.isEmpty(props?.entity)) {
      init = initilization(
        { ...props?.entity, ...init },
        [name, Gender, maritalStatus, religion, race],
        setError,
      );
    }
    set_entity({ ...init });
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (_.isEmpty(_entity?.fullName)) {
      error["fullName"] = `Full Name field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.firstName)) {
      error["firstName"] = `First Name field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.surname)) {
      error["surname"] = `Surname field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.Nationality)) {
      error["Nationality"] = `Nationality field is required`;
      ret = false;
    }

    if (_.isEmpty(_entity?.NRIC)) {
      error["NRIC"] = `NRIC field is required`;
      ret = false;
    }
    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      name: _entity?.name?._id,
      fullName: _entity?.fullName,
      firstName: _entity?.firstName,
      surname: _entity?.surname,
      Nationality: _entity?.Nationality,
      NRIC: _entity?.NRIC,
      dateofBirth: _entity?.dateofBirth,
      Gender: _entity?.Gender?._id,
      maritalStatus: _entity?.maritalStatus?._id,
      religion: _entity?.religion?._id,
      race: _entity?.race?._id,
      specialConditions: _entity?.specialConditions || false,
      formerSunway: _entity?.formerSunway || false,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("personalinformation").create(_data);
      const eagerResult = await client.service("personalinformation").find({
        query: {
          $limit: 10000,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "name",
              service: "users",
              select: ["name"],
            },
            {
              path: "Gender",
              service: "gender",
              select: ["name"],
            },
            {
              path: "maritalStatus",
              service: "maritalStatus",
              select: ["name"],
            },
            {
              path: "religion",
              service: "religion",
              select: ["name"],
            },
            {
              path: "race",
              service: "race",
              select: ["name"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Personal information updated successfully",
      });
      props.onCreateResult(eagerResult.data[0]);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Personal information",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    // on mount users
    client
      .service("users")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleUsersId,
        },
      })
      .then((res) => {
        setName(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Users",
          type: "error",
          message: error.message || "Failed get users",
        });
      });
  }, []);

  useEffect(() => {
    // on mount gender
    client
      .service("gender")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleGenderId,
        },
      })
      .then((res) => {
        setGender(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Gender",
          type: "error",
          message: error.message || "Failed get gender",
        });
      });
  }, []);

  useEffect(() => {
    // on mount maritalStatus
    client
      .service("maritalStatus")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleMaritalStatusId,
        },
      })
      .then((res) => {
        setMaritalStatus(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "MaritalStatus",
          type: "error",
          message: error.message || "Failed get maritalStatus",
        });
      });
  }, []);

  useEffect(() => {
    // on mount religion
    client
      .service("religion")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleReligionId,
        },
      })
      .then((res) => {
        setReligion(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Religion",
          type: "error",
          message: error.message || "Failed get religion",
        });
      });
  }, []);

  useEffect(() => {
    // on mount race
    client
      .service("race")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleRaceId,
        },
      })
      .then((res) => {
        setRace(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Race",
          type: "error",
          message: error.message || "Failed get race",
        });
      });
  }, []);

  const renderFooter = () => (
    <div className="flex justify-content-end">
      <Button
        label="save"
        className="p-button-text no-focus-effect"
        onClick={onSave}
        loading={loading}
      />
      <Button
        label="close"
        className="p-button-text no-focus-effect p-button-secondary"
        onClick={props.onHide}
      />
    </div>
  );

  const setValByKey = (key, val) => {
    let new_entity = { ..._entity, [key]: val };
    set_entity(new_entity);
    setError({});
  };

  const nameOptions = name.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const GenderOptions = Gender.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const maritalStatusOptions = maritalStatus.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const religionOptions = religion.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const raceOptions = race.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Create Personal information"
      visible={props.show}
      closable={false}
      onHide={props.onHide}
      modal
      style={{ width: "40vw" }}
      className="min-w-max"
      footer={renderFooter()}
      resizable={false}
    >
      <div
        className="grid p-fluid overflow-y-auto"
        style={{ maxWidth: "55vw" }}
        role="personalinformation-create-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="name">Name:</label>
            <Dropdown
              id="name"
              value={_entity?.name?._id}
              optionLabel="name"
              optionValue="value"
              options={nameOptions}
              onChange={(e) => setValByKey("name", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["name"]) ? (
              <p className="m-0" key="error-name">
                {error["name"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="fullName">Full Name:</label>
            <InputText
              id="fullName"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.fullName}
              onChange={(e) => setValByKey("fullName", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["fullName"]) ? (
              <p className="m-0" key="error-fullName">
                {error["fullName"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="firstName">First Name:</label>
            <InputText
              id="firstName"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.firstName}
              onChange={(e) => setValByKey("firstName", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["firstName"]) ? (
              <p className="m-0" key="error-firstName">
                {error["firstName"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="surname">Surname:</label>
            <InputText
              id="surname"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.surname}
              onChange={(e) => setValByKey("surname", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["surname"]) ? (
              <p className="m-0" key="error-surname">
                {error["surname"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="Nationality">Nationality:</label>
            <InputText
              id="Nationality"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.Nationality}
              onChange={(e) => setValByKey("Nationality", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["Nationality"]) ? (
              <p className="m-0" key="error-Nationality">
                {error["Nationality"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="NRIC">NRIC:</label>
            <InputText
              id="NRIC"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.NRIC}
              onChange={(e) => setValByKey("NRIC", e.target.value)}
              required
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["NRIC"]) ? (
              <p className="m-0" key="error-NRIC">
                {error["NRIC"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="dateofBirth">Date of Birth:</label>
            undefined
          </span>
          <small className="p-error">
            {!_.isEmpty(error["dateofBirth"]) ? (
              <p className="m-0" key="error-dateofBirth">
                {error["dateofBirth"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="Gender">Gender:</label>
            <Dropdown
              id="Gender"
              value={_entity?.Gender?._id}
              optionLabel="name"
              optionValue="value"
              options={GenderOptions}
              onChange={(e) => setValByKey("Gender", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["Gender"]) ? (
              <p className="m-0" key="error-Gender">
                {error["Gender"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="maritalStatus">Marital Status:</label>
            <Dropdown
              id="maritalStatus"
              value={_entity?.maritalStatus?._id}
              optionLabel="name"
              optionValue="value"
              options={maritalStatusOptions}
              onChange={(e) => setValByKey("maritalStatus", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["maritalStatus"]) ? (
              <p className="m-0" key="error-maritalStatus">
                {error["maritalStatus"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="religion">Religion:</label>
            <Dropdown
              id="religion"
              value={_entity?.religion?._id}
              optionLabel="name"
              optionValue="value"
              options={religionOptions}
              onChange={(e) => setValByKey("religion", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["religion"]) ? (
              <p className="m-0" key="error-religion">
                {error["religion"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="race">Race:</label>
            <Dropdown
              id="race"
              value={_entity?.race?._id}
              optionLabel="name"
              optionValue="value"
              options={raceOptions}
              onChange={(e) => setValByKey("race", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["race"]) ? (
              <p className="m-0" key="error-race">
                {error["race"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field flex">
          <span className="align-items-center">
            <label htmlFor="specialConditions">Special Conditions:</label>
            <Checkbox
              id="specialConditions"
              className="ml-3"
              checked={_entity?.specialConditions}
              onChange={(e) => setValByKey("specialConditions", e.checked)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["specialConditions"]) ? (
              <p className="m-0" key="error-specialConditions">
                {error["specialConditions"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field flex">
          <span className="align-items-center">
            <label htmlFor="formerSunway">Former Sunway:</label>
            <Checkbox
              id="formerSunway"
              className="ml-3"
              checked={_entity?.formerSunway}
              onChange={(e) => setValByKey("formerSunway", e.checked)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["formerSunway"]) ? (
              <p className="m-0" key="error-formerSunway">
                {error["formerSunway"]}
              </p>
            ) : null}
          </small>
        </div>
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

export default connect(
  mapState,
  mapDispatch,
)(PersonalinformationCreateDialogComponent);
