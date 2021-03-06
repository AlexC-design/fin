import React from "react";
import dark from "../../assets/icons/navbar/dark.svg";
import light from "../../assets/icons/navbar/light.svg";

import "./css/navbar.css";

const ThemeChangeButton = ({ theme, changeTheme }) => {
  return (
    <div
      onClick={() => changeTheme(theme, theme === "light" ? "dark" : "light")}
      className="theme-button-container"
    >
      <div className={`navbar-link`}>
        <div className="navbar-link__icon icon-container">
          <img
            draggable="false"
            className="icon"
            src={theme === "dark" ? light : dark}
            alt=""
          />
        </div>
        <div className="navbar-link__text text">
          {theme === "light" ? "Dark" : "Light"} Theme
        </div>
      </div>
    </div>
  );
};

export default ThemeChangeButton;
