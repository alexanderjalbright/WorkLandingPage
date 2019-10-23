import React, { Component } from "react";
import HolidaySlide from "./HolidaySlide";

export default class HolidaySlideShow extends Component {
  constructor() {
    super();
    this.state = {
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
          gridTemplateColumns: "20px 1fr 50px",
          color: "#fff"
        }}
      >
        <button
          style={{ ...arrowStyle, gridArea: "prev", textAlign: "left" }}
          onClick={this.prev}
        >
          {"<"}
        </button>
        {this.props.holidays.map((holiday, index) => (
          <HolidaySlide
            key={`holiday${holiday.name}`}
            holiday={holiday}
            index={index}
            selectedSlide={this.state.selectedSlide}
            total={this.props.holidays.length}
          />
        ))}
        <button
          style={{ ...arrowStyle, gridArea: "next", textAlign: "right" }}
          onClick={this.next}
        >
          {">"}
        </button>
      </div>
    );
  }

  next = () => {
    const nextPosition =
      this.state.selectedSlide < this.props.holidays.length - 1
        ? this.state.selectedSlide + 1
        : 0;
    this.setState({ selectedSlide: nextPosition });
  };

  prev = () => {
    const prevPosition =
      this.state.selectedSlide > 0
        ? this.state.selectedSlide - 1
        : this.props.holidays.length - 1;
    this.setState({ selectedSlide: prevPosition });
  };
}
