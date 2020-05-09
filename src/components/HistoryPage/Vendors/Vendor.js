import React from "react";
import "./css/vendors.css";

const Vendor = ({ name, amount, time }) => {
  return (
    <div className="vendor">
      <div className="vendor__icon"></div>
      <div className="vendor__data">
        <div className="vendor__data__top">
          <div className="vendor__data__top__name">{name}</div>
          <div className="vendor__data__top__amount">{amount}</div>
        </div>
        <div className="vendor__data__time">{time}</div>
      </div>
    </div>
  );
};

export default Vendor;
