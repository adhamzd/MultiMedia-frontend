import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Mission from "../../Components/About/Mission";
import Vision from "../../Components/About/Vision";
import Services from "../../Components/About/Services";
import Step from "../../Components/About/Step";
import Title from "../../Components/Title/Title";
import "./About.css";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";

const Abouts = () => {
  let [about, setAbout] = useState([]);
  let [load, setLoad] = useState(false);
  let [error, setError] = useState(false);

  const fetchAbout = async () => {
    setLoad(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_BACK_URL}about`);
      const resJson = await res.json();
      setAbout(resJson);
      setLoad(false);
    } catch (err) {
      setError(true);
    }
  };

  let [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      setLoad(true);
      const res = await fetch(`${process.env.REACT_APP_BACK_URL}service`);
      const resJson = await res.json();
      setServices(resJson);
      setLoad(false);
    } catch (err) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchAbout();
    fetchServices();
  }, []);

  return (
    <div className="main-container">
      <HelmetProvider>
        <Helmet>
          <title>Multi Media | About</title>
        </Helmet>
      </HelmetProvider>
      <Title title="ALL ABOUT Multimedia" />
      {error ? (
        <Error />
      ) : load ? (
        <Loader />
      ) : (
        <>
          {services && about[0] && (
            <div className="about-container">
              <div className="mission-vision-container">
                {about[0] && (
                  <>
                    <Mission description={about[0].mission} />
                    {<br></br>}
                    <Vision description={about[0].vision} />
                  </>
                )}{" "}
              </div>

              <div className="services-container">
                <div className="text-container">
                  <Services title="MULTI MEDIA IS A DIGITAL MARKETING AGENCY THAT WILL TAKE CARE OF ALL YOUR MARKETING AND SOCIAL MEDIA NEEDS. JUST REMEMBER THAT WE ENSURE DEVELOPMENT AND ADVANCEMENTS IN THE ONLINE WORLD WHERE WE HELP IN:" />{" "}
                  {<br></br>}
                </div>

                {services && (
                  <ul className="services-list">
                    {services.map((ele, i) => {
                      return <li key={i}> {ele.name} </li>;
                    })}
                  </ul>
                )}
              </div>

              <div className="steps-container">
                <Step
                  number="01"
                  title="DISCUSSION"
                  description="WE BOOK A MEETING TO DISCUSS ABOUT YOUR PROJECT AND WHAT FLOW TO PUT."
                />
                <Step
                  number="02"
                  title="PLANNING"
                  description="WE PLAN THE WHOLE PROCESS TOGETHER."
                />
                <Step
                  number="03"
                  title="EXECUTION"
                  description="WE START EXECUTING AND WORKING ON THE PROJECT FROM A TO Z."
                />
                <Step
                  number="04"
                  title="PROJECT DELIVERY"
                  description="WE DELIVER AND SUBMIT YOUR PROJECT UNDER YOUR SATISFICATION AND NEEDS."
                />
              </div>
              <div className="phone-footer">
                Ⓒ Copyright Multi Media. <br />
                All Rights Reserved
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default Abouts;
