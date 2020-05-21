import React, { useState } from "react";
import { connect } from "react-redux";
import PopupButton from "../PopupButton/PopupButton";
import {
  setSuccessMessage,
  setPopupType
} from "../../../../../store/state/popup";
import "./css/send-popup.css";

const SendPopup = ({ recipient, setSuccessMessage, setPopupType }) => {
  const [amount, setAmount] = useState("£");

  const isNumber = str => {
    return /^\d+$/.test(str);
  };

  const handleInputChange = e => {
    const value = e.target.value;

    if (
      (value.charAt(0) === "£" &&
        value.length <= 5 &&
        isNumber(value.charAt(value.length - 1))) ||
      value === "£"
    ) {
      setAmount(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    setSuccessMessage(`Sent ${amount} to ${recipient}`);

    setTimeout(() => {
      setPopupType("success");
    }, 10);

    setTimeout(() => {
      setPopupType(null);
      setSuccessMessage("");
    }, 2700);
  };

  return (
    <form className="send-popup">
      <label className="send-popup__field">
        Amount
        <input
          className="send-popup__field__input"
          name="amount"
          type={"text"}
          value={amount}
          onChange={handleInputChange}
          autoComplete="off"
          autoFocus
        />
      </label>
      <div className="buttons-container">
        <PopupButton
          action={"close-popup"}
          type={"secondary"}
          text={"Cancel"}
        />
        <PopupButton action={handleSubmit} type={"primary"} text={"Send"} />
      </div>
    </form>
  );
};

const mapStateToProps = state => ({
  recipient: state.popup.recipient
});

const mapDispatchToProps = dispatch => ({
  setPopupType: type => dispatch(setPopupType(type)),
  setSuccessMessage: message => dispatch(setSuccessMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(SendPopup);
