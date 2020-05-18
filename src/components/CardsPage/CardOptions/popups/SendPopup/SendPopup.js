import React, { useState } from "react";
import "./css/send-popup.css";
import PopupButton from "../PopupButton/PopupButton";

const SendPopup = () => {
  const [amount, setAmount] = useState("£");

  const isNumber = str => {
    return /^\d+$/.test(str);
  };

  const handleInputChange = e => {
    const value = e.target.value;

    console.log({ value });
    console.log(value.charAt(0));

    if (
      (value.charAt(0) === "£" &&
        value.length <= 6 &&
        isNumber(value.charAt(value.length - 1))) ||
      value === "£"
    ) {
      setAmount(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    alert("sent");
  };

  return (
    <form className="send-popup">
      <label className="send-popup__field">
        Amount:
        <input
          className="send-popup__field__input"
          name="amount"
          type={"text"}
          value={amount}
          onChange={handleInputChange}
        />
      </label>
      <div className="buttons-container">
        <PopupButton
          action={"close-popup"}
          type={"secondary"}
          text={"Cancel"}
        />
        <PopupButton action={handleSubmit} type={"primary"} text={"Change"} />
      </div>
    </form>
  );
};

export default SendPopup;
