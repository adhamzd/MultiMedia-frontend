import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { Service } from "../../Components/Service/Service";

import Title from "../../Components/Title/Title";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";

import "./Services.css";

const Services = () => {
  let [services, setServices] = useState([]);
  let [load, setLoad] = useState(false);
  let [error, setError] = useState(false);

  const fetchServices = async () => {
    try {
      setLoad(true);
      const res = await fetch(`${process.env.REACT_APP_BACK_URL}service`);
      const resJson = await res.json();
      setServices(resJson);
      setLoad(false);
    } catch (e) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="container">
      <HelmetProvider>
        <Helmet>
          <title>Multi Media | Services</title>
        </Helmet>
      </HelmetProvider>
      <Title title="OUR SERVICES" />
      {error ? (
        <Error />
      ) : load ? (
        <Loader />
      ) : (
        <>
          {services && (
            <div className="servicesContainer">
              {services.map((ele, i) => {
                return (
                  <Service
                    key={i}
                    name={ele.name.toUpperCase()}
                    description={ele.description}
                    icon={`${process.env.REACT_APP_BACK_URL}${
                      ele.icon.split("/")[1]
                    }`}
                  />
                );
              })}
              <div className="phone-footer">
                Ⓒ Copyright Multi Media. <br />
                All Rights Reserved
              </div>
            </div>
          )}{" "}
        </>
      )}
    </div>
  );
};

export default Services;
