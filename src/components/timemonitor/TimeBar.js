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
          gridArea: "bar",
          backgroundColor: "#333",
          height: "80%",
          border: "none",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",

          position: "relative"
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

            position: "absolute",
            zIndex: "2",
            top: "23%",
            width: "100%"
          }}
        >
          <div>{`Elapsed: ${elapsedTime} (${elapsedPercent}%)`}</div>
          <div>{`Remaining: ${remainingTime} (${remainingPercent}%)`}</div>
        </div>
      </div>
    </div>
  );
}
