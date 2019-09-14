import React, { Component } from "react";

export default class MenuOption extends Component {
  render() {
    return (
      <div>
        <button
          name={this.props.visibilityVar}
          className="menu-option-toggle"
          onClick={this.props.showOptionToggle}
        >
          <h3>
            {`${this.props.name} Options`}
            {this.props.visible ? <span>&and;</span> : <span>&or;</span>}
          </h3>
        </button>
        <div
          className="menu-option-content"
          style={{
            height: this.props.visible ? this.props.openHeight : "0px",
            overflowY: this.props.overflowY
          }}
        >
          {this.props.option}
        </div>
      </div>
    );
  }
}
