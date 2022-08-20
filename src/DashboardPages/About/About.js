import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import SideNav from "../../Components/DashboardNav/SideNav";

import Title from "../../Components/Title/Title";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";

import "./About.css";

const About = () => {
  const [mission, setMission] = useState("");
  const [vision, setVision] = useState("");
  const [load, setLoad] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoad(true);
        const response = await fetch(`${process.env.REACT_APP_BACK_URL}about`);
        const res = await response.json();
        setMission(res[0].mission);
        setVision(res[0].vision);
        setLoad(false);
      } catch (e) {
        setError(true);
      }
    };
    fetchAbout();
  }, []);

  const editAbout = async (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ mission, vision }),
    };

    try {
      await fetch(
        `${process.env.REACT_APP_BACK_URL}about/62874ab0cb89597d03217df8`,
        requestOptions
      );
    } catch (e) {
      setError(true);
    }
  };

  return (
    <div className="AboutDash">
      <HelmetProvider>
        <Helmet>
          <title>Dashboard | About</title>
        </Helmet>
      </HelmetProvider>
      <SideNav />
      {error ? (
        <Error />
      ) : load ? (
        <Loader />
      ) : (
        <form onSubmit={(e) => editAbout(e)} className="about-dashboard-form">
          <Title title="ABOUT DASHBOARD" />
          <label className="about-dashboard-label">
            <h2> MISSION: </h2>
            <textarea
              className="about-dashboard-textarea"
              placeholder="Enter new mission"
              defaultValue={mission}
              onChange={(e) => setMission(e.target.value)}
            ></textarea>
          </label>
          <label className="about-dashboard-label">
            <h2> VISION: </h2>
            <textarea
              className="about-dashboard-textarea"
              placeholder="Enter new vision"
              defaultValue={vision}
              onChange={(e) => setVision(e.target.value)}
            ></textarea>
          </label>
          <button type="submit" className="about-dashboard-button">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default About;
