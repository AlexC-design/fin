import React from "react";

import "./css/navbar.css";

const NavbarLink = ({ icon, path, name, active, action }) => {
  return (
    <div
      onClick={() => action(path)}
      className={`navbar-link navbar-link${active ? "--active" : ""}`}
    >
      <img draggable="false" className="navbar-link__icon" src={icon} alt="" />
      <div className="navbar-link__text">{name}</div>
    </div>
  );
};

export default NavbarLink;
