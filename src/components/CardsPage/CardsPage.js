import React, { useEffect } from "react";
import "./css/cards-page.css";
import Cards from "./Cards/Cards";
import CardOptions from "./CardOptions/CardOptions";
import { setPopupType, setSuccessMessage } from "../../store/state/popup";
import { connect } from "react-redux";

const CardsPage = ({ setPopupType, setSuccessMessage }) => {
  useEffect(() => {
    setPopupType(null);
    setSuccessMessage("");
  }, []);

  return (
    <div className="cards-page">
      <Cards />
      <CardOptions />
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setPopupType: type => dispatch(setPopupType(type)),
  setSuccessMessage: message => dispatch(setSuccessMessage(message))
});

export default connect(null, mapDispatchToProps)(CardsPage);
