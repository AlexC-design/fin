import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import "./css/line.css";
import { connect } from "react-redux";
import { setHovered } from "../../../store/state/hovered";
// import "chartjs-plugin-crosshair";

const Line = ({
  setGlobalHovered,
  globalHovered,
  currentMoment,
  total,
  days
}) => {
  const [localHovered, setLocalHovered] = useState(null);
  const [sectionHover, setSectionHover] = useState(false);
  const [chart, setChart] = useState("");

  const chartRef = React.createRef();

  const highlightSegment = (chart, index, isHighlight) => {
    let activeSegment = chart.getDatasetMeta(0).data[index];

    chart.updateHoverStyle(
      [activeSegment],
      chart.options.hover.mode,
      isHighlight
    );
    chart.draw();
  };

  useEffect(() => {
    const lineChart = chartRef.current.getContext("2d");

    let gradientFill = lineChart.createLinearGradient(0, 1, 0, 250);
    gradientFill.addColorStop(0, "rgba(54, 68, 150, 0.9)");
    gradientFill.addColorStop(1, "rgba(54, 68, 150, 0)");

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
      onHover: e => {
        console.log(myLine);
        if (myLine.getElementAtEvent(e)[0]) {
          if (myLine.getElementAtEvent(e)[0]._index !== localHovered) {
            setLocalHovered(myLine.getElementAtEvent(e)[0]._index);
          }
        } else if (localHovered !== null) {
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
        // mode: "interpolate",
        // intersect: false,
        // callbacks: {
        //   label: function (tooltipItem, data) {
        //     let dataLabel = " " + data.labels[tooltipItem.index] + ": ";
        //     let value =
        //       "£" +
        //       data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        //     dataLabel += value;
        //     return dataLabel;
        //   }
        // }
      },
      plugins: {
        // crosshair: {
        //   line: {
        //     color: "#F66", // crosshair line color
        //     width: 1 // crosshair line width
        //   },
        //   sync: {
        //     enabled: true, // enable trace line syncing with other charts
        //     group: 1, // chart group
        //     suppressTooltips: false // suppress tooltips when showing a synced tracer
        //   },
        //   zoom: {
        //     enabled: true, // enable zooming
        //     zoomboxBackgroundColor: "rgba(66,133,244,0.2)", // background color of zoom box
        //     zoomboxBorderColor: "#48F", // border color of zoom box
        //     zoomButtonText: "Reset Zoom", // reset zoom button text
        //     zoomButtonClass: "reset-zoom" // reset zoom button class
        //   },
        //   callbacks: {
        //     beforeZoom: function (start, end) {
        //       // called before zoom, return false to prevent zoom
        //       return true;
        //     },
        //     afterZoom: function (start, end) {
        //       // called after zoom
        //     }
        //   }
        // }
      }
    };

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
            hoverBorderWidth: 5,
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

    setChart(myLine);

    return () => {
      myLine.destroy();
    };
  }, [currentMoment, days]);

  useEffect(() => {
    if (sectionHover && localHovered !== globalHovered) {
      setGlobalHovered(localHovered);
    }

    if (chart && !sectionHover) {
      if (globalHovered !== null) {
        highlightSegment(chart, globalHovered, true);
      }
    }

    return () => {
      if (chart && !sectionHover) {
        if (globalHovered !== null) {
          highlightSegment(chart, globalHovered, false);
        }
      }
    };
  }, [localHovered, globalHovered]);

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
