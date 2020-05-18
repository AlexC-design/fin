import React from "react";
import { connect } from "react-redux";
import Popup from "./popups/Popup";
import CardOption from "./CardOption";
import "./css/card-options.css";

const CardOptions = ({ popupType, successMessage }) => {
  const options = [
    {
      name: ["Freeze card", "Unfreeze card"],
      description: ["Click to freeze", "Click to unfreeze"]
    },
    {
      name: ["Change PIN"],
      description: ["Click to select new PIN"]
    },
    {
      name: ["Payment methods"],
      description: ["Click to change settings"]
    },
    {
      name: ["Reset contactless limit", "Limit reset", "Limit already reset"],
      description: ["Click to reset limit", ""]
    },
    {
      name: ["Spending limit"],
      description: ["Change monthly limit"]
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
