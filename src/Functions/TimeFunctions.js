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

export const DayTimeMonitor = (hours, minutes, seconds, startTime, endTime) => {
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
      ((nowSeconds - startTimeSeconds) / (endTimeSeconds - startTimeSeconds)) *
      100
    ).toFixed(1);
    remainingPercent = (100 - elapsedPercent).toFixed(1);
    remainingTime = secondsTohhmmss(endTimeSeconds - nowSeconds);
    elapsedTime = secondsTohhmmss(nowSeconds - startTimeSeconds);
  }

  return {
    dayRemTime: remainingTime,
    dayRemPercent: remainingPercent,
    dayElapTime: elapsedTime,
    dayElapPercent: elapsedPercent
  };
};

export const WeekTimeMonitor = (
  hours,
  minutes,
  seconds,
  now,
  startTime,
  endTime
) => {
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
      ((nowSeconds - startTimeSeconds) / (endTimeSeconds - startTimeSeconds)) *
      100
    ).toFixed(1);
    remainingPercent = (100 - elapsedPercent).toFixed(1);
    remainingTime = `${((remainingPercent / 100) * 5).toFixed(1)}`;
    elapsedTime = `${((elapsedPercent / 100) * 5).toFixed(1)}`;
  }
  return {
    weekRemTime: remainingTime,
    weekRemPercent: remainingPercent,
    weekElapTime: elapsedTime,
    weekElapPercent: elapsedPercent
  };
};

const getWeekday = (date, weekdayZeroth) => {
  let day = date.getDay();
  let diff =
    date.getDate() - day + (day === 0 ? weekdayZeroth - 7 : weekdayZeroth); // adjust when day is sunday
  return new Date(date.setDate(diff));
};
