import React from "react";

export default function HolidaySlide(props) {
  const { selectedSlide, index, holiday, total } = props;
  return (
    <div
      style={{
        display: selectedSlide === index ? "grid" : "none",
        gridArea: "holiday",
        padding: "0 10px",
        margin: "0",
        gridTemplateAreas: "'date name until index'",
        gridTemplateColumns: "70px auto 150px 100px"
      }}
    >
      <div style={{ gridArea: "date" }}>{`${holiday.month + 1}/${
        holiday.day
      }`}</div>
      <div style={{ gridArea: "name" }}>{`${holiday.name}`}</div>
      <div
        style={{ gridArea: "until", textAlign: "right" }}
      >{`${holiday.daysUntil} days away`}</div>
      <div style={{ gridArea: "index", textAlign: "right" }}>
        {`${index + 1}/${total}`}{" "}
      </div>
    </div>
  );
}
