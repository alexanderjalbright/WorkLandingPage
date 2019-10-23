import React, { Component } from "react";
import TimeBar from "./TimeBar";
import HolidaySlideShow from "./HolidaySlideShow";

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
          gridTemplateAreas: "'title' 'Day' 'Week' 'holiday'",
          gridTemplateRows: "1fr 2fr 2fr 1fr",
          gridTemplateColumns: "100%",
          padding: "10px 10%"
        }}
      >
        <div className="card-title">Time Monitor</div>

        <TimeBar
          remainingPercent={this.state.dayRemPercent}
          remainingTime={this.state.dayRemTime}
          elapsedPercent={this.state.dayElapPercent}
          elapsedTime={this.state.dayElapTime}
          gridArea="Day"
        />
        <TimeBar
          remainingPercent={this.state.weekRemPercent}
          remainingTime={this.state.weekRemTime}
          elapsedPercent={this.state.weekElapPercent}
          elapsedTime={this.state.weekElapTime}
          gridArea="Week"
        />
        <HolidaySlideShow holidays={this.props.holidays} />
      </div>
    );
  }

  componentDidMount = () => {
    this.runTimeMonitor();
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
    const hours = now.getHours();

    this.dayTimeMonitor(hours, minutes, seconds);
    this.weekTimeMonitor(hours, minutes, seconds, now);
  };

  dayTimeMonitor = (hours, minutes, seconds) => {
    const nowSeconds = this.convertSecs(hours, minutes, seconds);
    const startTimeSeconds = this.splitTime(this.props.startTime);

    const endTimeSeconds = this.splitTime(this.props.endTime);

    let elapsedPercent = 0;
    let elapsedTime = "0:00:00";
    let remainingPercent = 100;
    let remainingTime = this.secondsTohhmmss(endTimeSeconds - startTimeSeconds);
    if (nowSeconds > endTimeSeconds) {
      elapsedPercent = 100;
      remainingPercent = 0;
      remainingTime = "0:00:00";
      elapsedTime = this.secondsTohhmmss(endTimeSeconds - startTimeSeconds);
    } else if (nowSeconds > startTimeSeconds) {
      elapsedPercent = (
        ((nowSeconds - startTimeSeconds) /
          (endTimeSeconds - startTimeSeconds)) *
        100
      ).toFixed(1);
      remainingPercent = (100 - elapsedPercent).toFixed(1);
      remainingTime = this.secondsTohhmmss(endTimeSeconds - nowSeconds);
      elapsedTime = this.secondsTohhmmss(nowSeconds - startTimeSeconds);
    }

    this.setState({
      dayRemTime: remainingTime,
      dayRemPercent: remainingPercent,
      dayElapTime: elapsedTime,
      dayElapPercent: elapsedPercent
    });
  };

  weekTimeMonitor = (hours, minutes, seconds, now) => {
    const nowSeconds = new Date().setHours(hours, minutes, seconds);
    const startHMSarr = this.props.startTime.split(":");
    const endHMSarr = this.props.endTime.split(":");
    const startTimeSeconds = this.getWeekday(now, 1).setHours(
      startHMSarr[0],
      startHMSarr[1],
      startHMSarr[2]
    );
    const endTimeSeconds = this.getWeekday(now, 5).setHours(
      endHMSarr[0],
      endHMSarr[1],
      endHMSarr[2]
    );

    let elapsedPercent = 0;
    let elapsedTime = "0 days";
    let remainingPercent = 100;
    let remainingTime = "5 days";
    if (nowSeconds > endTimeSeconds) {
      elapsedPercent = 100;
      remainingPercent = 0;
      remainingTime = "0 days";
      elapsedTime = "5 days";
    } else if (nowSeconds > startTimeSeconds) {
      elapsedPercent = (
        ((nowSeconds - startTimeSeconds) /
          (endTimeSeconds - startTimeSeconds)) *
        100
      ).toFixed(1);
      remainingPercent = (100 - elapsedPercent).toFixed(1);
      remainingTime = `${((remainingPercent / 100) * 5).toFixed(1)}`;
      elapsedTime = `${((elapsedPercent / 100) * 5).toFixed(1)}`;
    }
    this.setState({
      weekRemTime: remainingTime,
      weekRemPercent: remainingPercent,
      weekElapTime: elapsedTime,
      weekElapPercent: elapsedPercent
    });
  };

  getWeekday = (date, weekdayZeroth) => {
    let day = date.getDay();
    let diff =
      date.getDate() - day + (day === 0 ? weekdayZeroth - 7 : weekdayZeroth); // adjust when day is sunday
    return new Date(date.setDate(diff));
  };
}
