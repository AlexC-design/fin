import React, { useEffect, useState } from "react";
import "./css/payment-tab.css";
import inLight from "../../../assets/icons/misc/in-light.svg";
import outLight from "../../../assets/icons/misc/out-light.svg";
import inDark from "../../../assets/icons/misc/in-dark.svg";
import outDark from "../../../assets/icons/misc/out-dark.svg";
import { setPopupType, setRecipient } from "../../../store/state/popup";
import { connect } from "react-redux";

const FriendCard = ({
  photo,
  name,
  phone,
  type,
  direction,
  setPopupType,
  setRecipient,
  theme
}) => {
  const [amount, setAmount] = useState(null);

  const openPopup = () => {
    setPopupType("send");
    setRecipient(name);
  };

  const icons = {
    in: {
      light: inLight,
      dark: inDark
    },
    out: {
      light: outLight,
      dark: outDark
    }
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
            src={direction === "in" ? icons.in[theme] : icons.out[theme]}
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

const mapStateToProps = state => ({
  theme: state.theme
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendCard);
