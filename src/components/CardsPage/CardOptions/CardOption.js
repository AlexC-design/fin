import React, { useState, useEffect } from "react";
import "./css/card-options.css";
import loadingBlue from "../../../assets/icons/misc/loading-blue.png";
import loadingWhite from "../../../assets/icons/misc/loading-white.png";
import { setPopupType } from "../../../store/state/popup";
import { connect } from "react-redux";

const CardOption = ({ name, description, icon, setPopupType }) => {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);

  const displayLoadingIcon = () => {
    return name === "Freeze card" ||
      name === "Reset contactless limit" ||
      name === "Unfreeze card"
      ? true
      : false;
  };

  const clickAction = name => {
    switch (name) {
      case "Freeze card":
        setLoading(true);
        break;

      case "Unfreeze card":
        setLoading(true);
        break;

      case "Reset contactless limit":
        setLoading(true);
        break;

      case "Limit reset":
        setActive(2);
        break;

      case "Change PIN":
        setPopupType("change-pin");
        break;

      case "Payment methods":
        setPopupType("payment-methods");
        break;

      case "Spending limit":
        setPopupType("spending-limit");
        break;

      default:
        console.log(`No case found for ${name}`);
    }
  };

  //simulate loading
  useEffect(() => {
    let timeoutId = 0;

    if (loading) {
      timeoutId = setTimeout(() => {
        setLoading(false);
        setActive(active ? 0 : 1);
      }, Math.round(Math.random() * 1000) + 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [loading, setLoading, active]);

  return (
    <div
      onClick={() => clickAction(name[active])}
      className={`card-option card-option${active ? "--active" : ""}`}
    >
      <img src={icon} className="card-option__icon" alt="" />
      <div className="card-option__name">{name[active]}</div>
      <div className="card-option__description">{description[active]}</div>
      {displayLoadingIcon && loading && (
        <img
          className="card-option__loading-icon"
          src={active ? loadingWhite : loadingBlue}
          alt="loading"
        />
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setPopupType: type => dispatch(setPopupType(type))
});

export default connect(null, mapDispatchToProps)(CardOption);
