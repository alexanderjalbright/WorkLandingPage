import React, { Component } from "react";

export default class MenuTimeMonitor extends Component {
  render() {
    return (
      <div className="menu-input-v-align-outter">
        <div className="menu-input-v-align-inner">
          <label className="menu-input-v-align-label">Start&nbsp;Time:</label>
          <input
            name="startTime"
            className="menu-input"
            style={{ width: "130px" }}
            value={this.props.startTime}
            onChange={this.props.setAppState} //onChange={this.setLinkProps}
            type="time"
          />
        </div>
        <div className="menu-input-v-align-inner">
          <label className="menu-input-v-align-label">End&nbsp;Time:</label>
          <input
            name="endTime"
            className="menu-input"
            style={{ width: "130px" }}
            value={this.props.endTime}
            onChange={this.props.setAppState}
            type="time"
          />
        </div>
      </div>
    );
  }
}
