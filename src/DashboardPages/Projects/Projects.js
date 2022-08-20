import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import Project from "../../Components/DahsboardProjects/Project";
import SideNav from "../../Components/DashboardNav/SideNav";
import ProjectForm from "../../Components/DahsboardProjects/ProjectForm";
import "./Projects.css";
import Carousel from "../../Components/Carousel/Carousel";
import Title from "../../Components/Title/Title";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";

const DashboardPortfolio = () => {
  let [projects, setProjects] = useState([]);
  let [refresh, setRefresh] = useState(false);
  let [load, setLoad] = useState(true);
  let [error, setError] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoad(true);
      const res = await fetch(`${process.env.REACT_APP_BACK_URL}projects`);
      const resJson = await res.json();
      setProjects(resJson);
      setLoad(false);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [refresh]);

  return (
    <div className="AboutDash">
      <HelmetProvider>
        <Helmet>
          <title>Dashboard | Projects</title>
        </Helmet>
      </HelmetProvider>
      <SideNav />
      <div className="project-dashboard-main">
        <Title title="PROJECTS DASHBOARD" />
        {error ? (
          <Error />
        ) : load ? (
          <Loader />
        ) : (
          projects && (
            <div className="dashboard-projectsContainer">
              <h2> CURRENT PROJECTS</h2>
              <div className="current-projects1">
                <Carousel show={3}>
                  {projects.map((ele, i) => {
                    return (
                      <div key={i} className="single-project">
                        <Project
                          key={i}
                          id={ele._id}
                          title={ele.title}
                          image={`${process.env.REACT_APP_BACK_URL}${
                            ele.image.split("/")[1]
                          }`}
                          service={ele.service._id}
                          description={ele.description}
                          refresh={refresh}
                          setRefresh={setRefresh}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <div className="current-projects2">
                <Carousel show={2}>
                  {projects.map((ele, i) => {
                    return (
                      <div key={i} className="single-project">
                        <Project
                          key={i}
                          id={ele._id}
                          title={ele.title}
                          image={`${process.env.REACT_APP_BACK_URL}${
                            ele.image.split("/")[1]
                          }`}
                          service={ele.service._id}
                          description={ele.description}
                          refresh={refresh}
                          setRefresh={setRefresh}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <div className="current-projects3">
                <Carousel show={1}>
                  {projects.map((ele, i) => {
                    return (
                      <div key={i} className="single-project">
                        <Project
                          key={i}
                          id={ele._id}
                          title={ele.title}
                          image={`${process.env.REACT_APP_BACK_URL}${
                            ele.image.split("/")[1]
                          }`}
                          service={ele.service._id}
                          description={ele.description}
                          refresh={refresh}
                          setRefresh={setRefresh}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
            </div>
          )
        )}
        {!load && (
          <div
            className="dashboard-projectsContainer"
            style={{ marginTop: "50px" }}
          >
            <h2>ADD NEW PROJECT</h2>
            <ProjectForm refresh={refresh} setRefresh={setRefresh} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPortfolio;
