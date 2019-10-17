import React from "react";

export default function MenuTimeMonitor(props) {
  const { startTime, endTime, setAppState } = props;
  return (
    <div className="menu-input-v-align-outter">
      <div className="menu-input-v-align-inner">
        <label className="menu-input-v-align-label">Start&nbsp;Time:</label>
        <input
          name="startTime"
          className="menu-input"
          style={{ width: "130px" }}
          value={startTime}
          onChange={setAppState} //onChange={this.setLinkProps}
          type="time"
        />
      </div>
      <div className="menu-input-v-align-inner">
        <label className="menu-input-v-align-label">End&nbsp;Time:</label>
        <input
          name="endTime"
          className="menu-input"
          style={{ width: "130px" }}
          value={endTime}
          onChange={setAppState}
          type="time"
        />
      </div>
    </div>
  );
}
