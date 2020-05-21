import React, { useEffect, useState } from "react";
import "./css/payment-tab.css";
import receive from "../../../assets/icons/misc/receive-payment.svg";
import send from "../../../assets/icons/misc/send-payment.svg";
import { setPopupType, setRecipient } from "../../../store/state/popup";
import { connect } from "react-redux";

const FriendCard = ({
  photo,
  name,
  phone,
  type,
  direction,
  setPopupType,
  setRecipient
}) => {
  const [amount, setAmount] = useState(null);

  const openPopup = () => {
    setPopupType("send");
    setRecipient(name);
  };

  useEffect(() => {
    setAmount(Math.floor(Math.random() * 150 + 1));
  }, []);

  return (
    <div className="friend-card">
      <img className="friend-card__photo" src={photo} alt="profile" />
      <div className="friend-card__name">{name}</div>
      <div className="friend-card__phone">{phone}</div>
      {type === "payments" ? (
        <div className="friend-card__payments">
          <div
            className={`friend-card__payments__amount friend-card__payments__amount${
              direction === "in" ? "--in" : ""
            }`}
          >
            £{amount}
          </div>
          <img
            className="friend-card__payments__icon"
            src={direction === "in" ? receive : send}
            alt=""
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
  setPopupType: type => dispatch(setPopupType(type)),
  setRecipient: recipient => dispatch(setRecipient(recipient))
});

export default connect(null, mapDispatchToProps)(FriendCard);
