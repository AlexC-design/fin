import React, { useState } from "react";
import "./css/payment-methods.css";
import { connect } from "react-redux";

const PaymentMethod = ({ name, icon, setChanged, theme }) => {
  const [enabled, setEnabled] = useState(true);

  const toggleEnable = () => {
    setChanged(true);
    setEnabled(!enabled);
  };

  return (
    <div
      className={`payment-method payment-method${enabled ? "" : "--disabled"}`}
      onClick={toggleEnable}
    >
      {/* <img className="payment-method__icon" src={icon} alt="" /> */}
      <img
        className={`payment-method__icon payment-method__icon--${theme}`}
        src={icon}
      />
      <p className="payment-method__name">{name}</p>
      <p className="payment-method__description">
        Click to {enabled ? "disable" : "enable"}
      </p>
    </div>
  );
};

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(mapStateToProps)(PaymentMethod);
