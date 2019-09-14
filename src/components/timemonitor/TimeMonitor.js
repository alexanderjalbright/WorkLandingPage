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
      <div className="time-monitor">
        <div className="card-title">Time Monitor</div>
        <div className="time-bar-container">
          <div
            style={{ width: `${this.state.elapsedPercent}%` }}
            className="time-bar"
          ></div>
          <div className="time-info">
            <div>{`Elapsed: ${this.state.elapsedTime}(${this.state.elapsedPercent}%)`}</div>
            <div>{`Remaining: ${this.state.remainingTime}(${this.state.remainingPercent}%)`}</div>
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
