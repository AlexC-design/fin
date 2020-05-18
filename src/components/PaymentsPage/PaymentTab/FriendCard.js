import React, { useEffect, useState } from "react";
import "./css/payment-tab.css";
import receive from "../../../assets/icons/misc/receive-payment.svg";
import send from "../../../assets/icons/misc/send-payment.svg";
import { setPopupType } from "../../../store/state/popup";
import { connect } from "react-redux";

const FriendCard = ({ photo, name, phone, type, direction, setPopupType }) => {
  const [amount, setAmount] = useState(null);

  const openPopup = () => {
    setPopupType("send");
  };

  useEffect(() => {
    setAmount(Math.floor(Math.random() * 150 + 1));
  }, []);

  return (
    <div className="friend-card">
      <img className="friend-card__photo" src={photo} alt="profile" />
      <div className="friend-card__name">{name}</div>
      <div className="friend-card__phone">{phone}</div>
      {type === "recent" ? (
        <div className="friend-card__recent">
          <div
            className={`friend-card__recent__amount friend-card__recent__amount${
              direction === "in" ? "--in" : ""
            }`}
          >
            £{amount}
          </div>
          <img
            className="friend-card__recent__icon"
            src={direction === "in" ? receive : send}
          />
        </div>
      ) : (
        <button className="friend-card__send" onClick={openPopup}>
          Send
        </button>
      )}
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setPopupType: type => dispatch(setPopupType(type))
});

export default connect(null, mapDispatchToProps)(FriendCard);
