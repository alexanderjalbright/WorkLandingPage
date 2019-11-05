import React from "react";

export default function HolidaySlide(props) {
  const {
    selectedSlide,
    prev,
    index,
    holiday,
    total,
    removeHoliday
  } = props;
  const removeHolidayHandler = name => {
    removeHoliday(name);
    if (index !== 0) {
      prev();
    }
  };
  return (
    <div
      style={{
        display: selectedSlide === index ? "grid" : "none",
        gridArea: "holiday",
        padding: "0",
        margin: "0",
        gridTemplateAreas: "'date name until index remove'",
        gridTemplateColumns: "70px 1fr 150px 100px 30px"
      }}
    >
      <div style={{ gridArea: "date" }}>{`${holiday.date.getMonth() +
        1}/${holiday.date.getDate()}`}</div>
      <div style={{ gridArea: "name" }}>{`${holiday.name}`}</div>
      <div
        style={{ gridArea: "until", textAlign: "right" }}
      >{`${holiday.daysUntil} days away`}</div>
      <div style={{ gridArea: "index", textAlign: "right" }}>
        {`${index + 1}/${total}`}
      </div>
      {JSON.parse(localStorage.getItem("userHolidays")).filter(
        userHoliday => holiday.name === userHoliday.name
      ).length > 0 && (
        <button
          className="del-btn menu-btn"
          style={{ gridArea: "remove" }}
          onClick={() =>
            window.confirm(`You are about to remove ${holiday.name}`)
              ? removeHolidayHandler(holiday.name)
              : null
          }
        >
          &times;
        </button>
      )}
    </div>
  );
}
