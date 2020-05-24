import React from "react";
import { connect } from "react-redux";
import Popup from "./popups/Popup";
import CardOption from "./CardOption";
import "./css/card-options.css";
import freeze from "../../../assets/icons/card-options/freeze.svg";
import methods from "../../../assets/icons/card-options/methods.svg";
import contactlessLimit from "../../../assets/icons/card-options/contactless-limit.svg";
import pin from "../../../assets/icons/card-options/pin.svg";
import spendingLimit from "../../../assets/icons/card-options/spending-limit.svg";

const CardOptions = ({ popupType, successMessage }) => {
  const options = [
    {
      name: ["Freeze card", "Unfreeze card"],
      description: ["Click to freeze", "Click to unfreeze"],
      icon: freeze
    },
    {
      name: ["Change PIN"],
      description: ["Click to select new PIN"],
      icon: pin
    },
    {
      name: ["Payment methods"],
      description: ["Click to change settings"],
      icon: methods
    },
    {
      name: ["Reset contactless limit", "Limit reset", "Limit already reset"],
      description: ["Click to reset limit", ""],
      icon: contactlessLimit
    },
    {
      name: ["Spending limit"],
      description: ["Change monthly limit"],
      icon: spendingLimit
    }
  ];

  return (
    <>
      <div
        className={`card-options card-options${
          popupType !== null ? "--popup-opened" : ""
        }`}
      >
        {popupType && <Popup type={popupType} message={successMessage} />}
        {options.map(option => {
          return (
            <CardOption
              icon={option.icon}
              name={option.name}
              description={option.description}
              key={option.name}
            />
          );
        })}
      </div>
    </>
  );
};

const mapStateToProps = state => ({
  popupType: state.popup.type,
  successMessage: state.popup.message
});

export default connect(mapStateToProps)(CardOptions);
