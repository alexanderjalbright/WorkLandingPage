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
          className="menu-input menu-input-v-align-input"
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
          className="menu-input-v-align-input menu-input"
          style={{ width: "130px" }}
          value={endTime}
          onChange={setAppState}
          type="time"
        />
      </div>
      <hr />
      <div className="menu-input-v-align-inner">
        <input
          name="newHolidayName"
          style={{
            width: "100%",
            gridArea: "label",
            textAlign: "right",
            background: "none",
            color: "#fff",
            border: "none"
          }}
          value={newHolidayName}
          onChange={onChange}
          placeholder="My Birthday"
          dir="rtl"
        />
        <span className="menu-input-v-align-input">
          <input
            name="newHolidayDate"
            className="menu-input"
            style={{ width: "130px" }}
            value={newHolidayDate}
            onChange={onChange}
            type="Date"
          />
          <button className="menu-btn add-btn" onClick={addHolidayHandler}>
            +
          </button>
        </span>
      </div>
    </div>
  );
}
