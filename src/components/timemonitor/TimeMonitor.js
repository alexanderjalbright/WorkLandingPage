import React, { Component } from "react";

export default class TimeMonitor extends Component {
  constructor() {
    super();
    this.state = {
      remainingTime: "",
      remainingPercent: "",
      elapsedtime: "",
      elapsedPercent: ""
    };
  }
  render() {
    return (
      <div
        className="time-monitor"
        style={{
          backgroundColor: this.props.timeMonitorColor,
          gridArea: "time",
          display: "grid",
          gridTemplateAreas: "'title title title' '. bar .'",
          gridTemplateRows: "20% 80%",
          gridTemplateColumns: "10% 80% 10%"
        }}
      >
        <div className="card-title">Time Monitor</div>
        <div
          style={{
            boxShadow: "0px 2px 16px 0px rgba(0, 0, 0, 1)",
            gridArea: "bar",
            backgroundColor: "#333",
            height: "80%",
            border: "none",
            borderRadius: "20px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${this.state.elapsedPercent}%`,
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
              top: "-60%",
              left: "0"
            }}
          >
            <div>{`Elapsed: ${this.state.elapsedTime} (${this.state.elapsedPercent}%)`}</div>
            <div>{`Remaining: ${this.state.remainingTime} (${this.state.remainingPercent}%)`}</div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    setInterval(this.runTimeMonitor, 1000);
  };

  convertSecs = (hr, min, sec) => {
    const seconds = (hr * 60 + min * 1) * 60 + sec * 1;
    return seconds;
  };

  secondsTohhmmss = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    let seconds = totalSeconds - hours * 3600 - minutes * 60;
    seconds = Math.round(seconds * 100) / 100;

    let result = hours;
    result += ":" + (minutes < 10 ? "0" + minutes : minutes);
    result += ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
  };

  splitTime = time => {
    const times = time.split(":");
    const result = this.convertSecs(times[0], times[1], times[2]);
    return result;
  };

  runTimeMonitor = () => {
    const now = new Date();

    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hour = now.getHours();
    const totalSeconds = this.convertSecs(hour, minutes, seconds);

    const startTimeSeconds = this.splitTime(this.props.startTime);

    const endTimeSeconds = this.splitTime(this.props.endTime);

    const elapsedPercent = (
      ((totalSeconds - startTimeSeconds) /
        (endTimeSeconds - startTimeSeconds)) *
      100
    ).toFixed(1);

    const remainingPercent = (100 - elapsedPercent).toFixed(1);

    const remainingTime = this.secondsTohhmmss(endTimeSeconds - totalSeconds);
    const elapsedTime = this.secondsTohhmmss(totalSeconds - startTimeSeconds);

    this.setState({
      remainingTime: remainingTime,
      remainingPercent: remainingPercent,
      elapsedTime: elapsedTime,
      elapsedPercent: elapsedPercent
    });
  };
}
