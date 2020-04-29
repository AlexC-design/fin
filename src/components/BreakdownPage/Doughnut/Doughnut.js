import React, { useEffect, useState } from "react";
import Chart from "chart.js";
import "./css/doughnut.css";

Chart.defaults.global.defaultFontFamily = "'Roboto', sans-serif";
Chart.defaults.global.legend.display = false;

const Doughnut = ({ categories }) => {
  const [hovered, setHovered] = useState("");

  const chartRef = React.createRef();

  const total = categories.reduce((acc, cur) => {
    return acc + cur.data;
  }, 0);

  useEffect(() => {
    const doughnutChart = chartRef.current.getContext("2d");

    new Chart(doughnutChart, {
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
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              console.log("TEST", data.labels[tooltipItem.index]);
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
  });

  return (
    <div className="doughnut">
      <div className="doughnut__chart">
        <canvas id="doughnut__chart__canvas" ref={chartRef} />
      </div>
      <div className="doughnut__total">
        <div className="doughnut__total__text">{total}&pound;</div>
      </div>
    </div>
  );
};

export default Doughnut;
