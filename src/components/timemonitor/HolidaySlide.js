import React, { Component } from "react";

export default class HolidaySlide extends Component {
  render() {
    const { selectedSlide, index, holiday } = this.props;
    return (
      <div
        style={{
          display: selectedSlide === index ? "block" : "none",
          gridArea: "holiday",
          padding: "0 10px"
        }}
      >
        {holiday}
      </div>
    );
  }
}
