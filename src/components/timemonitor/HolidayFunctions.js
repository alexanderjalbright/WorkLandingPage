export default function SetupHolidays() {
  const holidays = [
    {
      name: "New Year's Day",
      month: 0,
      day: 1
    },
    {
      name: "Independence Day",
      month: 6,
      day: 4
    },
    {
      name: "Christmas Eve",
      month: 11,
      day: 24
    },
    {
      name: "Christmas Day",
      month: 11,
      day: 25
    },
    {
      name: "New Year's Eve",
      month: 11,
      day: 31
    }
  ];

  const dynamicHolidays = [
    {
      name: "Memorial Day",
      occurrence: 4,
      dayOfWeek: 1,
      month: 4,
      day: 1
    },
    {
      name: "Labor Day",
      occurrence: 1,
      dayOfWeek: 1,
      month: 8,
      day: 1
    },
    {
      name: "Thanksgiving Day",
      occurrence: 4,
      dayOfWeek: 4,
      month: 10,
      day: 1
    }
  ];

  findYearForStaticHolidays(holidays);
  createDynamicHolidays(holidays, dynamicHolidays);
  earlyReleaseDays(holidays, dynamicHolidays);
  daysUntilHolidays(holidays);

  holidays.sort((a, b) => {
    return a.daysUntil - b.daysUntil;
  });

  return holidays;
}

function hasHolidayPassed(holiday) {
  const today = new Date();
  const thisMonth = today.getMonth();
  const thisDay = today.getDate();
  const thisYear = today.getFullYear();
  let bool = false;
  if (holiday.year <= thisYear) {
    if (
      holiday.month < thisMonth ||
      (holiday.month === thisMonth && holiday.day < thisDay)
    ) {
      bool = true;
    }
  }

  return bool;
}

function findYearForStaticHolidays(holidays) {
  holidays.forEach(holiday => {
    holiday.year = new Date().getFullYear();
    if (hasHolidayPassed(holiday)) {
      holiday.year++;
    }
  });
}

function createDynamicHolidays(holidays, dynamicHolidays) {
  dynamicHolidays.forEach(holiday => {
    const today = new Date();
    const thisYear = today.getFullYear();

    const result = {
      name: holiday.name,
      month: holiday.month,
      year: thisYear
    };
    result.day = findDateForDynamicHoliday(holiday, thisYear);

    if (hasHolidayPassed(result)) {
      const nextYear = thisYear + 1;
      result.day = findDateForDynamicHoliday(holiday, nextYear);
      result.year = nextYear;
    }

    holidays.push(result);
  });
}

function findDateForDynamicHoliday(holiday, givenYear) {
  let actualDay = 1;

  actualDay += 7 * (holiday.occurrence - 1);

  const firstOfMonth = new Date();
  firstOfMonth.setYear(givenYear);
  firstOfMonth.setMonth(holiday.month);
  firstOfMonth.setDate(1);
  if (firstOfMonth.getDay() <= holiday.dayOfWeek) {
    actualDay += holiday.dayOfWeek - firstOfMonth.getDay();
  } else {
    actualDay += holiday.dayOfWeek - firstOfMonth.getDay() + 7;
  }

  return actualDay;
}

function FindIndDayEarlyRelDay(idDay, idYear) {
  let idDaysBefore = 1;
  const idDate = new Date();
  idDate.setYear(idYear);
  idDate.setMonth(idDay.month);
  idDate.setDate(idDay.day);
  const idDayOfWeek = idDate.getDay();
  switch (idDayOfWeek) {
    case 0:
      idDaysBefore = 2;
      break;
    case 1:
      idDaysBefore = 3;
      break;
    default:
  }
  return idDaysBefore;
}

function determineDate(holiday, daysBefore, erName, dynamicHolidays, holidays) {
  const newHolidayDate = new Date();
  newHolidayDate.setYear(holiday.year);
  newHolidayDate.setMonth(holiday.month);
  newHolidayDate.setDate(holiday.day);
  newHolidayDate.setDate(newHolidayDate.getDate() - daysBefore);

  let newHoliday = {
    name: erName,
    year: newHolidayDate.getFullYear(),
    month: newHolidayDate.getMonth(),
    day: newHolidayDate.getDate()
  };
  if (hasHolidayPassed(newHoliday)) {
    const yearLater = newHoliday.year + 1;
    const matchingHoliday = dynamicHolidays.find(
      dynamicHoliday => dynamicHoliday.name === holiday.name
    );
    const yearLaterDay = findDateForDynamicHoliday(matchingHoliday, yearLater);
    newHolidayDate.setYear(yearLater);
    newHolidayDate.setMonth(holiday.month);
    newHolidayDate.setDate(yearLaterDay);
    daysBefore = FindIndDayEarlyRelDay(holiday, yearLater);
    newHolidayDate.setDate(newHolidayDate.getDate() - daysBefore);

    newHoliday = {
      name: erName,
      year: newHolidayDate.getFullYear(),
      month: newHolidayDate.getMonth(),
      day: newHolidayDate.getDate()
    };
  }
  holidays.push(newHoliday);
}

function earlyReleaseDays(holidays, dynamicHolidays) {
  holidays.forEach(holiday => {
    let daysBefore = 0;
    let erName = "";

    switch (holiday.name) {
      case "Memorial Day":
      case "Labor Day":
        erName = `Friday before ${holiday.name} (Early Release)`;
        daysBefore = 3;
        determineDate(holiday, daysBefore, erName, dynamicHolidays, holidays);
        break;
      case "Thanksgiving Day":
        erName = "Thanksgiving Eve (Early Release)";
        daysBefore = 1;
        determineDate(holiday, daysBefore, erName, dynamicHolidays, holidays);
        erName = "Friday after Thanksgiving";
        daysBefore = -1;
        determineDate(holiday, daysBefore, erName, dynamicHolidays, holidays);
        break;
      case "Independence Day":
        erName = `Weekday before ${holiday.name} (Early Release)`;
        daysBefore = FindIndDayEarlyRelDay(holiday, holiday.year);
        determineDate(holiday, daysBefore, erName, dynamicHolidays, holidays);
        break;
      default:
    }
  });
  // Friday before Memorial Day (last Monday in May)
  // Wednesday before Independence Day (ID - 1 || - 3)
  // Friday before Labor Day (-3)
  // Wednesday before Thanksgiving (thanksgiving - 1)
}
function secsToDays(secs) {
  const days = Math.ceil(secs / (60 * 60 * 24 * 1000));
  return days;
}

function daysUntilDate(givenDate) {
  const today = new Date();
  const todaySec = today.valueOf();
  const untilDateSec = givenDate.valueOf();
  let diff = secsToDays(untilDateSec - todaySec);
  return diff;
}

function daysUntilHolidays(holidays) {
  holidays.forEach(holiday => {
    const { year, month, day } = holiday;
    const holidayDate = new Date();
    holidayDate.setYear(year);
    holidayDate.setMonth(month);
    holidayDate.setDate(day);
    holiday.daysUntil = daysUntilDate(holidayDate);
  });
}
