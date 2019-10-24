import React, { Component } from "react";
import "./Menu.css";
import MenuNav from "./MenuNav";
import MenuTimeMonitor from "./MenuTimeMonitor";
import MenuTheme from "./MenuTheme";
import MenuOption from "./MenuOption";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      isMenuNavVisible: false,
      isMenuTimeMonitorVisible: false,
      isMenuThemeVisible: false,
      newHolidayName: "",
      newHolidayDate: ""
    };
  }

  render() {
    const {
      links,
      deleteLink,
      editLink,
      toggleEditable,
      addLink,
      visible,
      startTime,
      endTime,
      setAppState,
      navBarColor,
      timeMonitorColor,
      alertsColor,
      notesColor,
      menuColor,
      saveColors
    } = this.props;

    const navOption = (
      <MenuNav
        visible={this.state.isMenuNavVisible}
        links={links}
        deleteLink={deleteLink}
        editLink={editLink}
        toggleEditable={toggleEditable}
        addLink={addLink}
      />
    );

    const timeMonitorOption = (
      <MenuTimeMonitor
        visible={this.state.isMenuTimeMonitorVisible}
        startTime={startTime}
        endTime={endTime}
        setAppState={setAppState}
        newHolidayName={this.state.newHolidayName}
        newHolidayDate={this.state.newHolidayDate}
        onChange={this.onChange}
        addHolidayHandler={this.addHolidayHandler}
      />
    );

    const themeOption = (
      <MenuTheme
        setAppState={setAppState}
        navBarColor={navBarColor}
        timeMonitorColor={timeMonitorColor}
        alertsColor={alertsColor}
        notesColor={notesColor}
        menuColor={menuColor}
        saveColors={saveColors}
      />
    );
    return (
      <div
        style={{
          width: visible ? "400px" : "0px",
          backgroundColor: menuColor,
          overflowX: "hidden",
          transition: "0.5s ease"
        }}
      >
        <div
          style={{
            height: "100vh",
            color: "#fff",
            width: "400px",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <MenuOption
            name="Nav"
            option={navOption}
            visibilityVar="isMenuNavVisible"
            visible={this.state.isMenuNavVisible}
            showOptionToggle={this.showOptionToggle}
            openHeight="200px"
            overflowY="scroll"
          />
          <MenuOption
            name="Time Monitor"
            option={timeMonitorOption}
            visibilityVar="isMenuTimeMonitorVisible"
            visible={this.state.isMenuTimeMonitorVisible}
            showOptionToggle={this.showOptionToggle}
            openHeight="150px"
            overflowY="hidden"
          />
          <MenuOption
            name="Theme"
            option={themeOption}
            visibilityVar="isMenuThemeVisible"
            visible={this.state.isMenuThemeVisible}
            showOptionToggle={this.showOptionToggle}
            openHeight="200px"
            overflowY="scroll"
          />
        </div>
      </div>
    );
  }
  showOptionToggle = e => {
    this.setState({
      [e.currentTarget.name]: !this.state[e.currentTarget.name]
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addHolidayHandler = () => {
    this.props.addHoliday({
      name: this.state.newHolidayName,
      textDate: this.state.newHolidayDate
    });
  };
}
