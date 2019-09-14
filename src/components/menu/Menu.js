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
      isMenuThemeVisible: false
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
      menuColor
    } = this.props;

    const menuNav = (
      <MenuNav
        visible={this.state.isMenuNavVisible}
        links={links}
        deleteLink={deleteLink}
        editLink={editLink}
        toggleEditable={toggleEditable}
        addLink={addLink}
      />
    );

    const menuTimeMonitor = (
      <MenuTimeMonitor
        visible={this.state.isMenuTimeMonitorVisible}
        startTime={startTime}
        endTime={endTime}
        setAppState={this.props.setAppState}
      />
    );

    const menuThemeOption = (
      <MenuTheme
        setAppState={setAppState}
        navBarColor={navBarColor}
        timeMonitorColor={timeMonitorColor}
        alertsColor={alertsColor}
        notesColor={notesColor}
        menuColor={menuColor}
      />
    );
    return (
      <div
        className="Menu"
        style={{ width: visible ? "400px" : "0px", backgroundColor: menuColor }}
      >
        <div className="menu-content">
          <MenuOption
            name="Nav"
            option={menuNav}
            visibilityVar="isMenuNavVisible"
            visible={this.state.isMenuNavVisible}
            showOptionToggle={this.showOptionToggle}
            openHeight="30vh"
            overflowY="scroll"
          />
          <MenuOption
            name="Time Monitor"
            option={menuTimeMonitor}
            visibilityVar="isMenuTimeMonitorVisible"
            visible={this.state.isMenuTimeMonitorVisible}
            showOptionToggle={this.showOptionToggle}
            openHeight="8vh"
            overflowY="hidden"
          />
          <MenuOption
            name="Theme"
            option={menuThemeOption}
            visibilityVar="isMenuThemeVisible"
            visible={this.state.isMenuThemeVisible}
            showOptionToggle={this.showOptionToggle}
            openHeight="30vh"
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
}
