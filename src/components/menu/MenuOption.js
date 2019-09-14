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
        {this.props.option}
      </div>
    );
  }
}
