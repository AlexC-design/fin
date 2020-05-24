import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import "./css/doughnut.css";
import { connect } from "react-redux";
import { setHovered } from "../../../store/state/hovered";

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";

const Doughnut = ({
  categories,
  setGlobalHovered,
  globalHovered,
  currentMoment,
  total,
  theme
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

  useEffect(() => {
    const doughnutChart = chartRef.current.getContext("2d");

    let myDoughnut = new Chart(doughnutChart, {
      type: "doughnut",
      data: {
        labels: categories.map(cat => cat.name),
        datasets: [
          {
            data: categories.map(cat => {
              return cat.data;
            }),
            backgroundColor: categories.map(cat => cat.color[`${theme}`]),
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

    if (myDoughnut) {
      setChart(myDoughnut);
    }

    return () => {
      myDoughnut.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localHovered, globalHovered]);

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
        <div className="doughnut__total__text">
          <span className="doughnut__total__pound">&pound;</span>
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
  total: state.mockData.total,
  theme: state.theme
});
const mapDispatchToProps = dispatch => ({
  setGlobalHovered: index => dispatch(setHovered(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Doughnut);
