import React from "react";
import "./css/popup-button.css";
import { connect } from "react-redux";
import { setPopupType } from "../../../../../store/state/popup/index";

const PopupButton = ({ text, action, type, setPopupType, disabled }) => {
  //types: "primary" "secondary"

  const closePopup = () => {
    setPopupType(null);
  };

  return (
    <button
      onClick={action === "close-popup" ? closePopup : action}
      className={`popup-button popup-button--${type} popup-button${
        disabled ? "--disabled" : ""
      }`}
    >
      {text}
    </button>
  );
};

const mapDispatchToProps = dispatch => ({
  setPopupType: type => dispatch(setPopupType(type))
});

export default connect(null, mapDispatchToProps)(PopupButton);
