import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./css/vendors.css";

const Vendor = ({
  name,
  amount,
  time,
  total,
  hovered,
  setLocalHovered,
  setOutsideView,
  index,
  outsideView
}) => {
  // const hoverToggle = on => {
  //   on ? setLocalHovered(index) : setLocalHovered(null);
  // };

  // const isOutsideOfView = (viewTop, viewBot, elTop, elBot) => {
  //   if (elTop < viewTop || elBot > viewBot) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const vendorRef = React.createRef();

  useEffect(() => {
    // const outside = isOutsideOfView(
    //   document.querySelector(".simplebar-content-wrapper").scrollTop,
    //   document.querySelector(".simplebar-content-wrapper").scrollTop +
    //     document.querySelector(".simplebar-content-wrapper").clientHeight,
    //   vendorRef.current.offsetTop,
    //   vendorRef.current.offsetTop + vendorRef.current.offsetHeight
    // );
    // if (hovered && outsideView !== outside) {
    //   setOutsideView(outside);
    // }
  });

  return (
    <div
      ref={vendorRef}
      // onMouseEnter={() => hoverToggle(true)}
      // onMouseLeave={() => hoverToggle(false)}
      className="vendor"
    >
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
