import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import "./css/line.css";
import { connect } from "react-redux";
import { setHovered } from "../../../store/state/hovered";

const Line = ({
  setGlobalHovered,
  globalHovered,
  currentMoment,
  total,
  days
}) => {
  const [localHovered, setLocalHovered] = useState(null);
  const [sectionHover, setSectionHover] = useState(false);
  const [chart, setChart] = useState(null);

  const chartRef = React.createRef();

  const highlightSegment = (chart, index, isHighlight) => {
    if (chart !== null) {
      let activeSegment = chart.getDatasetMeta(0).data[index];

      chart.updateHoverStyle(
        [activeSegment],
        chart.options.hover.mode,
        isHighlight
      );
      chart.draw();
    }
  };

  //= = = = = = = = = = = = = = =  CDM = = = = = = = = = = = = = = = = = = = = =
  useEffect(() => {
    const lineChart = chartRef.current.getContext("2d");

    let gradientFill = lineChart.createLinearGradient(0, 1, 0, 250);
    gradientFill.addColorStop(0, "rgba(54, 68, 150, 0.9)");
    gradientFill.addColorStop(1, "rgba(54, 68, 150, 0)");

    //============================== OPTIONS ====================================
    let options = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      title: {
        display: true,
        fontSize: 18,
        padding: 20,
        fontColor: "rgba(54, 68, 150, 0.9)",
        text: "Total spendings: £" + total
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 1
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              drawBorder: false,
              borderDash: [8, 4]
            },
            ticks: {
              maxTicksLimit: 4
            }
          }
        ]
      },
      legend: {
        display: false
      },
      tooltips: {
        custom: function (tooltip) {
          if (!tooltip) return;
          // disable displaying the color box;
          tooltip.displayColors = false;
        },
        mode: "nearest",
        intersect: false,
        callbacks: {
          label: function (tooltipItem, data) {
            if (tooltipItem && tooltipItem.index !== undefined) {
              setLocalHovered(tooltipItem.index);
            }
            return (
              "£" +
              data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
            );
          }
        }
      }
    };
    //============================ OPTIONS END ==================================

    //= = = = = = = = = = = = = = =  CHART = = = = = = = = = = = = = = = = = = = = =
    let myLine = new Chart(lineChart, {
      type: "line",
      data: {
        labels: days.map(day => day.day),
        datasets: [
          {
            data: days.map(day => day.accTotal),
            borderColor: "rgba(54, 68, 150, 0.9)",
            fill: true,
            backgroundColor: gradientFill,
            hoverBorderWidth: 2,
            hoverBorderColor: "#08d5e8",
            hoverBackgroundColor: "#08d5e8",
            pointBorderWidth: 0,
            pointBorderColor: "rgba(0, 0, 0, 0)",
            pointBackgroundColor: "rgba(0, 0, 0, 0)"
          }
        ]
      },
      options
    });

    if (myLine) {
      setChart(myLine);
    }

    return () => {
      myLine.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMoment, days]);

  // = = = = = = = = = = = = = = =  CDU hover local = = = = = = = = = = = = = = = = = = = =
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (sectionHover) {
        setGlobalHovered(localHovered);
      }
    }, 200);

    return () => {
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localHovered]);

  // = = = = = = = = = = = = = = =  CDU hover global = = = = = = = = = = = = = = = = = = = =
  useEffect(() => {
    console.log({ localHovered }, { globalHovered }, { sectionHover });
    if (chart && !sectionHover) {
      if (globalHovered !== null) {
        highlightSegment(chart, globalHovered, true);
      }
    }

    return () => {
      if (chart !== null && !sectionHover) {
        if (globalHovered !== null) {
          highlightSegment(chart, globalHovered, false);
        }
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalHovered]);

  return (
    <div
      onMouseEnter={() => setSectionHover(true)}
      onMouseLeave={() => setSectionHover(false)}
      className="Line"
    >
      <div className="Line__chart">
        <canvas id="Line__chart__canvas" ref={chartRef} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  globalHovered: state.hovered.index,
  currentMoment: state.currentMoment.moment,
  days: state.mockData.days,
  total: state.mockData.total
});
const mapDispatchToProps = dispatch => ({
  setGlobalHovered: index => dispatch(setHovered(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Line);
