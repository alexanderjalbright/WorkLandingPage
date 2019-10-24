import React from "react";

export default function MenuTheme(props) {
  const handleChange = async e => {
    await this.props.setAppState(e);
    this.props.saveColors();
  };

  const colorInput = (lblName, varName) => {
    return (
      <div className="menu-input-v-align-inner">
        <label className="menu-input-v-align-label">{lblName}:</label>
        <input
          name={varName}
          className="menuInput"
          type="color"
          value={props[varName]}
          onChange={handleChange}
        />
      </div>
    );
  };

  return (
    <div>
      <div className="menu-input-v-align-outter">
        {colorInput("Nav Bar", "navBarColor")}
        {colorInput("Time Monitor", "timeMonitorColor")}
        {colorInput("Alerts", "alertsColor")}
        {colorInput("Notes", "notesColor")}
        {colorInput("Menu", "menuColor")}
      </div>
    </div>
  );
}
