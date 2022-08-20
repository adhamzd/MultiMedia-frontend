import React from "react";

const Services = ({ title, description }) => {
  return (
    <div className="services">
      <p style={{ fontSize: "1.3rem" }}> {title} </p>
      <p className="description">{description}</p>
    </div>
  );
};

export default Services;
