import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import client from "../../../services/restClient";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import programmedetailsFakerFactory from "./programmedetailsFakerFactory";

const getSchemaValidationErrorsStrings = (errorObj) => {
    let errMsg = [];
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

const ProgrammedetailsFakerDialogComponent = (props) => {
    const [fakerCount, setFakerCount] = useState(1);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nameIds, setnameIds] = useState();
const [campusIds, setcampusIds] = useState();
const [locationIds, setlocationIds] = useState();
const [programmelevelIds, setprogrammelevelIds] = useState();
const [programmeIds, setprogrammeIds] = useState();
const [intakeIds, setintakeIds] = useState();


    useEffect(() => {
        setFakerCount(1);
       
        client.service("users")
                        .find({ query: { $select: ["_id","name"] } })
                        .then((data) => {
                        setnameIds(data.data);
                        });
client.service("campus")
                        .find({ query: { $select: ["_id","name"] } })
                        .then((data) => {
                        setcampusIds(data.data);
                        });
client.service("location")
                        .find({ query: { $select: ["_id","name"] } })
                        .then((data) => {
                        setlocationIds(data.data);
                        });
client.service("programmelevel")
                        .find({ query: { $select: ["_id","name"] } })
                        .then((data) => {
                        setprogrammelevelIds(data.data);
                        });
client.service("courses")
                        .find({ query: { $select: ["_id","programme"] } })
                        .then((data) => {
                        setprogrammeIds(data.data);
                        });
client.service("intake")
                        .find({ query: { $select: ["_id","name"] } })
                        .then((data) => {
                        setintakeIds(data.data);
                        });

    }, [props.show]);

    const onRun = async () => {
        let fakeData = programmedetailsFakerFactory(props.user,fakerCount,nameIds,campusIds,locationIds,programmelevelIds,programmeIds,intakeIds);

        setLoading(true);
        const promises = fakeData.map((elem) => client.service("programmedetails").create(elem));
        const results = await Promise.all(promises.map((p) => p.catch((e) => e)));
        const errors = results.filter((result) => result instanceof Error).map((err, index) => `[${index}] ${getSchemaValidationErrorsStrings(err) || "Failed to create fake record"}`);
        const validResults = results.filter((result) => !(result instanceof Error));
        props.alert({ type: "success", title: "Faker", message: "Faker ran successfully" });
        props.onFakerCreateResults(validResults);
        setErrors(errors);
        setLoading(false);
        if (!(errors && errors.length)) props.onHide();
    };

    const renderFooter = () => (
        <div className="flex justify-content-end">
            <Button label="run" className="p-button-text no-focus-effect" onClick={onRun} loading={loading} />
            <Button label="close" className="p-button-text no-focus-effect p-button-secondary" onClick={props.onHide} />
        </div>
    );

    const onChangeFakerCountHandler = (e) => {
        let val = e.target.value;
        val = Number(val);
        if (val < 1) val = 1;
        if (val > 100) val = 100;
        setFakerCount(val);
    };

    return (
        <Dialog header="Faker" visible={props.show} closable={false} onHide={props.onHide} modal style={{ width: "40vw" }} className="min-w-max" footer={renderFooter()} resizable={false}>
            <div>
                <div>
                    <p className="m-0">Faker count:</p>
                    <InputText className="w-full mb-3" type="number" value={fakerCount} onChange={onChangeFakerCountHandler} />
                </div>

                <small className="p-error">
                    {Array.isArray(errors)
                        ? errors.map((e, i) => (
                              <p className="m-0" key={i}>
                                  {e}
                              </p>
                          ))
                        : errors}
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

export default connect(mapState, mapDispatch)(ProgrammedetailsFakerDialogComponent);
