import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import "./css/doughnut.css";
import { connect } from "react-redux";
import { setHovered } from "../../../store/state/hovered";

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";

const Doughnut = ({ categories, setGlobalHovered, globalHovered }) => {
  const [localHovered, setLocalHovered] = useState(null);
  const [sectionHover, setSectionHover] = useState(false);

  const chartRef = React.createRef();

  const total = categories.reduce((acc, cur) => {
    return acc + cur.data;
  }, 0);

  useEffect(() => {
    const doughnutChart = chartRef.current.getContext("2d");

    const myDoughnut = new Chart(doughnutChart, {
      type: "doughnut",
      data: {
        labels: categories.map(cat => cat.name),
        datasets: [
          {
            data: categories.map(cat => {
              return cat.data;
            }),
            backgroundColor: categories.map(cat => cat.color),
            hoverBorderColor: "transparent",
            borderWidth: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 0.9,
        cutoutPercentage: 60,
        onHover: e => {
          if (myDoughnut.getElementAtEvent(e)[0]) {
            // console.log("IF:", myDoughnut.getElementAtEvent(e)[0]);
            if (myDoughnut.getElementAtEvent(e)[0]._index !== localHovered) {
              setLocalHovered(myDoughnut.getElementAtEvent(e)[0]._index);
            }
          } else {
            // console.log("else:", myDoughnut.getElementAtEvent(e), localHovered);
            setLocalHovered(null);
          }
        },
        animation: {
          animateRotate: true
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              // console.log("TEST", data.labels[tooltipItem.index]);
              let dataLabel = " " + data.labels[tooltipItem.index];
              let value =
                ": " +
                data.datasets[tooltipItem.datasetIndex].data[
                  tooltipItem.index
                ] +
                "£";

              dataLabel += value;

              return dataLabel;
            }
          }
        }
      }
    });
  }, []);

  useEffect(() => {
    if (sectionHover && localHovered !== globalHovered) {
      setGlobalHovered(localHovered);
    }
  });

  return (
    <div
      onMouseEnter={() => setSectionHover(true)}
      onMouseLeave={() => setSectionHover(false)}
      className="doughnut"
    >
      <div className="doughnut__chart">
        <canvas id="doughnut__chart__canvas" ref={chartRef} />
      </div>
      <div className="doughnut__total">
        <div className="doughnut__total__text">{total}&pound;</div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  GlobalHovered: state.hovered.index
});
const mapDispatchToProps = dispatch => ({
  setGlobalHovered: index => dispatch(setHovered(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Doughnut);
