import React, { Component } from "react";
import "./App.css";

import Nav from "../nav/Nav";
import Menu from "../menu/Menu";
import Alerts from "../alerts/Alerts";
import TimeMonitor from "../timemonitor/TimeMonitor";
import Notes from "../notes/Notes";

import {
  LoadLinks,
  LoadColors,
  LoadStartTime,
  LoadEndTime,
  LoadHolidays
} from "../../functions/Load";

import { ConvertUserHolidayToHoliday } from "../../functions/HolidayFunctions";

export default class App extends Component {
  constructor() {
    super();
    const colors = LoadColors();
    const HolidaysAndAlerts = LoadHolidays();
    this.state = {
      links: LoadLinks(),
      isMenuVisible: false,
      startTime: LoadStartTime(),
      endTime: LoadEndTime(),
      navBarColor: colors.navBarColor,
      timeMonitorColor: colors.timeMonitorColor,
      alertsColor: colors.alertsColor,
      notesColor: colors.notesColor,
      menuColor: colors.menuColor,
      holidays: HolidaysAndAlerts.holidays,
      alerts: HolidaysAndAlerts.alerts
    };
  }

  render() {
    return (
      <div className="App">
        <div className="main">
          <Nav
            links={this.state.links}
            toggleMenu={this.toggleMenu}
            navBarColor={this.state.navBarColor}
          />
          <Alerts
            setAppState={this.setAppState}
            alertsColor={this.state.alertsColor}
            alerts={this.state.alerts}
          />
          <TimeMonitor
            startTime={this.state.startTime}
            endTime={this.state.endTime}
            setAppState={this.setAppState}
            timeMonitorColor={this.state.timeMonitorColor}
            holidays={this.state.holidays}
          />
          <Notes notesColor={this.state.notesColor} />
        </div>
        <Menu
          visible={this.state.isMenuVisible}
          links={this.state.links}
          deleteLink={this.deleteLink}
          editLink={this.editLink}
          toggleEditable={this.toggleEditable}
          addLink={this.addLink}
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          setAppState={this.setAppState}
          navBarColor={this.state.navBarColor}
          timeMonitorColor={this.state.timeMonitorColor}
          alertsColor={this.state.alertsColor}
          notesColor={this.state.notesColor}
          menuColor={this.state.menuColor}
          saveColors={this.saveColors}
          addHoliday={this.addHoliday}
        />
      </div>
    );
  }

  saveLinks = newLinks => {
    newLinks
      .sort((a, b) => a.name > b.name)
      .forEach(link => {
        link.dropdown === undefined ||
          link.dropdown.sort((a, b) => a.name > b.name);
      });

    localStorage.setItem("links", JSON.stringify(newLinks));
    this.setState({ links: newLinks });
  };

  saveColors = () => {
    const newColors = {
      navBarColor: this.state.navBarColor,
      timeMonitorColor: this.state.timeMonitorColor,
      alertsColor: this.state.alertsColor,
      notesColor: this.state.notesColor,
      menuColor: this.state.menuColor
    };
    localStorage.setItem("colors", JSON.stringify(newColors));
  };

  deleteLink = (index, dIndex) => {
    const modLinks = [...this.state.links];
    dIndex === undefined
      ? modLinks.splice(index, 1)
      : modLinks[index].dropdown.splice(dIndex, 1);
    this.saveLinks(modLinks);
  };

  editLink = (index, dIndex, newLink) => {
    const modLinks = [...this.state.links];
    dIndex === undefined
      ? (modLinks[index] = newLink)
      : (modLinks[index].dropdown[dIndex] = newLink);
    this.saveLinks(modLinks);
  };

  addLink = (newLink, index) => {
    const modLinks = [...this.state.links];
    index === undefined
      ? modLinks.push(newLink)
      : modLinks[index].dropdown.push(newLink);
    this.saveLinks(modLinks);
  };

  addHoliday = newUserHoliday => {
    console.log(newUserHoliday);
    const newHoliday = ConvertUserHolidayToHoliday(newUserHoliday);
    newHoliday.findNext();
    newHoliday.findDaysUntil();
    const newHolidays = [...this.state.holidays, newHoliday];
    newHolidays.sort((a, b) => {
      return a.daysUntil - b.daysUntil;
    });
    this.setState({ holidays: newHolidays });
    const userHolidays = JSON.parse(localStorage.getItem("userHolidays"));
    userHolidays.push(newUserHoliday);
    localStorage.setItem("userHolidays", JSON.stringify(userHolidays));
  };

  toggleMenu = () => {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  };

  setAppState = e => {
    this.setState({ [e.target.name]: e.target.value });

    const saveables = ["startTime", "endTime"];
    if (saveables.includes(e.target.name)) {
      console.log(e.target.name);
      localStorage.setItem(e.target.name, JSON.stringify(e.target.value));
    }
  };
}
