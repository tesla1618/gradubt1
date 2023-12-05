import React from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Spring 21", sgpa: 3.95, cgpa: 3.95 },
  { name: "Fall 21", sgpa: 3.9, cgpa: ((3.95 + 3.9) / 2).toFixed(2) },
  { name: "Spring 22", sgpa: 3.85, cgpa: ((3.95 + 3.9 + 3.85) / 3).toFixed(2) },
  { name: "Fall 22", sgpa: 3.43, cgpa: ((3.95 + 3.9 + 3.85 + 3.43) / 4).toFixed(2) },
  { name: "Spring 23", sgpa: 4, cgpa: ((3.95 + 3.9 + 3.85 + 3.43 + 4) / 5).toFixed(2) },
  { name: "Fall 23", sgpa: 4, cgpa: ((3.95 + 3.9 + 3.85 + 3.43 + 4 + 4) / 6).toFixed(2) },
];

const CGChart2 = ({ height, width }) => {
  if (height === undefined) height = 300;
  if (width === undefined) width = 450;

  const renderLineChart = (
    <LineChart width={width} height={height} data={data}>
      <Line dataKey="sgpa" stroke="#00a050" />
      <Line dataKey="cgpa" stroke="#ffa07a" />
      <CartesianGrid stroke="#ccc" strokeDasharray="4 4" />
      <XAxis dataKey="name" fontSize={9} />
      <YAxis domain={["dataMin", "dataMax"]} />
      <Tooltip />
    </LineChart>
  );

  return renderLineChart;
};

export default CGChart2;
