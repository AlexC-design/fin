import React from "react";
import success from "../../../../../assets/icons/misc/success.svg";
import "./css/success-popup.css";

const SuccessPopup = ({ message }) => {
  return (
    <div className="success-popup">
      <img src={success} className="success-popup__image" alt="success" />
      <p className="success-popup__message">{message}</p>
    </div>
  );
};

export default SuccessPopup;
