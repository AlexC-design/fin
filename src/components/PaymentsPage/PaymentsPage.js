import React from "react";
import Section from "../Section/Section";
import PaymentTab from "./PaymentTab/PaymentTab";
import "./css/payments-page.css";
import { connect } from "react-redux";
import Popup from "../CardsPage/CardOptions/popups/Popup";

const PaymentsPage = ({ popupType, successMessage }) => {
  return (
    <div className="payments-page">
      {popupType && <Popup type={popupType} message={successMessage} />}
      <Section outline="shadow" radius={20} type={"half"}>
        <PaymentTab type={"friends"} />
      </Section>
      <Section outline="shadow" radius={20} type={"half"}>
        <PaymentTab type={"recent"} />
      </Section>
    </div>
  );
};

const mapStateToProps = state => ({
  popupType: state.popup.type,
  successMessage: state.popup.message
});

export default connect(mapStateToProps)(PaymentsPage);
