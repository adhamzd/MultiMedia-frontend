import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import "./App.css";

import Logo from "./images/logo.png";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/ContactUs/ContactUs";
import Services from "./Pages/Services/Services";
import Portfolio from "./Pages/Portfolio/Portfolio";
import Team from "./Pages/Team/Team";

import Login from "./Pages/Login/Login";

import Members from "./DashboardPages/Members/Members";
import Projects from "./DashboardPages/Projects/Projects";
import Service from "./DashboardPages/Services/Services";
import Abouts from "./DashboardPages/About/About";
import ProtectedRoutes from "./Components/protectedRoutes/ProtectedRoutes";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  const [image, setImage] = useState(window.location.pathname.split("/")[1]);

  useEffect(() => {
    setImage(window.location.pathname.split("/")[1]);
  }, []);

  window.onpopstate = () => {
    setImage(window.location.pathname.split("/")[1]);
  };

  return (
    <div className={"App " + image}>
      <Router>
        <div className={"menu " + image}>
          <div>
            <NavLink
              to="/"
              onClick={() => {
                setImage("home");
              }}
            >
              <img src={Logo} alt="logo" className="logo" />{" "}
            </NavLink>
            <Navbar setImage={setImage} />
          </div>
          <div className="footer">
            Ⓒ Copyright Multi Media. <br />
            All Rights Reserved
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<Home setImage={setImage} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/team" element={<Team />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard/members" element={<Members />} />
            <Route path="/dashboard/projects" element={<Projects />} />
            <Route path="/dashboard/services" element={<Service />} />
            <Route path="/dashboard/about" element={<Abouts />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
