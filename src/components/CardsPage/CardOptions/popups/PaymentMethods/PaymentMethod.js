import React, { useState } from "react";
import "./css/payment-methods.css";

const PaymentMethod = ({ name, icon, setChanged }) => {
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
      <img className="payment-method__icon" src={icon} />
      <p className="payment-method__name">{name}</p>
      <p className="payment-method__description">
        Click to {enabled ? "disable" : "enable"}
      </p>
    </div>
  );
};

export default PaymentMethod;
