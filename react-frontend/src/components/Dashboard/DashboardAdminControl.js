import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import ProjectLayout from "../Layouts/ProjectLayout";

export const LandingPage = (props) => {
  const [ActiveTab, setActiveTab] = useState(0);
  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    fetchCacheData();
  }, []);

  const fetchCacheData = async () => {
    await props.get();
  };

  // Dummy recent items and pinned items for courses
  const recentItems = props.cache.pastTabsAry?.map((i) => ({
    text: i.label,
    subtext: "Recently Viewed Course",
    src: i.src,
  }));

  const pinnedItems = props.cache.pastTabsAry?.map((i) => ({
    text: i.label,
    subtext: "Pinned Course",
    src: i.icon,
  }));

  return (
    <ProjectLayout>
      <div className="p-4">
        {/* Welcome Banner */}
        <div className="surface-border border-round surface-card mb-4 p-4 text-center">
          <h1>Welcome, {props.user.name}!</h1>
          <p>We're glad to have you in the Online Course Application Portal.</p>
        </div>

        {/* Introduction Section */}
        <div className="surface-border border-round surface-card mt-3 p-4">
          <h2>Explore Our Courses</h2>
          <p>
            Here you can browse, apply to, and manage your courses with ease.
            Below are some quick links to your recently viewed and pinned
            courses.
          </p>
        </div>

        {/* Recent Courses and Pinned Courses Section */}
        <div className="surface-border border-round surface-card mt-3 p-4">
          <div className="grid">
            {/* Recent Courses */}
            <div className="col-12 md:col-6 mb-3">
              <h3>Recently Viewed Courses</h3>
              <ul>
                {recentItems?.map((item, index) => (
                  <li key={index}>
                    <img src={item.src} alt={item.text} width={20} />{" "}
                    {item.text} - {item.subtext}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pinned Courses */}
            <div className="col-12 md:col-6 mb-3">
              <h3>Pinned Courses</h3>
              <ul>
                {pinnedItems?.map((item, index) => (
                  <li key={index}>
                    <img src={item.src} alt={item.text} width={20} />{" "}
                    {item.text} - {item.subtext}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Button Section */}
        <div className="mt-4 flex justify-content-center">
          <button
            className="p-button p-button-rounded p-button-outlined mr-2"
            onClick={() => navigate("/coloredpills")}
          >
            Option A
          </button>
          <button
            className="p-button p-button-rounded p-button-outlined mr-2"
            onClick={() => navigate("/cardwithsidenav")}
          >
            Option B
          </button>
          <button
            className="p-button p-button-rounded p-button-outlined"
            onClick={() => navigate("/commandcentre")}
          >
            Option C
          </button>
        </div>
      </div>
    </ProjectLayout>
  );
};

const mapState = (state) => {
  const { user } = state.auth;
  const { cache } = state.cache;
  return { user, cache };
};

const mapDispatch = (dispatch) => ({
  get: () => dispatch.cache.get(),
});

export default connect(mapState, mapDispatch)(LandingPage);
