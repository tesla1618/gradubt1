import React from "react";
import Layout from "./Layout";
import "../css/style.css";
import "../css/page.css";
import { Link } from "react-router-dom";
import "../css/dashboard.css";
import CGChart from "./CGChart";
import "../css/chart.css";
import ProgressBar from "@ramonak/react-progress-bar";
import ClassRoutine from "./ClassRoutine";
import CGChart2 from "./CGChart2";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const [semesters, setSemesters] = useState([]);
  const [semesterName, setSemesterName] = useState("Fall");
  const [year, setYear] = useState(2023);

  useEffect(() => {
    // Fetch semesters when component mounts or when semesterName/year changes
    fetchSemesters();
  }, [semesterName, year]);

  const fetchSemesters = async () => {
    try {
      const response = await fetch(`http://192.168.0.106:8000/semesters/?semester=${semesterName}&year=${year}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setSemesters(data.results);
    } catch (error) {
      console.error("Error fetching semesters:", error);
    }
  };

  const colors = ["#6b00c2", "#00ca7d", "#007fb1", "#ff6347", "#c00060", "#00a524", "#8a2be2", "#00ced1", "#ffa07a", "#778899"];
  const courses = [
    { code: "CSE417", name: "Distributed Database Systems", teacher: "Ali Azgar" },
    { code: "CSE418", name: "Distributed Database Systems Lab", teacher: "Ali Azgar" },
    { code: "CSE319", name: "Computer Networks", teacher: "Md Mamun Hasan" },
    { code: "CSE320", name: "Computer Network Lab", teacher: "Md Mamun Hasan" },
    { code: "CSE351", name: "Artificial Intelligence", teacher: "Shamim Ahmed" },
    { code: "CSE352", name: "Artificial Intelligence Lab", teacher: "Shamim Ahmed" },
    { code: "CSE407", name: "Project Management", teacher: "Abdullah Al Mamun" },
    { code: "CSE327", name: "Software Engineering", teacher: "Nourin Khandaker" },
    { code: "CSE328", name: "Software Engineering Lab", teacher: "Rumana Yasmin" },
    { code: "CSE300", name: "Software Development 3", teacher: "Ali Azgar" },
  ];
  const semesters1 = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5"];
  const cgpaValues = [3.98, 3.94, 3.87, 3.76, 3.81];
  const sgpaValues = [3.98, 3.9, 3.75, 3.43, 4.0];
  return (
    <Layout>
      <div className="container my-3">
        <div className="gbt-header">
          <h3>
            Rajieb <br />
          </h3>
          <h6>
            Department of Computer Science and Engineering <br />
          </h6>
          Intake <b>47</b> - Section <b>1</b> - ID: <b>20215103002</b>
        </div>
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="pcontainer-chart">
              {/* <CGChart semesters={semesters} cgpaValues={cgpaValues} sgpaValues={sgpaValues} /> */}
              <CGChart2 />
            </div>
            <div className="pcontainer">
              <h5 className="mt- mb-2">Classes Today</h5>
              <ClassRoutine />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="pcontainer">
              <ProgressBar completed={62.5} customLabel="62.5% completed" completedClassName="barCompleted" />
              <h5 className="mt-4 mb-2">Courses this Semester</h5>

              {semesters.map((semester) => (
                <div key={`${semester.semester}-${semester.year}`}>
                  <ul>
                    {semester.courses.map((course, index) => (
                      <div key={course.id} className="course" style={{ border: `1px solid ${colors[index % colors.length]}` }}>
                        <div className="course-code" style={{ backgroundColor: colors[index % colors.length] }}>
                          {course.ccode}
                        </div>
                        <div className="course-name">
                          <span style={{ color: colors[index % colors.length] }}>{course.cname}</span>
                        </div>
                      </div>
                      // <li key={course.id}>
                      //   <strong>{`${course.cname} (${course.ccode})`}</strong>
                      //   <p>Credit: {course.credit}</p>
                      //   <p>Department: {course.program.department}</p>
                      // </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
