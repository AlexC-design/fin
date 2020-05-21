import React, { useState } from "react";
import {
  setPopupType,
  setSuccessMessage
} from "../../../../../store/state/popup";
import { connect } from "react-redux";
import PopupButton from "../PopupButton/PopupButton";
import "./css/change-pin.css";

const ChangePin = ({ setPopupType, setSuccessMessage }) => {
  const [pin, setPin] = useState({ current: "", new: "", repeat: "" });
  const [visible, setVisible] = useState({
    current: false,
    new: false,
    repeat: false
  });
  const [error, setError] = useState("");

  const isNumber = str => {
    return /^\d+$/.test(str);
  };

  const handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;

    if ((value.length <= 4 && isNumber(value)) || value === "") {
      setPin({ ...pin, [name]: value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (pin.current.length < 4 || pin.new.length < 4 || pin.repeat.length < 4) {
      setError("PIN must be 4 characters long");
    } else if (pin.new !== pin.repeat) {
      setError("PINs don't match");
    } else {
      setError("");
      setSuccessMessage("PIN changed");

      setTimeout(() => {
        setPopupType("success");
      }, 10);

      setTimeout(() => {
        setPopupType(null);
        setSuccessMessage("");
      }, 2700);
    }
  };

  const toggleVisibility = (e, name) => {
    e.preventDefault();
    setVisible({
      [name]: !visible[name]
    });
  };

  return (
    <form className="change-pin">
      <label className="change-pin__field">
        Current PIN
        <input
          className="change-pin__field__input"
          name="current"
          type={visible.current ? "text" : "password"}
          value={pin.current}
          onChange={handleInputChange}
        />
        <button
          className="change-pin__field__button"
          onClick={e => toggleVisibility(e, "current")}
        />
      </label>
      <label className="change-pin__field">
        New PIN
        <input
          className="change-pin__field__input"
          name="new"
          type={visible.new ? "text" : "password"}
          value={pin.new}
          onChange={handleInputChange}
        />
        <button
          className="change-pin__field__button"
          onClick={e => toggleVisibility(e, "new")}
        />
      </label>
      <label className="change-pin__field">
        Repeat PIN
        <input
          className="change-pin__field__input"
          name="repeat"
          type={visible.repeat ? "text" : "password"}
          value={pin.repeat}
          onChange={handleInputChange}
        />
        <button
          className="change-pin__field__button"
          onClick={e => toggleVisibility(e, "repeat")}
        />
      </label>
      {error && <p className="change-pin__error">{error}</p>}
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

const mapDispatchToProps = dispatch => ({
  setPopupType: type => dispatch(setPopupType(type)),
  setSuccessMessage: message => dispatch(setSuccessMessage(message))
});

export default connect(null, mapDispatchToProps)(ChangePin);
