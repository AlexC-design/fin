import React from "react";
import dark from "../../assets/icons/navbar/dark.svg";

import "./css/navbar.css";

const ThemeChangeButton = ({ position }) => {
  return (
    <div className={`navbar-link navbar-link--${position}`}>
      <img className="navbar-link__icon" src={dark} />
      <div className="navbar-link__text">Dark Mode</div>
    </div>
  );
};

export default ThemeChangeButton;
