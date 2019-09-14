import React, { Component } from "react";
import "./Menu.css";
import MenuNav from "./MenuNav";
import MenuTimeMonitor from "./MenuTimeMonitor";
import MenuOption from "./MenuOption";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      isMenuNavVisible: false,
      isMenuTimeMonitorVisible: false
    };
  }

  render() {
    const {
      links,
      deleteLink,
      editLink,
      toggleEditable,
      addLink,
      visible
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
        startTime={this.props.startTime}
        endTime={this.props.endTime}
        setTimeMonitor={this.props.setTimeMonitor}
      />
    );
    return (
      <div className="Menu" style={{ width: visible ? "400px" : "0px" }}>
        <div className="menu-content">
          <MenuOption
            name="Nav"
            visibilityVar="isMenuNavVisible"
            option={menuNav}
            visible={this.state.isMenuNavVisible}
            showOptionToggle={this.showOptionToggle}
          />
          <MenuOption
            name="Time Monitor"
            visibilityVar="isMenuTimeMonitorVisible"
            option={menuTimeMonitor}
            visible={this.state.isMenuTimeMonitorVisible}
            showOptionToggle={this.showOptionToggle}
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
