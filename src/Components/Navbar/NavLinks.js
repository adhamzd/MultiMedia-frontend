import React from 'react';
import { NavLink } from "react-router-dom";

function NavLinks({ setImage }) {
  return (
    <ul>
          <li>
            <NavLink
              to="/"
              onClick={() => {
                setImage("home");
              }}
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={() => {
                setImage("about");
              }}
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/services"
              onClick={() => {
                setImage("services");
              }}
            >
              SERVICES
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/portfolio"
              onClick={() => {
                setImage("portfolio");
              }}
            >
              PORTFOLIO
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/team"
              onClick={() => {
                setImage("team");
              }}
            >
              TEAM
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={() => {
                setImage("contact");
              }}
            >
              CONTACT US
            </NavLink>
          </li>
        </ul>
  )
}

export default NavLinks
