import React from "react";
import "./Step.css";

export const Step = ({ number, title, description }) => {
    return (
        <div className="step">
            <p className="step-number"> {number} </p>
            <p className="step-title"> {title} </p>
            <p className="step-description"> {description} </p>

        </div>

    )
}

export default Step;
