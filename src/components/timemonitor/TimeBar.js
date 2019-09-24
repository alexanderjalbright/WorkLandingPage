import React, { Component } from "react";

export default class TimeBar extends Component {
  render() {
    return (
      <div
        className="time-bar-container"
        style={{
          boxShadow: "0px 2px 16px 0px rgba(0, 0, 0, 1)",
          gridArea: this.props.gridArea,
          backgroundColor: "#333",
          height: "80%",
          border: "none",
          borderRadius: "20px",
          overflow: "hidden"
        }}
      >
        <div
          className="time-bar"
          style={{
            width: `${this.props.elapsedPercent}%`,
            backgroundColor: "#006b92",
            height: "100%"
          }}
        ></div>
        <div
          className="time-info"
          style={{
            color: "#fff",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "relative",
            zIndex: "2",
            top: "-70%",
            left: "0"
          }}
        >
          <div>{`Elapsed: ${this.props.elapsedTime} (${this.props.elapsedPercent}%)`}</div>
          <div>{`Remaining: ${this.props.remainingTime} (${this.props.remainingPercent}%)`}</div>
        </div>
      </div>
    );
  }
}
