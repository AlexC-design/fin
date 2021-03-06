import React, { useState } from "react";
import "./css/payment-methods.css";
import PaymentMethod from "./PaymentMethod";
import PopupButton from "../PopupButton/PopupButton";
import { connect } from "react-redux";
import {
  setPopupType,
  setSuccessMessage
} from "../../../../../store/state/popup/index";
import contactless from '../../../../../assets/icons/card-options/contactless.svg'
import swipe from '../../../../../assets/icons/card-options/swipe.svg'
import atm from '../../../../../assets/icons/card-options/atm.svg'
import online from '../../../../../assets/icons/card-options/online.svg'

const methods = [
  {
    name: "Contactless payments",
    icon: contactless
  },
  {
    name: "Swipe payments",
    icon: swipe
  },
  {
    name: "ATM withdrawals",
    icon: atm
  },
  {
    name: "Online transactions",
    icon: online
  }
];

const PaymentMethods = ({ setPopupType, setSuccessMessage }) => {
  const [changed, setChanged] = useState(false);

  const handleSubmit = () => {
    setSuccessMessage("Saved");
    setTimeout(() => {
      setPopupType("success");
    }, 10);

    setTimeout(() => {
      setPopupType(null);
      setSuccessMessage("");
    }, 2700);
  };

  return (
    <>
      <div className="payment-methods">
        {methods.map(method => {
          return (
            <PaymentMethod
              key={method.name}
              name={method.name}
              icon={method.icon}
              setChanged={setChanged}
            />
          );
        })}
      </div>
      <div className="buttons-container">
        <PopupButton
          action={"close-popup"}
          type={"secondary"}
          text={"Cancel"}
        />
        <PopupButton
          action={handleSubmit}
          type={"primary"}
          text={"Save"}
          disabled={changed ? false : true}
        />
      </div>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  setPopupType: type => dispatch(setPopupType(type)),
  setSuccessMessage: message => dispatch(setSuccessMessage(message))
});

export default connect(null, mapDispatchToProps)(PaymentMethods);
