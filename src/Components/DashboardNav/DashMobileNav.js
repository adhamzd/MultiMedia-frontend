import React, { useState} from 'react'
import DashLinks from './DashLinks'
import { CgMenu, CgClose } from "react-icons/cg";

function DashMobileNav() {
    const [open, setOpen] = useState(false);

    const HamburgerIcons = (
      <CgMenu
        className="DashHamburger"
        size="60px"
        color="white"
        onClick={() => setOpen(!open)}
      />
    );
  
    const closeHamburger = (
      <CgClose
        className="DashHamburger"
        size="60px"
        color="white"
        onClick={() => setOpen(!open)}
      />
    );
  return (
    <nav className="DashMobileNavigation">
      {open ? closeHamburger : HamburgerIcons}
      {open && <DashLinks />}
    </nav>
  )
}

export default DashMobileNav
