import React, { useState, useEffect } from "react";
import Vendor from "./Vendor";
import { isOutsideOfView } from "../../../utils/isOutsideOfView";
import { buildVendors } from "../../../utils/mockData/mockVendors";
import "./css/vendors.css";

const Day = ({
  day,
  amount,
  vendorsNo,
  index,
  setLocalHovered,
  setOutsideView,
  // outsideView,
  hovered,
  setScrollView
}) => {
  const [vendors, setVendors] = useState([]);

  const dayRef = React.createRef();

  useEffect(() => {
    if (hovered) {
      setScrollView(dayRef.current.offsetTop - 20);
    }
  });

  const hoverToggle = on => {
    on ? setLocalHovered(index) : setLocalHovered(null);
  };

  useEffect(() => {
    setVendors((buildVendors(vendorsNo, amount)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const outside = isOutsideOfView(
      document.querySelector(".simplebar-content-wrapper").scrollTop,
      document.querySelector(".simplebar-content-wrapper").scrollTop +
        document.querySelector(".simplebar-content-wrapper").clientHeight,
      dayRef.current.offsetTop,
      dayRef.current.offsetTop + dayRef.current.offsetHeight
    );

    if (hovered && 'outsideView' !== outside) {
      setOutsideView(dayRef.current.offsetTop);
    }
  });

  return (
    <div
      ref={dayRef}
      onMouseEnter={() => hoverToggle(true)}
      onMouseLeave={() => hoverToggle(false)}
      className={`day-section day-section${hovered ? "--hovered" : ""}`}
    >
      <div className="day-section__title">
        <div className="day-section__title__day">{day}</div>
        <div className="day-section__title__amount">£{amount}</div>
      </div>

      <div className="day-section__vendors">
        {vendors.map((vendor, index) => {
          return (
            <Vendor
              icon={vendor.icon}
              key={`vendor-${index}`}
              name={vendor.name}
              amount={vendor.amount}
              time={vendor.time}
            />
          );
        })}
      </div>
      {/* <div className="day-section__separator" /> */}
    </div>
  );
};

export default Day;
