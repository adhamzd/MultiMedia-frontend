import React, { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Title from "../../Components/Title/Title";
import Project from "../../Components/Project/Project";
import Loader from "../../Components/Loader/Loader";
import Carousel from "../../Components/Carousel/Carousel";
import Error from "../../Components/Error/Error";

import "./Portfolio.css";

const Portfolio = () => {
  let [projects, setProjects] = useState([]);
  let [load, setLoad] = useState(false);
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
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <HelmetProvider>
        <Helmet>
          <title>Multi Media | Portfolio</title>
        </Helmet>
      </HelmetProvider>
      <Title title="PORTFOLIO" />
      {error ? (
        <Error />
      ) : load ? (
        <Loader />
      ) : (
        <>
          {projects && (
            <>
              <div className="projects1">
                <Carousel show={3}>
                  {projects.map((ele, i) => {
                    return (
                      <div className="project-outer-container" key={i}>
                        <Project
                          key={i}
                          name={ele.title.toUpperCase()}
                          service={ele.service.name}
                          image={`${process.env.REACT_APP_BACK_URL}${
                            ele.image.split("/")[1]
                          }`}
                          description={ele.description}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <div className="projects2">
                <Carousel show={2}>
                  {projects.map((ele, i) => {
                    return (
                      <div className="project-outer-container" key={i}>
                        <Project
                          name={ele.title.toUpperCase()}
                          service={ele.service.name}
                          image={`${process.env.REACT_APP_BACK_URL}${
                            ele.image.split("/")[1]
                          }`}
                          description={ele.description}
                        />
                      </div>
                    );
                  })}
                </Carousel>
              </div>
              <div className="projects3">
                <Carousel show={1}>
                  {projects.map((ele, i) => {
                    return (
                      <div className="project-outer-container" key={i}>
                        <Project
                          key={i}
                          name={ele.title.toUpperCase()}
                          service={ele.service.name}
                          image={`${process.env.REACT_APP_BACK_URL}${
                            ele.image.split("/")[1]
                          }`}
                          description={ele.description}
                        />
                      </div>
                    );
                  })}
                </Carousel>
                <div className="phone-footer">
                  Ⓒ Copyright Multi Media. <br />
                  All Rights Reserved
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Portfolio;
