import React, { useState, useEffect } from "react";
import TimeBar from "./TimeBar";
import HolidaySlideShow from "./HolidaySlideShow";

export default function TimeMonitor(props) {
  const { startTime, endTime, timeMonitorColor } = props;
  const [dayTracker, setDayTracker] = useState({
    dayRemTime: "",
    dayRemPercent: "",
    dayElaptime: "",
    dayElapPercent: ""
  });
  const [weekTracker, setWeekTracker] = useState({
    weekRemTime: "",
    weekRemPercent: "",
    weekElapTime: "",
    weekElapPercent: ""
  });

  const [isInit, setIsInit] = useState(false);

  useEffect(isInit => {
    if (!isInit) {
      runTimeMonitor();
      setInterval(runTimeMonitor, 1000);
      setIsInit(true);
    }
  }, []);

  const convertSecs = (hr, min, sec) => {
    const seconds = (hr * 60 + min * 1) * 60 + sec * 1;
    return seconds;
  };

  const secondsTohhmmss = totalSeconds => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    let seconds = totalSeconds - hours * 3600 - minutes * 60;
    seconds = Math.round(seconds * 100) / 100;

    let result = hours;
    result += ":" + (minutes < 10 ? "0" + minutes : minutes);
    result += ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
  };

  const splitTime = time => {
    const times = time.split(":");
    const result = convertSecs(times[0], times[1], times[2]);
    return result;
  };

  const runTimeMonitor = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    dayTimeMonitor(hours, minutes, seconds);
    weekTimeMonitor(hours, minutes, seconds, now);
  };

  const dayTimeMonitor = (hours, minutes, seconds) => {
    const nowSeconds = convertSecs(hours, minutes, seconds);
    const startTimeSeconds = splitTime(startTime);

    const endTimeSeconds = splitTime(endTime);

    let elapsedPercent = 0;
    let elapsedTime = "0:00:00";
    let remainingPercent = 100;
    let remainingTime = secondsTohhmmss(endTimeSeconds - startTimeSeconds);
    if (nowSeconds > endTimeSeconds) {
      elapsedPercent = 100;
      remainingPercent = 0;
      remainingTime = "0:00:00";
      elapsedTime = secondsTohhmmss(endTimeSeconds - startTimeSeconds);
    } else if (nowSeconds > startTimeSeconds) {
      elapsedPercent = (
        ((nowSeconds - startTimeSeconds) /
          (endTimeSeconds - startTimeSeconds)) *
        100
      ).toFixed(1);
      remainingPercent = (100 - elapsedPercent).toFixed(1);
      remainingTime = secondsTohhmmss(endTimeSeconds - nowSeconds);
      elapsedTime = secondsTohhmmss(nowSeconds - startTimeSeconds);
    }

    setDayTracker({
      dayRemTime: remainingTime,
      dayRemPercent: remainingPercent,
      dayElapTime: elapsedTime,
      dayElapPercent: elapsedPercent
    });
  };

  const weekTimeMonitor = (hours, minutes, seconds, now) => {
    const nowSeconds = new Date().setHours(hours, minutes, seconds);
    const startHMSarr = startTime.split(":");
    const endHMSarr = endTime.split(":");
    const startTimeSeconds = getWeekday(now, 1).setHours(
      startHMSarr[0],
      startHMSarr[1],
      startHMSarr[2]
    );
    const endTimeSeconds = getWeekday(now, 5).setHours(
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
    setWeekTracker({
      weekRemTime: remainingTime,
      weekRemPercent: remainingPercent,
      weekElapTime: elapsedTime,
      weekElapPercent: elapsedPercent
    });
  };

  const getWeekday = (date, weekdayZeroth) => {
    let day = date.getDay();
    let diff =
      date.getDate() - day + (day === 0 ? weekdayZeroth - 7 : weekdayZeroth); // adjust when day is sunday
    return new Date(date.setDate(diff));
  };

  return (
    <div
      className="time-monitor"
      style={{
        backgroundColor: timeMonitorColor,
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
        remainingPercent={dayTracker.dayRemPercent}
        remainingTime={dayTracker.dayRemTime}
        elapsedPercent={dayTracker.dayElapPercent}
        elapsedTime={dayTracker.dayElapTime}
        gridArea="Day"
      />
      <TimeBar
        remainingPercent={weekTracker.weekRemPercent}
        remainingTime={weekTracker.weekRemTime}
        elapsedPercent={weekTracker.weekElapPercent}
        elapsedTime={weekTracker.weekElapTime}
        gridArea="Week"
      />
      <HolidaySlideShow
        holidays={props.holidays}
        removeHoliday={props.removeHoliday}
      />
    </div>
  );
}
