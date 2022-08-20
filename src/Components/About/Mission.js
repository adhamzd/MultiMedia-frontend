import React from "react";

const Mission = ({ description }) => {
  return (
    <div className="mission">
      <p className="description">{`OUR MISSION: ${description}`}</p>
    </div>
  );
};

export default Mission;
