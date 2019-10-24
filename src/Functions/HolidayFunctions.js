export function EarlyReleaseDays(holiday) {
  let daysBefore = 0;
  let erName = "";

  switch (holiday.name) {
    case "Memorial Day":
    case "Labor Day":
      erName = `Friday before ${holiday.name} (Early Release)`;
      daysBefore = 3;
      break;
    case "Thanksgiving Day":
      erName = "Thanksgiving Eve (Early Release)";
      daysBefore = 1;
      break;
    case "Independence Day":
      erName = `Weekday before ${holiday.name} (Early Release)`;
      const idDayOfWeek = holiday.date.getDay();
      switch (idDayOfWeek) {
        case 0:
          daysBefore = 2;
          break;
        case 1:
          daysBefore = 3;
          break;
        default:
          daysBefore = 1;
      }
      break;
    default:
  }
  const year = holiday.date.getFullYear();
  const month = holiday.date.getMonth();
  const day = holiday.date.getDate();

  const newHolidayDate = new Date(year, month, day);
  newHolidayDate.setDate(newHolidayDate.getDate() - daysBefore);

  const newHoliday = new Holiday(erName, newHolidayDate);
  if (newHoliday.inPast()) {
    const yearLater = newHolidayDate.getFullYear() + 1;
    newHolidayDate.setDate(newHolidayDate.getDate() + daysBefore);
    newHolidayDate.findCorrectDate(yearLater);
    newHolidayDate.setDate(newHolidayDate.getDate() - daysBefore);
  }

  return newHoliday;
}

function SecsToDays(secs) {
  const days = Math.ceil(secs / (60 * 60 * 24 * 1000));
  return days;
}

export function DaysUntilDate(givenDate) {
  const todaySec = Date.now().valueOf();
  const untilDateSec = givenDate.valueOf();
  let diff = SecsToDays(untilDateSec - todaySec);
  return diff;
}

export class Holiday {
  constructor(name, date, occurrence, dayOfWeek) {
    this.name = name;
    this.date = date;
    this.occurrence = occurrence;
    this.dayOfWeek = dayOfWeek;
  }
  inPast() {
    return this.date < new Date().setHours(0, 0, 0, 0);
  }
  findCorrectDate(year) {
    const { occurrence, dayOfWeek } = this;
    const month = this.date.getMonth();
    const first = new Date(year, month, 1);
    const days = [];
    let loop = 0;
    while (first.getDay() !== dayOfWeek && loop < 7) {
      first.setDate(first.getDate() + 1);
      loop++;
    }

    while (first.getMonth() === month) {
      days.push(new Date(first.getTime()));
      first.setDate(first.getDate() + 7);
    }
    const result = days[occurrence - 1];
    this.date.setTime(result.getTime());
  }
  findNext() {
    while (this.inPast()) {
      this.occurrence === undefined
        ? this.date.setYear(this.date.getFullYear() + 1)
        : this.findCorrectDate(this.date.getFullYear() + 1);
    }
    if (this.occurrence !== undefined) {
      this.findCorrectDate(this.date.getFullYear());
    }
  }
}
