import React from "react";
import "./css/month-ctrl.css";
import arrow from "../../assets/icons/misc/arrow.svg";
import arrowDisabled from "../../assets/icons/misc/arrow-disabled.svg";

const MonthButton = ({ disabled, action, buttonName, direction, tempDisabled }) => {
  return (
    <button
      onClick={action}
      className={`month-button month-button${
        disabled ? "--disabled" : ""
      } month-button--${direction} month-button${
        tempDisabled ? "--temp-disabled" : ""
      } month-button--${direction}`}
    >
      <img src={disabled ? arrowDisabled : arrow} alt="" />
      <p>{buttonName}</p>
    </button>
  );
};

export default MonthButton;
