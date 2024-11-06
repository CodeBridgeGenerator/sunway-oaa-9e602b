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

const CoursesCreateDialogComponent = (props) => {
  const [_entity, set_entity] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const urlParams = useParams();
  const [campus, setCampus] = useState([]);
  const [location, setLocation] = useState([]);
  const [programmelevel, setProgrammelevel] = useState([]);
  const [intake, setIntake] = useState([]);
  const [school, setSchool] = useState([]);

  useEffect(() => {
    let init = {};
    if (!_.isEmpty(props?.entity)) {
      init = initilization(
        { ...props?.entity, ...init },
        [campus, location, programmelevel, intake, school],
        setError,
      );
    }
    set_entity({ ...init });
  }, [props.show]);

  const validate = () => {
    let ret = true;
    const error = {};

    if (!ret) setError(error);
    return ret;
  };

  const onSave = async () => {
    if (!validate()) return;
    let _data = {
      campus: _entity?.campus?._id,
      location: _entity?.location?._id,
      programmelevel: _entity?.programmelevel?._id,
      programme: _entity?.programme,
      intake: _entity?.intake?._id,
      school: _entity?.school?._id,
      createdBy: props.user._id,
      updatedBy: props.user._id,
    };

    setLoading(true);

    try {
      const result = await client.service("courses").create(_data);
      const eagerResult = await client.service("courses").find({
        query: {
          $limit: 10000,
          _id: { $in: [result._id] },
          $populate: [
            {
              path: "campus",
              service: "campus",
              select: ["name"],
            },
            {
              path: "location",
              service: "location",
              select: ["name"],
            },
            {
              path: "programmelevel",
              service: "programmelevel",
              select: ["name"],
            },
            {
              path: "intake",
              service: "intake",
              select: ["name"],
            },
            {
              path: "school",
              service: "school",
              select: ["name"],
            },
          ],
        },
      });
      props.onHide();
      props.alert({
        type: "success",
        title: "Create info",
        message: "Info Courses updated successfully",
      });
      props.onCreateResult(eagerResult.data[0]);
    } catch (error) {
      console.log("error", error);
      setError(getSchemaValidationErrorsStrings(error) || "Failed to create");
      props.alert({
        type: "error",
        title: "Create",
        message: "Failed to create in Courses",
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    // on mount campus
    client
      .service("campus")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleCampusId,
        },
      })
      .then((res) => {
        setCampus(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Campus",
          type: "error",
          message: error.message || "Failed get campus",
        });
      });
  }, []);

  useEffect(() => {
    // on mount location
    client
      .service("location")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleLocationId,
        },
      })
      .then((res) => {
        setLocation(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Location",
          type: "error",
          message: error.message || "Failed get location",
        });
      });
  }, []);

  useEffect(() => {
    // on mount programmelevel
    client
      .service("programmelevel")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleProgrammelevelId,
        },
      })
      .then((res) => {
        setProgrammelevel(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Programmelevel",
          type: "error",
          message: error.message || "Failed get programmelevel",
        });
      });
  }, []);

  useEffect(() => {
    // on mount intake
    client
      .service("intake")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleIntakeId,
        },
      })
      .then((res) => {
        setIntake(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "Intake",
          type: "error",
          message: error.message || "Failed get intake",
        });
      });
  }, []);

  useEffect(() => {
    // on mount school
    client
      .service("school")
      .find({
        query: {
          $limit: 10000,
          $sort: { createdAt: -1 },
          _id: urlParams.singleSchoolId,
        },
      })
      .then((res) => {
        setSchool(
          res.data.map((e) => {
            return { name: e["name"], value: e._id };
          }),
        );
      })
      .catch((error) => {
        console.log({ error });
        props.alert({
          title: "School",
          type: "error",
          message: error.message || "Failed get school",
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

  const campusOptions = campus.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const locationOptions = location.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const programmelevelOptions = programmelevel.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const intakeOptions = intake.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));
  const schoolOptions = school.map((elem) => ({
    name: elem.name,
    value: elem.value,
  }));

  return (
    <Dialog
      header="Create Courses"
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
        role="courses-create-dialog-component"
      >
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="campus">Campus:</label>
            <Dropdown
              id="campus"
              value={_entity?.campus?._id}
              optionLabel="name"
              optionValue="value"
              options={campusOptions}
              onChange={(e) => setValByKey("campus", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["campus"]) ? (
              <p className="m-0" key="error-campus">
                {error["campus"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="location">Location:</label>
            <Dropdown
              id="location"
              value={_entity?.location?._id}
              optionLabel="name"
              optionValue="value"
              options={locationOptions}
              onChange={(e) => setValByKey("location", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["location"]) ? (
              <p className="m-0" key="error-location">
                {error["location"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="programmelevel">Programmelevel:</label>
            <Dropdown
              id="programmelevel"
              value={_entity?.programmelevel?._id}
              optionLabel="name"
              optionValue="value"
              options={programmelevelOptions}
              onChange={(e) => setValByKey("programmelevel", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["programmelevel"]) ? (
              <p className="m-0" key="error-programmelevel">
                {error["programmelevel"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="programme">Programme:</label>
            <InputText
              id="programme"
              className="w-full mb-3 p-inputtext-sm"
              value={_entity?.programme}
              onChange={(e) => setValByKey("programme", e.target.value)}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["programme"]) ? (
              <p className="m-0" key="error-programme">
                {error["programme"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="intake">Intake:</label>
            <Dropdown
              id="intake"
              value={_entity?.intake?._id}
              optionLabel="name"
              optionValue="value"
              options={intakeOptions}
              onChange={(e) => setValByKey("intake", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["intake"]) ? (
              <p className="m-0" key="error-intake">
                {error["intake"]}
              </p>
            ) : null}
          </small>
        </div>
        <div className="col-12 md:col-6 field">
          <span className="align-items-center">
            <label htmlFor="school">School:</label>
            <Dropdown
              id="school"
              value={_entity?.school?._id}
              optionLabel="name"
              optionValue="value"
              options={schoolOptions}
              onChange={(e) => setValByKey("school", { _id: e.value })}
            />
          </span>
          <small className="p-error">
            {!_.isEmpty(error["school"]) ? (
              <p className="m-0" key="error-school">
                {error["school"]}
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

export default connect(mapState, mapDispatch)(CoursesCreateDialogComponent);
