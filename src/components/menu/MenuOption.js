import React from "react";

export default function MenuOption(props) {
  const {
    visibilityVar,
    showOptionToggle,
    name,
    visible,
    openHeight,
    overflowY,
    option
  } = props;
  return (
    <div>
      <button
        name={visibilityVar}
        style={{
          height: "auto",
          backgroundColor: "#5f02ac",
          width: "100%",
          color: "#fff"
        }}
        onClick={showOptionToggle}
      >
        <h3>
          {`${name} Options`}
          {visible ? <span>&and;</span> : <span>&or;</span>}
        </h3>
      </button>
      <div
        style={{
          height: visible ? openHeight : "0px",
          overflowY: overflowY,
          margin: "0",
          borderBottom: "2px solid #111",
          transition: "0.5s ease"
        }}
      >
        {option}
      </div>
    </div>
  );
}
