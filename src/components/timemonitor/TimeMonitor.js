import React, { useState, useEffect } from "react";
import TimeBar from "./TimeBar";
import HolidaySlideShow from "./HolidaySlideShow";
import { DayTimeMonitor, WeekTimeMonitor } from "../../functions/TimeFunctions";

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

  useEffect(() => {
    if (!isInit) {
      runTimeMonitor();
      setInterval(runTimeMonitor, 1000);
      setIsInit(true);
    }
  }, [isInit]);

  const runTimeMonitor = () => {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    setDayTracker(DayTimeMonitor(hours, minutes, seconds, startTime, endTime));
    setWeekTracker(
      WeekTimeMonitor(hours, minutes, seconds, now, startTime, endTime)
    );
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
