import React from "react";
import Navigation from "./Navigation";
import MobileNavigation from "./MobileNavigation";
import "./NavBar.css";

function Navbar() {
  return (
    <div className="NavBar">
      {" "}
      <Navigation />
      <MobileNavigation />
    </div>
  );
}

export default Navbar;
