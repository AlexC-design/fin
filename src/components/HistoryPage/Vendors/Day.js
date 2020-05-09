import React, { useState, useEffect } from "react";
import moment from "moment";
import "./css/vendors.css";
import mockVendor from "../../../utils/mockData/mockVendors";
import Vendor from "./Vendor";

const Day = ({ day, amount, vendorsNo }) => {
  const [vendors, setVendors] = useState([]);

  const buildVendors = (vendorsNo, amount) => {
    let vendors = [];
    let amounts = new Array(vendorsNo).fill(
      parseFloat(parseFloat(amount / vendorsNo).toFixed(2))
    );

    amounts.forEach((amount, index) => {
      if (index % 2) {
        const transfer = (Math.random() * amount).toFixed(2);

        amounts[index - 1] = parseFloat(
          parseFloat(amounts[index - 1] - transfer).toFixed(2)
        );
        amounts[index] = parseFloat(
          parseFloat(amounts[index] + parseFloat(transfer)).toFixed(2)
        );
      }
    });

    for (let i = 1; i <= vendorsNo; i++) {
      const vendor = mockVendor(amounts[i - 1], i, vendorsNo);
      vendors.push(vendor);
    }

    return vendors;
  };

  useEffect(() => {
    setVendors(buildVendors(vendorsNo, amount));
  }, []);

  return (
    <div className="day-section">
      <div className="day-section__title">
        <div className="day-section__title__day">
          {moment(day).format("DD MMM")}
        </div>
        <div className="day-section__title__amount">£{amount}</div>
      </div>

      <div className="day-section__vendors">
        {vendors.map(vendor => {
          return (
            <Vendor
              name={vendor.name}
              amount={vendor.amount}
              time={vendor.time}
            />
          );
        })}
      </div>
      <div className="day-section__separator" />
    </div>
  );
};

export default Day;
