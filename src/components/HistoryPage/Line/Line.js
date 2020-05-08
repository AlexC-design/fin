import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import "./css/line.css";
import { connect } from "react-redux";
import { setHovered } from "../../../store/state/hovered";

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";

const Line = ({
  categories,
  setGlobalHovered,
  globalHovered,
  currentMoment,
  total
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
    const lineCHart = chartRef.current.getContext("2d");

    let myLine = new Chart(lineCHart, {
      type: "line",
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
        aspectRatio: 1,
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
          callbacks: {
            label: function (tooltipItem, data) {
              let dataLabel = " " + data.labels[tooltipItem.index] + ": ";
              let value =
                "£" +
                data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];

              dataLabel += value;

              return dataLabel;
            }
          }
        }
      }
    });

    setChart(myLine);

    return () => {
      myLine.destroy();
    };
  }, [currentMoment]);

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
      <div className="Line__total">
        <div className="Line__total__text">
          <span className="Line__total__pound">&pound;</span>
          {total}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  globalHovered: state.hovered.index,
  currentMoment: state.currentMoment.moment,
  categories: state.mockData.categories,
  total: state.mockData.total
});
const mapDispatchToProps = dispatch => ({
  setGlobalHovered: index => dispatch(setHovered(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Line);
