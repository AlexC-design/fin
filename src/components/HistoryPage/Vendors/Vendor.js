import React from "react";
import "./css/vendors.css";

const Vendor = ({ name, amount, time, icon }) => {
  console.log('re-rendering vendor')
  
  return (
    <div className="vendor">
      <img className="vendor__icon" src={icon} alt="vendor logo" />
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
