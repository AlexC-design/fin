import React from "react";
import ChangePin from "./ChangePin/ChangePin";
import SuccessPopup from "../popups/SuccessPopup/SuccessPopup";
import PaymentMethods from "../popups/PaymentMethods/PaymentMethods";
import "./css/popup.css";

const Popup = ({ type, message }) => {
  return (
    <div className="popup">
      <div className="popup_inner">
        {type === "change-pin" && <ChangePin />}
        {type === "payment-methods" && <PaymentMethods />}
        {/* {type === "spending-limit" && <SpendingLimit />} */}
        {type === "success" && <SuccessPopup message={message} />}
      </div>
    </div>
  );
};

export default Popup;
