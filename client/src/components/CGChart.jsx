import React from "react";
import { Line } from "react-chartjs-2";

const CGChart = ({ semesters, cgpaValues, sgpaValues }) => {
  const totalCGPA = cgpaValues.reduce((sum, value) => sum + value, 0);
  const averageCGPA = totalCGPA / semesters.length;
  const lowestCGPA = Math.min(...cgpaValues);
  const lowestSGPA = Math.min(...sgpaValues);
  const showYAxisTicks = averageCGPA <= 3.0;

  const data = {
    labels: semesters,
    datasets: [
      {
        label: `CGPA: ${averageCGPA.toFixed(2)}`,
        data: cgpaValues,
        fill: false,
        // borderColor: "rgba(75,192,192,1)",
        borderColor: "#ffa07a",
      },
      {
        label: `SGPA: ${sgpaValues[4].toFixed(2)}`,
        data: sgpaValues,
        fill: false,
        // borderColor: "rgba(75,192,192,1)",
        borderColor: "#00a050",
      },
    ],
  };

  const options = {
    // maintainAspectRatio: true,
    responsive: true,

    scales: {
      x: {
        type: "category",
        labels: semesters,
        scaleLabel: {
          display: true,
          labelString: "Semesters",
        },
      },
      y: {
        beginAtZero: true,
        min: showYAxisTicks ? 0 : lowestSGPA - 0.06,
        max: 4.01,
        scaleLabel: {
          display: true,
          labelString: "CGPA",
        },
      },
    },
    legend: {
      display: false, // Hide legend
    },
  };

  return (
    <>
      <div style={{ width: "500px" }}>
        <Line data={data} options={options} />
      </div>
    </>
  );
};

export default CGChart;
