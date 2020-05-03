import React from "react";

import "./css/navbar.css";

const NavbarLink = ({ position, icon, linkName, active, action }) => {
  return (
    <div
      onClick={() => action(linkName)}
      className={`navbar-link navbar-link--${position} navbar-link${
        active ? "--active" : ""
      }`}
    >
      <img className="navbar-link__icon" src={icon} alt="" />
      <div className="navbar-link__text">{linkName}</div>
    </div>
  );
};

export default NavbarLink;
