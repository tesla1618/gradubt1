import React, { useState, useEffect } from "react";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/material-ui";
import { Stack, TextField } from "@mui/material";
import { BiSearch } from "react-icons/bi";
import Layout from "./Layout";
import CGChart2 from "./CGChart2";

const Results = () => {
  const [results, setResults] = useState([]);
  const [search, setSearch] = React.useState("");
  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    fetchResults();
  }, []); // Fetch results only once when the component mounts

  const fetchResults = async () => {
    try {
      const response = await fetch(`http://192.168.0.106:8000/results/?username=rajieb`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  // const data = {
  //   nodes: results.filter((item) => item.semester.courses[0].ccode.includes(search.toLowerCase()) || item.semester.year.toString().includes(search) || item.mark.toString().includes(search) || item.grade.toLowerCase().includes(search.toLowerCase()) || item.gpa.toString().includes(search)),
  // };

  const nodes = results.flatMap((item) =>
    item.semester.courses.map((course) => ({
      semester: item.semester.semester,
      year: item.semester.year,
      code: course.ccode,
      name: course.cname,
      result: item.grade,
    }))
  );

  const data = nodes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.code.toLowerCase().includes(search.toLowerCase()));

  const COLUMNS = [
    { label: "Semester", renderCell: (item) => `${item.semester} ${item.year}` },
    { label: "Course Code", renderCell: (item) => item.code, resize: true },
    { label: "Course Name", renderCell: (item) => item.name, resize: true },
    { label: "Result", renderCell: (item) => item.result },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="pcontainer">
              {/* <CGChart semesters={semesters} cgpaValues={cgpaValues} sgpaValues={sgpaValues} /> */}
              <CGChart2 height={250} width={500} />
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="pcontainer">
              <div
                style={{
                  border: "1px dotted #ccc",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  textAlign: "center",
                  alignItems: "center",
                  height: "250px",
                }}
              >
                <h2>Analyze Result</h2>
                <h6>Set a cgpa goal, and the system will tell you how much you need to score in the next semester to achieve it.</h6>
              </div>
            </div>
          </div>
        </div>
        <Stack spacing={10}>
          <TextField label="Search by course name" value={search} icon={<BiSearch />} onChange={handleSearch} />
        </Stack>
        <br />
        <h5 className="mb-4">Previous Semester</h5>
        <CompactTable columns={COLUMNS} data={data} theme={theme} />
        <div className="bg-success text-white p-3 text-center">
          SGPA: <b>4.00</b> &nbsp; CGPA: <b>3.81</b>
        </div>
      </div>
    </Layout>
  );
};

export default Results;
