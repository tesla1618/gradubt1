import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import "../css/chart.css";
import { API_URL } from "../config";
import DonutChart from "react-donut-chart";
// import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const LOCALHOST = `${API_URL}`;

const StudentList = () => {
  const [studentData, setStudentData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get(`${LOCALHOST}/api/students/`)
      .then((response) => {
        setStudentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const countStudentsByDept = () => {
    const deptCounts = {};

    // Iterate through studentData and count occurrences of each department
    studentData.forEach((student) => {
      const dept = student.dept;
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });

    return deptCounts;
  };

  const deptCounts = countStudentsByDept();
  const [decimation, setDecimation] = useState({
    enabled: true,
    algorithm: "min-max",
  });
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    setFilteredStudents(studentData.filter((student) => parseInt(student.sid) == parseInt(query)));
  }, [query, studentData]);

  const chartData = {
    labels: Object.keys(deptCounts),
    datasets: [
      {
        label: "Number of Students",
        data: Object.values(deptCounts),
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
        borderColor: ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    parsing: false,
    responsive: true,
    height: 100,
    width: 300,
    maintainAspectRatio: false,
    plugins: {
      decimation: decimation,
    },
    scales: {
      y: {
        ticks: {
          callback: (label) => `$ ${label}`,
        },
      },
    },
  };

  return (
    <Layout>
      <div className="chart-container container pt-5">
        <Bar data={chartData} chartOptions={chartOptions} />
      </div>
      <div className="container py-5  table-responsive">
        {/* <input type="text" placeholder="Search by name" onChange={(e) => setQuery(e.target.value)} /> */}
        <div class="input-group  mb-4">
          <div class="form-outline ">
            <input type="text" value={query} className="form-control" placeholder="Search by Student ID" onChange={(e) => setQuery(e.target.value)} />
          </div>
          <button id="search-button" type="button" class="btn btn-primary">
            <i class="bi bi-search"></i>
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Student ID</th>
              <th>Intake</th>
              <th>Section</th>
              <th>Department</th>
              <th>Session</th>
            </tr>
          </thead>
          <tbody>
            {query
              ? filteredStudents.map((student) => (
                  <tr key={student.id} className="align-baseline">
                    <td>
                      <img className="rounded-circle" src={`${LOCALHOST}/${student.dp}`} alt={student.sname} width="50px" height="50px" />
                    </td>
                    <td>{student.sname}</td>
                    <td>{student.sid}</td>
                    <td>{student.intake}</td>
                    <td>{student.section}</td>
                    <td>{student.dept}</td>
                    <td>{student.session}</td>
                  </tr>
                ))
              : studentData.map((student) => (
                  <tr key={student.id} className="align-baseline">
                    <td>
                      <img className="rounded-circle" src={`${LOCALHOST}/${student.dp}`} alt={student.sname} width="50px" height="50px" />
                    </td>
                    <td>{student.sname}</td>
                    <td>{student.sid}</td>
                    <td>{student.intake}</td>
                    <td>{student.section}</td>
                    <td>{student.dept}</td>
                    <td>{student.session}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default StudentList;
