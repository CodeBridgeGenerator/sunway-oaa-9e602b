import React from "react";
import ProjectLayout from "../../Layouts/ProjectLayout";
import { connect } from "react-redux";
import RelationshipPage from "./RelationshipPage";

const RelationshipProjectLayoutPage = (props) => {
  return (
    <ProjectLayout>
      <RelationshipPage />
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

export default connect(mapState, mapDispatch)(RelationshipProjectLayoutPage);