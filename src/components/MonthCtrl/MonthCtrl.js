import React from "react";
import "./css/month-ctrl.css";
import MonthButton from "./MonthButton";

const MonthCtrl = ({ currentMonth }) => {
  const nextMonth = () => {
    //TODO
  };
  const prevMonth = () => {
    //TODO
  };

  return (
    <div className="month-ctrl">
      <div className="month-ctrl__month">April 2020</div>
      <div className="buttons-container">
        <MonthButton
          disabled={true}
          action={nextMonth}
          buttonName={"Next month"}
          direction={"right"}
        />
        <MonthButton
          disabled={false}
          action={prevMonth}
          buttonName={"Previous month"}
          direction={"left"}
        />
      </div>
    </div>
  );
};

export default MonthCtrl;
