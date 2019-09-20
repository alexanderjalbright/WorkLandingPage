import React, { Component } from "react";
export default class Alerts extends Component {
  render() {
    return (
      <div
        style={{ gridArea: "alerts", backgroundColor: this.props.alertsColor }}
      >
        alerts
      </div>
    );
  }
}
