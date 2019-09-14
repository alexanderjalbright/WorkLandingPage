import React, { Component } from "react";

export default class MenuTheme extends Component {
  constructor() {
    super();
    this.state = {
      navbarcolor: "#111111"
    };
  }

  render() {
    return (
      <div>
        <h3>Colors:</h3>
        <div className="menu-input-v-align-outter">
          {this.colorInput("Nav Bar", "navBarColor")}
          {this.colorInput("Time Monitor", "timeMonitorColor")}
          {this.colorInput("Alerts", "alertsColor")}
          {this.colorInput("Notes", "notesColor")}
          {this.colorInput("Menu", "menuColor")}
        </div>
      </div>
    );
  }

  colorInput = (lblName, varName) => {
    return (
      <div className="menu-input-v-align-inner">
        <label className="menu-input-v-align-label">{lblName}:</label>
        <input
          name={varName}
          className="menuInput"
          type="color"
          value={this.props[varName]}
          onChange={this.props.setAppState}
        />
      </div>
    );
  };
}
