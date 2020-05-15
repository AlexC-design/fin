import React from "react";
import "./css/popup-button.css";

const PopupButton = ({ text, action, type }) => {
  //types: "primary" "secondary"

  return (
    <button onClick={action} className={`popup-button popup-button--${type}`}>
      {text}
    </button>
  );
};

export default PopupButton;
