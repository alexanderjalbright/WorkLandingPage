import React, { Component } from "react";
import { end } from "worker-farm";

export default class TimeBar extends Component {
  render() {
    return (
      <div
        style={{
          gridArea: this.props.gridArea,
          display: "grid",
          gridTemplateAreas: "'title bar'",
          gridTemplateColumns: "30px 10fr",
          justifyContent: "center",
          alignItems: "center",
          gridGap: "0"
        }}
      >
        <div
          style={{
            color: "#fff",
            gridArea: "title",
            justifySelf: "end",
            writingMode: "sideways-lr",
            textOrientation: "sideways",
            margin: "0",
            padding: "0",
            backgroundColor: "#444",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            height: "80%",
            textAlign: "center"
          }}
        >
          {this.props.gridArea}
        </div>
        <div
          className="time-bar-container"
          style={{
            // boxShadow: "0 0px 16px 0 rgba(0, 0, 0, 1)",
            gridArea: "bar",
            backgroundColor: "#333",
            height: "80%",
            border: "none",
            borderTopRightRadius: "10px",
            borderBottomRightRadius: "10px",
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
      </div>
    );
  }
}
