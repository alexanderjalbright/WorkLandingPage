import React, { useState } from "react";
import HolidaySlide from "./HolidaySlide";

export default function HolidaySlideShow(props) {
  const [selectedSlide, setSelectedSlide] = useState(0);
  const { holidays } = props;

  const next = () => {
    const nextPosition =
      selectedSlide < holidays.length - 1 ? selectedSlide + 1 : 0;
    setSelectedSlide(nextPosition);
  };

  const prev = () => {
    const prevPosition =
      selectedSlide > 0 ? selectedSlide - 1 : holidays.length - 1;
    setSelectedSlide(prevPosition);
  };

  const arrowStyle = { border: "none", background: "none", color: "#fff" };
  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: "'prev holiday next'",
        gridTemplateColumns: "40px 1fr 40px",
        color: "#fff"
      }}
    >
      <button
        style={{ ...arrowStyle, gridArea: "prev", textAlign: "left" }}
        onClick={prev}
      >
        {"<"}
      </button>
      {holidays.map((holiday, index) => (
        <HolidaySlide
          key={`holiday${holiday.name}`}
          holiday={holiday}
          index={index}
          selectedSlide={selectedSlide}
          total={holidays.length}
          removeHoliday={props.removeHoliday}
          prev={prev}
        />
      ))}
      <button
        style={{ ...arrowStyle, gridArea: "next", textAlign: "right" }}
        onClick={next}
      >
        {">"}
      </button>
    </div>
  );
}
