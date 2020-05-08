import React from "react";

import "./css/navbar.css";

const NavbarLink = ({ icon, linkName, active, action }) => {
  return (
    <div
      onClick={() => action(linkName)}
      className={`navbar-link navbar-link${active ? "--active" : ""}`}
    >
      <img draggable="false" className="navbar-link__icon" src={icon} alt="" />
      <div className="navbar-link__text">{linkName}</div>
    </div>
  );
};

export default NavbarLink;
