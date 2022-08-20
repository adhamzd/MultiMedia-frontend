import React from "react";
import { NavLink } from "react-router-dom";
import Title from "../../Components/Title/Title";
import "./Home.css";
import Hero from "../../images/home-wallpaper.jpg";
import { Helmet, HelmetProvider } from "react-helmet-async";

export default function Homepage({ setImage }) {
  return (
    <div className="body">
      <HelmetProvider>
        <Helmet>
          <title>Multi Media</title>
        </Helmet>
      </HelmetProvider>
      <Title title="MULTI MEDIA : DIGITAL MARKETING AGENCY" />
      <div className="home-container">
        <div className="hero">
          <img src={Hero} alt={"Hero"} />
        </div>
        <div className="discription">
          <p className="homeP">
            THE RIGHT AGENCY FOR YOU THAT WILL TAKE CARE OF YOUR ONLINE PRESENCE
            FROM DIGITAL MARKETING TO MANAGING YOUR SOCIAL MEDIA ACCOUNTS
            HELPING YOU SCALE INSANLY FAST .
          </p>
          <div className="btn-container">
            <NavLink to="./contact" onClick={() => setImage("contact")}>
              <button id="request-btn"> REQUEST A QUOTE </button>
            </NavLink>
            <NavLink to="./about" onClick={() => setImage("about")}>
              <button id="started-btn">GET STARTED</button>
            </NavLink>
          </div>
        </div>
        <div className="phone-footer">
          Ⓒ Copyright Multi Media. <br />
          All Rights Reserved
        </div>
      </div>
      {/* <div className="phone-footer">
        Ⓒ Copyright Multi Media. <br />
        All Rights Reserved
      </div> */}
    </div>
  );
}
