import React from 'react'
import DashLinks from './DashLinks'
import Logo from "../../images/logo.png";

function DashNav() {
  return (
    <div className='dashNavigation'>
      <img src={Logo} alt="logo" />
      <DashLinks />
      <div className="dashNavigation-Footer">
        Ⓒ Copyright Multi Media. <br />
        All Rights Reserved
      </div>
    </div>
  )
}

export default DashNav
