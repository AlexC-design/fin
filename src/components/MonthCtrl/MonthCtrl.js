import React, { useState, useEffect } from "react";
import "./css/month-ctrl.css";
import MonthButton from "./MonthButton";
import moment from "moment";
import { connect } from "react-redux";
import { setMoment } from "../../store/state/currentMoment";

const MonthCtrl = ({ setMoment }) => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [isCurrentMonth, setIsCurrentMonth] = useState(
    moment(currentTime).isSame(moment(), "month")
  );
  const [tempDisabled, setTempDisabled] = useState(false);

  const handleTempDisabled = () => {
    if (!tempDisabled) {
      setTempDisabled(true);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (setTempDisabled) {
        setTempDisabled(false);
      }
    }, 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [tempDisabled]);

  const nextMonth = () => {
    setCurrentTime(moment(currentTime).add(1, "M"));
    handleTempDisabled();
  };
  const prevMonth = () => {
    setCurrentTime(moment(currentTime).subtract(1, "M"));
    handleTempDisabled();
  };

  const currentMonth = () => {
    return moment(currentTime).format("MMMM");
  };
  const currentYear = () => {
    return moment(currentTime).format("YYYY");
  };

  useEffect(() => {
    setIsCurrentMonth(moment(currentTime).isSame(moment(), "month"));
    setMoment(currentTime);
  }, [currentTime, setMoment]);

  return (
    <div className="month-ctrl">
      <div className="month-ctrl__month">{`${currentMonth()} ${currentYear()}`}</div>
      <div className="buttons-container">
        <MonthButton
          tempDisabled={tempDisabled}
          disabled={isCurrentMonth}
          action={nextMonth}
          buttonName={"Next month"}
          direction={"right"}
        />
        <MonthButton
          tempDisabled={tempDisabled}
          disabled={false}
          action={prevMonth}
          buttonName={"Previous month"}
          direction={"left"}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  setMoment: moment => dispatch(setMoment(moment))
});

export default connect(null, mapDispatchToProps)(MonthCtrl);
