import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import SideNav from "../../Components/DashboardNav/SideNav";

import Title from "../../Components/Title/Title";
import DashboardService from "../../Components/DashboardService/DashboardService";
import Carousel from "../../Components/Carousel/Carousel";
import Loader from "../../Components/Loader/Loader";
import Error from "../../Components/Error/Error";

import "./Services.css";
import AddServiceForm from "../../Components/AddServiceForm/AddServiceForm";

const Services = () => {
  const [services, setServices] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState(false);
  //test

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoad(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACK_URL}service`
        );
        const res = await response.json();
        setServices(res);
        setLoad(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchServices();
  }, [refresh]);

  return (
    <div className="AboutDash">
      <HelmetProvider>
        <Helmet>
          <title>Dashboard | Services</title>
        </Helmet>{" "}
      </HelmetProvider>
      <SideNav />
      <div className="service-dashboard-main">
        <Title title="SERVICES DASHBOARD" />
        {error ? (
          <Error />
        ) : load ? (
          <Loader />
        ) : (
          services && (
            <div className="dashboard-servicesContainer">
              <h2>CURRENT SERVICES</h2>
              <div className="current-services-1">
                <Carousel show={3}>
                  {services.map((ele, i) => {
                    return (
                      <DashboardService
                        key={i}
                        name={ele.name.toUpperCase()}
                        desc={ele.description}
                        icon={`${process.env.REACT_APP_BACK_URL}${
                          ele.icon.split("/")[1]
                        }`}
                        id={ele._id}
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    );
                  })}
                </Carousel>
              </div>
              <div className="current-services-2">
                <Carousel show={2}>
                  {services.map((ele, i) => {
                    return (
                      <DashboardService
                        key={i}
                        name={ele.name.toUpperCase()}
                        desc={ele.description}
                        icon={`${process.env.REACT_APP_BACK_URL}${
                          ele.icon.split("/")[1]
                        }`}
                        id={ele._id}
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    );
                  })}
                </Carousel>
              </div>
              <div className="current-services-3">
                <Carousel show={1}>
                  {services.map((ele, i) => {
                    return (
                      <DashboardService
                        key={i}
                        name={ele.name.toUpperCase()}
                        desc={ele.description}
                        icon={`${process.env.REACT_APP_BACK_URL}${
                          ele.icon.split("/")[1]
                        }`}
                        id={ele._id}
                        refresh={refresh}
                        setRefresh={setRefresh}
                      />
                    );
                  })}
                </Carousel>
              </div>
            </div>
          )
        )}
        {!load && (
          <div
            className="dashboard-servicesContainer"
            style={{ marginTop: "80px" }}
          >
            <h2>ADD NEW SERVICE</h2>
            <AddServiceForm refresh={refresh} setRefresh={setRefresh} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
