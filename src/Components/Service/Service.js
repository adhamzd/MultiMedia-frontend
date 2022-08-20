import React from "react";

import "./Service.css";

export const Service = ({ name, icon, description }) => {
  return (
    <div className="service">
      <h3>{name}</h3>
      <img src={icon} alt="service icon" className="serviceIcon"></img>
      <p className="serviceDesc">{description}</p>
    </div>
  );
};
