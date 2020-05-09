import React, { useEffect } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { setDays } from "../../store/state/mockData";

const MockDays = ({ total, setDays, currentMoment }) => {
  const buildDailyTotal = (daysNo, total) => {
    const dailyAvg = (total / daysNo).toFixed(2);
    const amounts = new Array(daysNo).fill(parseFloat(dailyAvg));

    for (let index = 1; index < amounts.length; index += 2) {
      let transfer = (Math.random() * (dailyAvg - 5)).toFixed(2);
      amounts[index - 1] = parseFloat(
        parseFloat(amounts[index - 1] - transfer).toFixed(2)
      );
      amounts[index] = parseFloat(
        parseFloat(amounts[index] + parseFloat(transfer)).toFixed(2)
      );
    }

    return amounts;
  };

  const buildDays = currentMoment => {
    let days = [];
    const amounts = buildDailyTotal(moment(currentMoment).daysInMonth(), total);

    const accTotal = [];

    amounts.forEach((amount, index) => {
      if (index > 0) {
        accTotal[index] = parseFloat(
          parseFloat(accTotal[index - 1] + amount).toFixed(2)
        );
      } else {
        accTotal[0] = amount;
      }
    });

    for (let day = 1; day <= moment(currentMoment).daysInMonth(); day++) {
      days.push({
        day: moment(currentMoment).date(day).format("DD MMM"),
        amount: amounts[day - 1],
        accTotal: accTotal[day - 1]
      });
    }

    return days;
  };

  useEffect(() => {
    if (currentMoment) {
      const days = buildDays(currentMoment);
      setDays(days);
    }
  });

  return <></>;
};

const mapStateToProps = state => ({
  total: state.mockData.total,
  currentMoment: state.currentMoment.moment
});

const mapDispatchToProps = dispatch => ({
  setDays: days => dispatch(setDays(days))
});

export default connect(mapStateToProps, mapDispatchToProps)(MockDays);
