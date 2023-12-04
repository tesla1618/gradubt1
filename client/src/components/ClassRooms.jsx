import React from "react";
import Layout from "./Layout";
import "../css/style.css";
import "../css/page.css";
import "../css/classroom.css";

const ClassRooms = () => {
  const colors = ["#6b00c2", "#00ca7d", "#007fb1", "#ff6347", "#c00060", "#00a524", "#8a2be2", "#00ced1", "#ffa07a", "#778899"];
  const courses = [
    { code: "CSE417", name: "Distributed Database Systems", teacher: "Ali Azgar", postType: "" },
    { code: "CSE418", name: "Distributed Database Systems Lab", teacher: "Ali Azgar", postType: "Announcement", post: "Full Presentation:<br/><b>15/11/23</b>. at 2PM" },
    { code: "CSE319", name: "Computer Networks", teacher: "Md Mamun Hasan", postType: "" },
    { code: "CSE320", name: "Computer Network Lab", teacher: "Md Mamun Hasan", postType: "Anouncement", post: "Lab Final:<br/><b>16/11/23</b>. at 11AM, B2/419" },
    { code: "CSE351", name: "Artificial Intelligence", teacher: "Shamim Ahmed", postType: "" },
    { code: "CSE352", name: "Artificial Intelligence Lab", teacher: "Shamim Ahmed", postType: "" },
    { code: "CSE407", name: "Project Management", teacher: "Abdullah Al Mamun", postType: "" },
    { code: "CSE327", name: "Software Engineering", teacher: "Nourin Khandaker", postType: "" },
    { code: "CSE328", name: "Software Engineering Lab", teacher: "Rumana Yasmin" },
    { code: "CSE300", name: "Software Development 3", teacher: "Ali Azgar", postType: "" },
  ];
  return (
    <Layout>
      <div className="container my-4">
        <div className="row">
          {courses.map((course, index) => (
            <div className="col-md-6 col-12">
              <div key={index} className="classes" style={{ backgroundColor: `${colors[index % colors.length]}` }}>
                <div className="class-name">{course.name}</div>
                <div className="class-code">
                  {course.code} &nbsp;-&nbsp; {course.teacher} <br />
                </div>
              </div>
              {course.postType && course.post ? (
                <div className="post-wrap">
                  <b>{course.postType}</b>:<br />
                  <div className="post" dangerouslySetInnerHTML={{ __html: course.post }} />
                </div>
              ) : (
                <div className="post-wrap">
                  <div className="post">No Announcements and dues so far</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ClassRooms;
