import React, { Component } from "react";

export default class MenuOption extends Component {
  render() {
    return (
      <div>
        <button
          name={this.props.visibilityVar}
          style={{
            height: "auto",
            backgroundColor: "#5f02ac",
            width: "100%",
            color: "#fff"
          }}
          onClick={this.props.showOptionToggle}
        >
          <h3>
            {`${this.props.name} Options`}
            {this.props.visible ? <span>&and;</span> : <span>&or;</span>}
          </h3>
        </button>
        <div
          style={{
            height: this.props.visible ? this.props.openHeight : "0px",
            overflowY: this.props.overflowY,
            margin: "0",
            borderBottom: "2px solid #111",
            transition: "0.5s ease"
          }}
        >
          {this.props.option}
        </div>
      </div>
    );
  }
}
