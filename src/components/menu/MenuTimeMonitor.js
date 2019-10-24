import React from "react";

export default function MenuTimeMonitor(props) {
  const {
    startTime,
    endTime,
    setAppState,
    newHolidayName,
    newHolidayDate,
    onChange,
    addHolidayHandler
  } = props;
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
      <hr />
      <div className="menu-input-v-align-inner">
        <label className="menu-input-v-align-label">Holiday Name:</label>
        <input
          name="newHolidayName"
          className="menu-input"
          style={{ width: "130px" }}
          value={newHolidayName}
          onChange={onChange}
          placeholder="My Birthday"
        />
      </div>
      <div className="menu-input-v-align-inner">
        <label className="menu-input-v-align-label">Holiday Date:</label>
        <input
          name="newHolidayDate"
          className="menu-input"
          style={{ width: "130px" }}
          value={newHolidayDate}
          onChange={onChange}
          type="Date"
        />
      </div>
      <div className="menu-input-v-align-inner">
        <div className="menu-input-v-align-label"></div>
        <button
          className="menu-input"
          style={{ border: "1px solid #fff", width: "42px" }}
          onClick={addHolidayHandler}
        >
          Add
        </button>
      </div>
    </div>
  );
}
