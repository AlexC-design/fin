import React from "react";
import successLight from "../../../../../assets/icons/misc/success-light.svg";
import successDark from "../../../../../assets/icons/misc/success-dark.svg";
import "./css/success-popup.css";
import { connect } from "react-redux";

const SuccessPopup = ({ theme, message }) => {
  return (
    <div className="success-popup">
      <img
        src={theme === "light" ? successLight : successDark}
        className="success-popup__image"
        alt="success"
      />
      <p className="success-popup__message">{message}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(mapStateToProps)(SuccessPopup);
