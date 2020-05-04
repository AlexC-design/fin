import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import "./css/doughnut.css";
import { connect } from "react-redux";
import { setHovered } from "../../../store/state/hovered";

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";

const Doughnut = ({ categories, setGlobalHovered, globalHovered }) => {
  const [localHovered, setLocalHovered] = useState(null);
  const [sectionHover, setSectionHover] = useState(false);
  const [chart, setChart] = useState("");

  const chartRef = React.createRef();

  const highlightSegment = (chart, index, isHighlight) => {
    console.log(chart);
    let activeSegment = chart.getDatasetMeta(0).data[index];

    chart.updateHoverStyle(
      [activeSegment],
      chart.options.hover.mode,
      isHighlight
    );
    chart.draw();
  };

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
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 0.9,
        cutoutPercentage: 60,
        layout: {
          padding: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10
          }
        },
        onHover: e => {
          if (myDoughnut.getElementAtEvent(e)[0]) {
            if (myDoughnut.getElementAtEvent(e)[0]._index !== localHovered) {
              setLocalHovered(myDoughnut.getElementAtEvent(e)[0]._index);
            }
          } else {
            setLocalHovered(null);
          }
        },
        animation: {
          animateRotate: true
          // animateScale: true
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              //
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

    setChart(myDoughnut);
  }, []);

  useEffect(() => {
    if (sectionHover && localHovered !== globalHovered) {
      setGlobalHovered(localHovered);
    }

    if (chart && !sectionHover) {
      if (globalHovered !== null) {
        console.log("ON:", globalHovered);

        highlightSegment(chart, globalHovered, true);
      }
    }

    // if (chart && !sectionHover) {
    //   highlightSegment(chart, globalHovered, true);
    //   categories.forEach((_, index) => {
    //     if (globalHovered !== index) {
    //       highlightSegment(chart, index, false);
    //     }
    //   });
    // }

    return () => {
      if (chart && !sectionHover) {
        if (globalHovered !== null) {
          console.log("OFF:", globalHovered);
          highlightSegment(chart, globalHovered, false);
        }
      }
    };
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
  globalHovered: state.hovered.index
});
const mapDispatchToProps = dispatch => ({
  setGlobalHovered: index => dispatch(setHovered(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Doughnut);
