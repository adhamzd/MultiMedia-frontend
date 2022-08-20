import React, { useState } from "react";
import NavLinks from "./NavLinks";
import { CgMenu, CgClose } from "react-icons/cg";

function MobileNavigation() {
  const [open, setOpen] = useState(false);

  const HamburgerIcons = (
    <CgMenu
      className="Hamburger"
      size="50px"
      color="white"
      onClick={() => setOpen(!open)}
    />
  );

  const closeHamburger = (
    <CgClose
      className="Hamburger"
      size="50px"
      color="white"
      onClick={() => setOpen(!open)}
    />
  );
  return (
    <nav className="MobileNavigation">
      {open ? closeHamburger : HamburgerIcons}
      {open && <NavLinks />}
    </nav>
  );
}

export default MobileNavigation;
