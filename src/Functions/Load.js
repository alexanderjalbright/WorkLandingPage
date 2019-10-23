import { EarlyReleaseDays, DaysUntilDate, Holiday } from "./HolidayFunctions";

export function LoadLinks() {
  let links = JSON.parse(localStorage.getItem("links"));
  if (!links) {
    links = [
      {
        name: "StackOverflow",
        path: "https://stackoverflow.com/questions"
      },
      {
        name: "Documentation",
        dropdown: [
          {
            name: "MDN",
            path: "https://developer.mozilla.org/en-US/docs/Learn"
          },
          {
            name: "MSDN",
            path: "https://developer.microsoft.com/en-us/"
          },
          {
            name: "React.js",
            path: "https://reactjs.org/docs/getting-started.html"
          },
          {
            name: "W3Schools",
            path: "https://www.w3schools.com/"
          },
          {
            name: "W3Schools",
            path: "https://www.w3schools.com/"
          }
        ]
      }
    ];
    localStorage.setItem("links", JSON.stringify(links));
  }

  return links;
}

export function LoadColors() {
  let colors = JSON.parse(localStorage.getItem("colors"));
  if (!colors) {
    colors = {
      navBarColor: "#333333",
      timeMonitorColor: "#3e0070",
      alertsColor: "#aa0000",
      notesColor: "#416400",
      menuColor: "#3e0070"
    };
    localStorage.setItem("colors", JSON.stringify(colors));
  }

  return colors;
}

export function LoadStartTime() {
  let startTime = JSON.parse(localStorage.getItem("startTime"));
  if (!startTime) {
    startTime = "08:30:00";
    localStorage.setItem("startTime", JSON.stringify(startTime));
  }

  return startTime;
}

export function LoadEndTime() {
  let endTime = JSON.parse(localStorage.getItem("endTime"));
  if (!endTime) {
    endTime = "17:00:00";
    localStorage.setItem("endTime", JSON.stringify(endTime));
  }

  return endTime;
}

export function LoadHolidays() {
  const thisYear = new Date().getFullYear();
  const holidays = [
    new Holiday("New Year's Day", new Date(thisYear, 0, 1)),
    new Holiday("Independence Day", new Date(thisYear, 6, 4)),
    new Holiday("Christmas Eve", new Date(thisYear, 11, 24)),
    new Holiday("Christmas Day", new Date(thisYear, 11, 25)),
    new Holiday("New Year's Eve", new Date(thisYear, 11, 31)),
    new Holiday("Memorial Day", new Date(thisYear, 4, 1), 4, 1),
    new Holiday("Labor Day", new Date(thisYear, 8, 1), 1, 1),
    new Holiday("Thanksgiving Day", new Date(thisYear, 10, 1), 4, 4)
  ];

  const todaysAlerts = [];
  let userHolidays = JSON.parse(localStorage.getItem("userHolidays"));
  if (!userHolidays) {
    userHolidays = [];
  }
  const newUserHolidays = userHolidays.map(userHoliday => {
    const pieces = userHoliday.textDate.split("-");
    const year = pieces[0];
    let month = 12;
    if (pieces[1] > 1) month = pieces[1] - 1;
    const day = pieces[2];

    const newHoliday = new Holiday(
      userHoliday.name,
      new Date(year, month, day)
    );
    return newHoliday;
  });

  let tempHolidays = [...holidays, ...newUserHolidays];
  tempHolidays.forEach(holiday => {
    holiday.findNext();
    const newHoliday = EarlyReleaseDays(holiday);
    if (newHoliday.name !== "") {
      tempHolidays.push(newHoliday);
    }
  });

  const fridayAfterTG = {
    ...tempHolidays.find(holiday => holiday.name === "Thanksgiving Day")
  };
  fridayAfterTG.name = "Friday After Thanksgiving";
  fridayAfterTG.date = new Date(fridayAfterTG.date.getTime());
  fridayAfterTG.date.setDate(fridayAfterTG.date.getDate() + 1);
  tempHolidays.push(fridayAfterTG);

  tempHolidays.forEach(holiday => {
    holiday.daysUntil = DaysUntilDate(holiday.date);
    holiday.daysUntil === 0
      ? todaysAlerts.push(holiday.name)
      : holiday.daysUntil < 7 &&
        todaysAlerts.push(`${holiday.daysUntil} day(s) until ${holiday.name}`);
  });
  const sortedHolidays = tempHolidays.sort((a, b) => {
    return a.daysUntil - b.daysUntil;
  });
  return { holidays: sortedHolidays, alerts: todaysAlerts };
}
