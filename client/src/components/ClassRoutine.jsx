import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

const ClassRoutine = () => {
  const colors = ["#6b00c2", "#00ca7d", "#007fb1", "#ff6347", "#c00060", "#00a524", "#8a2be2", "#00ced1", "#ffa07a", "#778899"];

  const classesToday = [
    { startTime: "2:00 PM", endTime: "3:15 PM", code: "CSE351", name: "Artificial Intelligence" },
    { startTime: "3:15 PM", endTime: "4:30 PM", code: "CSE417", name: "Distributed Database Systems" },
    { startTime: "4:30 PM", endTime: "5:45 PM", code: "CSE327", name: "Software Engineering" },
    // Add more classes as needed
  ];

  return (
    <VerticalTimeline layout="1-column-left">
      {classesToday.map((classInfo, index) => (
        <VerticalTimelineElement icon={classInfo.code} key={index} className="vertical-timeline-element--work" contentStyle={{ background: colors[index % colors.length], color: "#fff" }} contentArrowStyle={{ borderRight: `7px solid ${colors[index % colors.length]}` }} date={`${classInfo.startTime} - ${classInfo.endTime}`} iconStyle={{ background: colors[index % colors.length], color: "#fff", fontSize: "70%", padding: "5px", display: "flex", flexDirection: "row", justifyContent: "baseline", alignContent: "center", alignItems: "center" }}>
          <h5 className="vertical-timeline-element-title">{classInfo.name}</h5>
          <h6 className="vertical-timeline-element-subtitle">{classInfo.code}</h6>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default ClassRoutine;
