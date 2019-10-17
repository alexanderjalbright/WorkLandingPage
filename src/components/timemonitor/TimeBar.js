import React from "react";

export default function TimeBar(props) {
  const {
    gridArea,
    elapsedPercent,
    elapsedTime,
    remainingTime,
    remainingPercent
  } = props;
  return (
    <div
      style={{
        gridArea: gridArea,
        display: "grid",
        gridTemplateAreas: "'title bar'",
        gridTemplateColumns: "30px 10fr",
        justifyContent: "center",
        alignItems: "center",
        gridGap: "0"
      }}
    >
      <div
        style={{
          color: "#fff",
          gridArea: "title",
          justifySelf: "end",
          writingMode: "sideways-lr",
          textOrientation: "sideways",
          margin: "0",
          padding: "0",
          backgroundColor: "#444",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          height: "80%",
          textAlign: "center"
        }}
      >
        {gridArea}
      </div>
      <div
        className="time-bar-container"
        style={{
          // boxShadow: "0 0px 16px 0 rgba(0, 0, 0, 1)",
          gridArea: "bar",
          backgroundColor: "#333",
          height: "80%",
          border: "none",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          overflow: "hidden"
        }}
      >
        <div
          className="time-bar"
          style={{
            width: `${elapsedPercent}%`,
            backgroundColor: "#006b92",
            height: "100%"
          }}
        ></div>
        <div
          className="time-info"
          style={{
            color: "#fff",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            position: "relative",
            zIndex: "2",
            top: "-70%",
            left: "0"
          }}
        >
          <div>{`Elapsed: ${elapsedTime} (${elapsedPercent}%)`}</div>
          <div>{`Remaining: ${remainingTime} (${remainingPercent}%)`}</div>
        </div>
      </div>
    </div>
  );
}
