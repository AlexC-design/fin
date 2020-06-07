import React, { useState, useEffect } from "react";
import Section from "../Section/Section";
import PaymentTab from "./PaymentTab/PaymentTab";
import "./css/payments-page.css";
import { connect } from "react-redux";
import { setPopupType, setSuccessMessage } from "../../store/state/popup";
import Popup from "../CardsPage/CardOptions/popups/Popup";

const PaymentsPage = ({
  popupType,
  successMessage,
  setPopupType,
  setSuccessMessage
}) => {
  const [active, setActive] = useState("friends");
  const [mobileView, setMobileView] = useState(false);

  const handleResize = () => {
    window.innerWidth < 1000 ? setMobileView(true) : setMobileView(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    handleResize();

    setPopupType(null);
    setSuccessMessage("");

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="payments-page">
      {popupType && <Popup type={popupType} message={successMessage} />}
      {(!mobileView || active === "friends") && (
        <Section outline="shadow" radius={20} type={"half"}>
          <PaymentTab type={"friends"} active={active} setActive={setActive} />
        </Section>
      )}
      {(!mobileView || active === "payments") && (
        <Section outline="shadow" radius={20} type={"half"}>
          <PaymentTab type={"payments"} active={active} setActive={setActive} />
        </Section>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  popupType: state.popup.type,
  successMessage: state.popup.message
});

const mapDispatchToProps = dispatch => ({
  setPopupType: type => dispatch(setPopupType(type)),
  setSuccessMessage: message => dispatch(setSuccessMessage(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsPage);
