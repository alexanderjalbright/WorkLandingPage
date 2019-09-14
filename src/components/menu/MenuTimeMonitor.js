import React, { Component } from "react";

export default class MenuTimeMonitor extends Component {
  render() {
    return (
      <div
        className="time-monitor-times menu-option-content"
        style={{
          height: this.props.visible ? "10vh" : "0px"
        }}
      >
        <div>
          <label>Start Time:</label>
          <input
            name="startTime"
            className="menu-input"
            style={{ width: "130px", marginRight: "5px" }}
            value={this.props.startTime}
            onChange={this.props.setTimeMonitor} //onChange={this.setLinkProps}
            type="time"
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            name="endTime"
            className="menu-input"
            style={{ width: "130px", marginRight: "5px" }}
            value={this.props.endTime}
            onChange={this.props.setTimeMonitor}
            type="time"
          />
        </div>
      </div>
    );
  }
}
