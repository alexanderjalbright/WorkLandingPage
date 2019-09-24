import React, { Component } from "react";
import TimeBar from "./TimeBar";

export default class TimeMonitor extends Component {
  constructor() {
    super();
    this.state = {
      dayRemTime: "",
      dayRemPercent: "",
      dayElaptime: "",
      dayElapPercent: "",
      weekRemTime: "",
      weekRemPercent: "",
      weekElapTime: "",
      weekElapPercent: ""
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
          gridTemplateAreas: "'title title title' '. workday .' '. workweek .'",
          gridTemplateRows: "1fr 2fr 2fr",
          gridTemplateColumns: "10% 80% 10%"
        }}
      >
        <div className="card-title">Time Monitor</div>

        <TimeBar
          remainingPercent={this.state.dayRemPercent}
          remainingTime={this.state.dayRemTime}
          elapsedPercent={this.state.dayElapPercent}
          elapsedTime={this.state.dayElapTime}
          gridArea="workday"
        />
        <TimeBar
          remainingPercent={this.state.weekRemPercent}
          remainingTime={this.state.weekRemTime}
          elapsedPercent={this.state.weekElapPercent}
          elapsedTime={this.state.weekElapTime}
          gridArea="workweek"
        />
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
      dayRemTime: remainingTime,
      dayRemPercent: remainingPercent,
      dayElapTime: elapsedTime,
      dayElapPercent: elapsedPercent
    });
    this.weekTimeMonitor();
  };

  weekTimeMonitor = () => {
    const start = new Date(this.props.startTime);
    const end = new Date(this.props.endTime);
    let startSecs = start.valueOf() / 1000;
    let endSecs = end.valueOf() / 1000;
    const dayToday = start.getDay();
    if (dayToday !== 0) {
      startSecs -= dayToday * 86400;
    }
    const nowSecs = Math.floor(Date.now().valueOf() / 1000);
    const nowPercent =
      Math.round(((nowSecs - startSecs) * 1000) / (endSecs - startSecs)) / 10;
    this.setState({
      weekRemPercent: 100 - nowPercent,
      weekElapPercent: nowPercent
    });
    console.log(start);
  };
}
