import React, { Component } from "react";
import MenuNav from "./MenuNav";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      isMenuNavVisible: false
    };
  }

  optionToggle(option) {
    this.setState({ [option]: !this.state[option] });
  }
  render() {
    const { links, deleteLink, editLink, toggleEditable, addLink } = this.props;
    return (
      <div className="Menu">
        <h1 style={{ textAlign: "center" }}>MENU</h1>
        <button
          className="menu-option-toggle"
          onClick={() => this.optionToggle("isMenuNavVisible")}
        >
          <h3>
            Nav Options{" "}
            {this.state.isMenuNavVisible ? (
              <span>&and;</span>
            ) : (
              <span>&or;</span>
            )}
          </h3>
        </button>
        {this.state.isMenuNavVisible && (
          <MenuNav
            links={links}
            deleteLink={deleteLink}
            editLink={editLink}
            toggleEditable={toggleEditable}
            addLink={addLink}
          />
        )}
      </div>
    );
  }
}
