import React, { Component } from "react";
import HolidaySlide from "./HolidaySlide";

export default class HolidaySlideShow extends Component {
  constructor() {
    super();
    this.state = {
      holidays: ["Birthday", "New Years"],
      selectedSlide: 0
    };
  }
  render() {
    const arrowStyle = { border: "none", background: "none", color: "#fff" };
    return (
      <div
        style={{
          display: "grid",
          gridTemplateAreas: "'prev holiday next'",
          gridTemplateColumns: "1fr 15fr 1fr",
          color: "#fff"
        }}
      >
        <button style={{ ...arrowStyle, gridArea: "prev" }} onClick={this.prev}>
          {"<"}
        </button>
        {this.state.holidays.map((holiday, index) => (
          <HolidaySlide
            holiday={holiday}
            index={index}
            selectedSlide={this.state.selectedSlide}
          />
        ))}
        <button style={{ ...arrowStyle, gridArea: "next" }} onClick={this.next}>
          {">"}
        </button>
      </div>
    );
  }
  next = () => {
    const nextPosition =
      this.state.selectedSlide < this.state.holidays.length - 1
        ? this.state.selectedSlide + 1
        : 0;
    this.setState({ selectedSlide: nextPosition });
  };

  prev = () => {
    const prevPosition =
      this.state.selectedSlide > 0
        ? this.state.selectedSlide - 1
        : this.state.holidays.length - 1;
    this.setState({ selectedSlide: prevPosition });
  };
}
