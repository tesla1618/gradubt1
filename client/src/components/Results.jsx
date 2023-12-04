import * as React from "react";

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { DEFAULT_OPTIONS, getTheme } from "@table-library/react-table-library/material-ui";
import { Stack, TextField } from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";

import Layout from "./Layout";
import CGChart from "./CGChart";

const Results = () => {
  const nodes = [
    {
      id: "0",
      code: "CSE332",
      name: "Advanced Programming Lab",
      credit: 1.5,
      type: "Lab",
      mid: 26,
      final: 35,
      misc: 27,
      total: 88,
      grade: "A+",
    },
    {
      id: "8",
      code: "CSE310",
      name: "Operating Systems Lab",
      credit: 1.5,
      type: "Lab",
      final: 35,
      mid: 26,
      misc: 26,
      total: 87,
      grade: "A+",
    },
    {
      id: "1",
      code: "CSE316",
      name: "Microprocessor and Interfacing Lab",
      credit: 1.5,
      type: "Lab",
      mid: 31,
      final: 23,
      misc: 26,
      total: 80,
      grade: "A+",
    },
    {
      id: "3",
      code: "CSE315",
      name: "Microprocessor and Interfacing",
      credit: 3,
      type: "Theory",
      mid: 24,
      final: 30,
      misc: 26,
      total: 80,
      grade: "A+",
    },
    {
      id: "2",
      code: "CSE331",
      name: "Advanced Programming",
      credit: 3,
      type: "Theory",
      mid: 25,
      final: 31,
      misc: 24,
      total: 80,
      grade: "A+",
    },

    {
      id: "4",
      code: "CSE317",
      name: "System Analysis and Design",
      credit: 3,
      type: "Theory",
      mid: 24,
      final: 32,
      misc: 24,
      total: 80,
      grade: "A+",
    },
    {
      id: "5",
      code: "CSE318",
      name: "System Analysis and Design Lab",
      credit: 1.5,
      type: "Lab",
      final: 30,
      mid: 21,
      misc: 29,
      total: 80,
      grade: "A+",
    },
    {
      id: "6",
      code: "CSE313",
      name: "Mathemical Analysis for Computer Science",
      credit: 3,
      type: "Theory",
      final: 30,
      mid: 22,
      misc: 28,
      total: 80,
      grade: "A+",
    },
    {
      id: "7",
      code: "CSE309",
      name: "Operating Systems",
      credit: 3,
      type: "Theory",
      final: 32,
      mid: 22,
      misc: 26,
      total: 80,
      grade: "A+",
    },
  ];
  const key = "Search";
  let data = { nodes };

  const materialTheme = getTheme(DEFAULT_OPTIONS);
  const theme = useTheme(materialTheme);

  const [search, setSearch] = React.useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const semesters = ["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5"];
  const cgpaValues = [3.98, 3.94, 3.87, 3.76, 3.81];
  const sgpaValues = [3.98, 3.9, 3.75, 3.43, 4.0];

  data = {
    nodes: data.nodes.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.code.toLowerCase().includes(search.toLowerCase())),
  };

  const COLUMNS = [
    { label: "Course Code", renderCell: (item) => item.code, resize: true },
    { label: "Course", renderCell: (item) => item.name, resize: true },
    { label: "Credit", renderCell: (item) => item.credit },
    { label: "Mid", renderCell: (item) => item.mid },
    { label: "Final", renderCell: (item) => item.final },
    { label: "Out of 30", renderCell: (item) => item.misc },
    { label: "Total", renderCell: (item) => item.total },
    { label: "Grade", renderCell: (item) => item.grade },
  ];

  return (
    <Layout>
      <div className="container py-4">
        <div className="row">
          <div className="col-md-6 col-12">
            <div className="pcontainer">
              <CGChart semesters={semesters} cgpaValues={cgpaValues} sgpaValues={sgpaValues} />
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
