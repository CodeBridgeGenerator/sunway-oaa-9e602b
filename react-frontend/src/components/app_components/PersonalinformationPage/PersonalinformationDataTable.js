import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import React, { useState, useRef } from "react";
import _ from "lodash";
import { Button } from "primereact/button";

import { useParams } from "react-router-dom";
import moment from "moment";
import UploadService from "../../../services/UploadService";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import DownloadCSV from "../../../utils/DownloadCSV";
import InboxCreateDialogComponent from "../../cb_components/InboxPage/InboxCreateDialogComponent";
import InviteIcon from "../../../assets/media/Invite.png";
import ExportIcon from "../../../assets/media/Export & Share.png";
import CopyIcon from "../../../assets/media/Clipboard.png";
import DuplicateIcon from "../../../assets/media/Duplicate.png";
import DeleteIcon from "../../../assets/media/Trash.png";

const PersonalinformationDataTable = ({
  items,
  fields,
  onEditRow,
  onRowDelete,
  onRowClick,
  searchDialog,
  setSearchDialog,
  showUpload,
  setShowUpload,
  showFilter,
  setShowFilter,
  showColumns,
  setShowColumns,
  onClickSaveFilteredfields,
  selectedFilterFields,
  setSelectedFilterFields,
  selectedHideFields,
  setSelectedHideFields,
  onClickSaveHiddenfields,
  loading,
  user,
  selectedDelete,
  setSelectedDelete,
  onCreateResult,
}) => {
  const dt = useRef(null);
  const urlParams = useParams();
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [data, setData] = useState([]);

  const dropdownTemplate0 = (rowData, { rowIndex }) => (
    <p>{rowData.name?.name}</p>
  );
  const pTemplate1 = (rowData, { rowIndex }) => <p>{rowData.fullName}</p>;
  const pTemplate2 = (rowData, { rowIndex }) => <p>{rowData.firstName}</p>;
  const pTemplate3 = (rowData, { rowIndex }) => <p>{rowData.surname}</p>;
  const pTemplate4 = (rowData, { rowIndex }) => <p>{rowData.Nationality}</p>;
  const pTemplate5 = (rowData, { rowIndex }) => <p>{rowData.NRIC}</p>;
  const p_dateTemplate6 = (rowData, { rowIndex }) => (
    <p>{new Date(rowData.dateofBirth).toLocaleDateString()}</p>
  );
  const dropdownTemplate7 = (rowData, { rowIndex }) => (
    <p>{rowData.Gender?.name}</p>
  );
  const dropdownTemplate8 = (rowData, { rowIndex }) => (
    <p>{rowData.maritalStatus?.name}</p>
  );
  const dropdownTemplate9 = (rowData, { rowIndex }) => (
    <p>{rowData.religion?.name}</p>
  );
  const dropdownTemplate10 = (rowData, { rowIndex }) => (
    <p>{rowData.race?.name}</p>
  );
  const tickTemplate11 = (rowData, { rowIndex }) => (
    <i
      className={`pi ${rowData.specialConditions ? "pi-check" : "pi-times"}`}
    ></i>
  );
  const tickTemplate12 = (rowData, { rowIndex }) => (
    <i className={`pi ${rowData.formerSunway ? "pi-check" : "pi-times"}`}></i>
  );
  const editTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onEditRow(rowData, rowIndex)}
      icon={`pi ${rowData.isEdit ? "pi-check" : "pi-pencil"}`}
      className={`p-button-rounded p-button-text ${rowData.isEdit ? "p-button-success" : "p-button-warning"}`}
    />
  );
  const deleteTemplate = (rowData, { rowIndex }) => (
    <Button
      onClick={() => onRowDelete(rowData._id)}
      icon="pi pi-times"
      className="p-button-rounded p-button-danger p-button-text"
    />
  );

  const checkboxTemplate = (rowData) => (
    <Checkbox
      checked={selectedItems.some((item) => item._id === rowData._id)}
      onChange={(e) => {
        let _selectedItems = [...selectedItems];

        if (e.checked) {
          _selectedItems.push(rowData);
        } else {
          _selectedItems = _selectedItems.filter(
            (item) => item._id !== rowData._id,
          );
        }
        setSelectedItems(_selectedItems);
      }}
    />
  );
  const deselectAllRows = () => {
    // Logic to deselect all selected rows
    setSelectedItems([]); // Assuming setSelectedItems is used to manage selected items state
  };

  const handleDelete = async () => {
    if (!selectedItems || selectedItems.length === 0) return;

    try {
      const promises = selectedItems.map((item) =>
        client.service("companies").remove(item._id),
      );
      await Promise.all(promises);
      const updatedData = data.filter(
        (item) => !selectedItems.find((selected) => selected._id === item._id),
      );
      setData(updatedData);
      setSelectedDelete(selectedItems.map((item) => item._id));

      deselectAllRows();
    } catch (error) {
      console.error("Failed to delete selected records", error);
    }
  };

  const handleMessage = () => {
    setShowDialog(true); // Open the dialog
  };

  const handleHideDialog = () => {
    setShowDialog(false); // Close the dialog
  };

  return (
    <>
      <DataTable
        value={items}
        ref={dt}
        removableSort
        onRowClick={onRowClick}
        scrollable
        rowHover
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[10, 50, 250, 500]}
        size={"small"}
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowClassName="cursor-pointer"
        alwaysShowPaginator={!urlParams.singleUsersId}
        selection={selectedItems}
        onSelectionChange={(e) => setSelectedItems(e.value)}
        onCreateResult={onCreateResult}
      >
        <Column
          selectionMode="multiple"
          headerStyle={{ width: "3rem" }}
          body={checkboxTemplate}
        />
        <Column
          field="name"
          header="Name"
          body={dropdownTemplate0}
          filter={selectedFilterFields.includes("name")}
          hidden={selectedHideFields?.includes("name")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="fullName"
          header="Full Name"
          body={pTemplate1}
          filter={selectedFilterFields.includes("fullName")}
          hidden={selectedHideFields?.includes("fullName")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="firstName"
          header="First Name"
          body={pTemplate2}
          filter={selectedFilterFields.includes("firstName")}
          hidden={selectedHideFields?.includes("firstName")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="surname"
          header="Surname"
          body={pTemplate3}
          filter={selectedFilterFields.includes("surname")}
          hidden={selectedHideFields?.includes("surname")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="Nationality"
          header="Nationality"
          body={pTemplate4}
          filter={selectedFilterFields.includes("Nationality")}
          hidden={selectedHideFields?.includes("Nationality")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="NRIC"
          header="NRIC"
          body={pTemplate5}
          filter={selectedFilterFields.includes("NRIC")}
          hidden={selectedHideFields?.includes("NRIC")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="dateofBirth"
          header="Date of Birth"
          body={p_dateTemplate6}
          filter={selectedFilterFields.includes("dateofBirth")}
          hidden={selectedHideFields?.includes("dateofBirth")}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="Gender"
          header="Gender"
          body={dropdownTemplate7}
          filter={selectedFilterFields.includes("Gender")}
          hidden={selectedHideFields?.includes("Gender")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="maritalStatus"
          header="Marital Status"
          body={dropdownTemplate8}
          filter={selectedFilterFields.includes("maritalStatus")}
          hidden={selectedHideFields?.includes("maritalStatus")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="religion"
          header="Religion"
          body={dropdownTemplate9}
          filter={selectedFilterFields.includes("religion")}
          hidden={selectedHideFields?.includes("religion")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="race"
          header="Race"
          body={dropdownTemplate10}
          filter={selectedFilterFields.includes("race")}
          hidden={selectedHideFields?.includes("race")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="specialConditions"
          header="Special Conditions"
          body={tickTemplate11}
          filter={selectedFilterFields.includes("specialConditions")}
          hidden={selectedHideFields?.includes("specialConditions")}
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="formerSunway"
          header="Former Sunway"
          body={tickTemplate12}
          filter={selectedFilterFields.includes("formerSunway")}
          hidden={selectedHideFields?.includes("formerSunway")}
          style={{ minWidth: "8rem" }}
        />
        <Column header="Edit" body={editTemplate} />
        <Column header="Delete" body={deleteTemplate} />
      </DataTable>

      {selectedItems.length > 0 ? (
        <div
          className="card center"
          style={{
            width: "51rem",
            margin: "20px auto 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px",
            fontSize: "14px",
            fontFamily: "Arial, sans-serif",
            color: "#2A4454",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #2A4454",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {selectedItems.length} selected
            <span
              className="pi pi-times"
              style={{
                cursor: "pointer",
                marginLeft: "10px",
                color: "#2A4454",
              }}
              onClick={() => {
                deselectAllRows();
              }}
            />
          </div>

          {/* New buttons section */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Copy button */}
            <Button
              label="Copy"
              labelposition="right"
              icon={
                <img
                  src={CopyIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Copy"
              // onClick={handleCopy}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Duplicate button */}
            <Button
              label="Duplicate"
              labelposition="right"
              icon={
                <img
                  src={DuplicateIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Duplicate"
              // onClick={handleDuplicate}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Export button */}
            <Button
              label="Export"
              labelposition="right"
              icon={
                <img
                  src={ExportIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              // tooltip="Export"
              // onClick={handleExport}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* Message button */}
            <Button
              label="Message"
              labelposition="right"
              icon={
                <img
                  src={InviteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleMessage}
              className="p-button-rounded p-button-text"
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                marginRight: "8px",
                gap: "4px",
              }}
            />

            {/* InboxCreateDialogComponent */}
            <InboxCreateDialogComponent
              show={showDialog}
              onHide={handleHideDialog}
              serviceInbox="companies"
              onCreateResult={onCreateResult}
              // selectedItemsId={selectedItems.map(item => item._id)}
              selectedItemsId={selectedItems}
            />

            {/* <div style={{ display: 'flex', alignItems: 'center' }}> */}
            <Button
              label="Delete"
              labelposition="right"
              icon={
                <img
                  src={DeleteIcon}
                  style={{ marginRight: "4px", width: "1em", height: "1em" }}
                />
              }
              onClick={handleDelete}
              style={{
                backgroundColor: "white",
                color: "#2A4454",
                border: "1px solid transparent",
                transition: "border-color 0.3s",
                fontSize: "14px",
                fontFamily: "Arial, sans-serif",
                gap: "4px",
              }}
            />
          </div>
        </div>
      ) : null}

      <Dialog
        header="Upload Personalinformation Data"
        visible={showUpload}
        onHide={() => setShowUpload(false)}
      >
        <UploadService
          user={user}
          serviceName="personalinformation"
          onUploadComplete={() => {
            setShowUpload(false); // Close the dialog after upload
          }}
        />
      </Dialog>

      <Dialog
        header="Search Personalinformation"
        visible={searchDialog}
        onHide={() => setSearchDialog(false)}
      >
        Search
      </Dialog>
      <Dialog
        header="Filter Users"
        visible={showFilter}
        onHide={() => setShowFilter(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedFilterFields}
            onChange={(e) => setSelectedFilterFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedFilterFields);
            onClickSaveFilteredfields(selectedFilterFields);
            setSelectedFilterFields(selectedFilterFields);
            setShowFilter(false);
          }}
        ></Button>
      </Dialog>

      <Dialog
        header="Hide Columns"
        visible={showColumns}
        onHide={() => setShowColumns(false)}
      >
        <div className="card flex justify-content-center">
          <MultiSelect
            value={selectedHideFields}
            onChange={(e) => setSelectedHideFields(e.value)}
            options={fields}
            optionLabel="name"
            optionValue="value"
            filter
            placeholder="Select Fields"
            maxSelectedLabels={6}
            className="w-full md:w-20rem"
          />
        </div>
        <Button
          text
          label="save as pref"
          onClick={() => {
            console.log(selectedHideFields);
            onClickSaveHiddenfields(selectedHideFields);
            setSelectedHideFields(selectedHideFields);
            setShowColumns(false);
          }}
        ></Button>
      </Dialog>
    </>
  );
};

export default PersonalinformationDataTable;
