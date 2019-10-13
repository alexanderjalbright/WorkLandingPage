import React, { Component } from "react";
import HolidaySlide from "./HolidaySlide";

export default class HolidaySlideShow extends Component {
  constructor() {
    super();
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
      },
      {
        name: "Alex Albright's Birthday!",
        month: 7,
        day: 2
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

    this.fixStaticHolidays(holidays);
    this.calcDynamicHolidays(holidays, dynamicHolidays);

    this.earlyReleaseDays(holidays, dynamicHolidays);
    this.daysUntilHolidays(holidays);
    holidays.sort((a, b) => {
      return a.daysUntil - b.daysUntil;
    });

    this.state = {
      holidays: holidays,
      selectedSlide: 0
    };
  }
  render() {
    const arrowStyle = { border: "none", background: "none", color: "#fff" };
    return (
      <div
        style={{
          display: "grid",
          gridTemplateAreas: "'prev holiday next'",
          gridTemplateColumns: "20px 1fr 50px",
          color: "#fff"
        }}
      >
        <button
          style={{ ...arrowStyle, gridArea: "prev", textAlign: "left" }}
          onClick={this.prev}
        >
          {"<"}
        </button>
        {this.state.holidays.map((holiday, index) => (
          <HolidaySlide
            key={`holiday${holiday.name}`}
            holiday={holiday}
            index={index}
            selectedSlide={this.state.selectedSlide}
            total={this.state.holidays.length}
          />
        ))}
        <button
          style={{ ...arrowStyle, gridArea: "next", textAlign: "right" }}
          onClick={this.next}
        >
          {">"}
        </button>
      </div>
    );
  }

  next = () => {
    const nextPosition =
      this.state.selectedSlide < this.state.holidays.length - 1
        ? this.state.selectedSlide + 1
        : 0;
    this.setState({ selectedSlide: nextPosition });
  };

  prev = () => {
    const prevPosition =
      this.state.selectedSlide > 0
        ? this.state.selectedSlide - 1
        : this.state.holidays.length - 1;
    this.setState({ selectedSlide: prevPosition });
  };

  hasHolidayPassed = holiday => {
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
  };

  fixStaticHolidays = holidays => {
    holidays.forEach(holiday => {
      holiday.year = new Date().getFullYear();
      if (this.hasHolidayPassed(holiday)) {
        holiday.year++;
      }
    });
  };

  calcDynamicHolidays = (holidays, dynamicHolidays) => {
    dynamicHolidays.forEach(holiday => {
      const today = new Date();
      const thisYear = today.getFullYear();

      const result = {
        name: holiday.name,
        month: holiday.month,
        year: thisYear
      };
      result.day = this.findDate(holiday, thisYear);

      if (this.hasHolidayPassed(result)) {
        const nextYear = thisYear + 1;
        result.day = this.findDate(holiday, nextYear);
        result.year = nextYear;
      }

      holidays.push(result);
    });
  };

  findDate = (holiday, givenYear) => {
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
  };

  idDaysBefore = (idDay, idYear) => {
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
  };

  determineDate = (holiday, daysBefore, erName, dynamicHolidays, holidays) => {
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
    if (this.hasHolidayPassed(newHoliday)) {
      const yearLater = newHoliday.year + 1;
      const matchingHoliday = dynamicHolidays.find(
        dynamicHoliday => dynamicHoliday.name === holiday.name
      );
      const yearLaterDay = this.findDate(matchingHoliday, yearLater);
      newHolidayDate.setYear(yearLater);
      newHolidayDate.setMonth(holiday.month);
      newHolidayDate.setDate(yearLaterDay);
      daysBefore = this.idDaysBefore(holiday, yearLater);
      newHolidayDate.setDate(newHolidayDate.getDate() - daysBefore);

      newHoliday = {
        name: erName,
        year: newHolidayDate.getFullYear(),
        month: newHolidayDate.getMonth(),
        day: newHolidayDate.getDate()
      };
    }
    holidays.push(newHoliday);
  };

  earlyReleaseDays = (holidays, dynamicHolidays) => {
    holidays.forEach(holiday => {
      let daysBefore = 0;
      let erName = "";

      switch (holiday.name) {
        case "Memorial Day":
        case "Labor Day":
          erName = `Friday before ${holiday.name} (Early Release)`;
          daysBefore = 3;
          this.determineDate(
            holiday,
            daysBefore,
            erName,
            dynamicHolidays,
            holidays
          );
          break;
        case "Thanksgiving Day":
          erName = "Thanksgiving Eve (Early Release)";
          daysBefore = 1;
          this.determineDate(
            holiday,
            daysBefore,
            erName,
            dynamicHolidays,
            holidays
          );
          erName = "Friday after Thanksgiving";
          daysBefore = -1;
          this.determineDate(
            holiday,
            daysBefore,
            erName,
            dynamicHolidays,
            holidays
          );
          break;
        case "Independence Day":
          erName = `Weekday before ${holiday.name} (Early Release)`;
          daysBefore = this.idDaysBefore(holiday, holiday.year);
          this.determineDate(
            holiday,
            daysBefore,
            erName,
            dynamicHolidays,
            holidays
          );
          break;
        default:
      }
    });
    // Friday before Memorial Day (last Monday in May)
    // Wednesday before Independence Day (ID - 1 || - 3)
    // Friday before Labor Day (-3)
    // Wednesday before Thanksgiving (thanksgiving - 1)
  };
  secsToDays = secs => {
    const days = Math.ceil(secs / (60 * 60 * 24 * 1000));
    return days;
  };

  daysUntilDate = givenDate => {
    const today = new Date();
    const todaySec = today.valueOf();
    const untilDateSec = givenDate.valueOf();
    let diff = this.secsToDays(untilDateSec - todaySec);
    return diff;
  };

  daysUntilHolidays = holidays => {
    holidays.forEach(holiday => {
      const { year, month, day } = holiday;
      const holidayDate = new Date();
      holidayDate.setYear(year);
      holidayDate.setMonth(month);
      holidayDate.setDate(day);
      holiday.daysUntil = this.daysUntilDate(holidayDate);
    });
  };

  //   function buildHolidaySlides(holiday, index, length) {
  //     const humanNumber = index + 1;
  //     const numberTextDiv = document.createElement("div");
  //     numberTextDiv.classList.add("numbertext");
  //     numberTextDiv.innerHTML = `${humanNumber} / ${length}`;

  //     const title = document.createElement("h2");
  //     title.innerHTML = holiday.name;

  //     const captionDiv = document.createElement("div");
  //     captionDiv.classList.add("text");
  //     captionDiv.innerHTML = holiday.daysUntil + " days away";

  //     const slideDiv = document.createElement("div");
  //     slideDiv.classList.add("mySlides");
  //     slideDiv.appendChild(numberTextDiv);
  //     slideDiv.appendChild(title);
  //     slideDiv.appendChild(captionDiv);

  //     const slideshow = qs(".slideshow-container");
  //     slideshow.appendChild(slideDiv);
  //     const dotSpan = document.createElement("span");
  //     dotSpan.classList.add("dot");
  //     const dots = qs(".dots");
  //     dots.appendChild(dotSpan);
  //     dotSpan.onclick = () => currentSlide(humanNumber);
  //   }

  //   holidays.forEach((holiday, index) => {
  //     buildHolidaySlides(holiday, index, holidays.length);
  //   });
  // }
}
