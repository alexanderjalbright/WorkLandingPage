import React, { Component } from "react";
import MenuNav from "./MenuNav";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      isMenuNavVisible: false
    };
  }

  render() {
    const {
      links,
      deleteLink,
      editLink,
      toggleEditable,
      addLink,
      visible
    } = this.props;

    return (
      <div className="menu-hide" style={{ width: visible ? "400px" : "0px" }}>
        <div className="Menu">
          <div>
            <button
              name="isMenuNavVisible"
              className="menu-option-toggle"
              onClick={this.showOptionToggle}
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
            <MenuNav
              visible={this.state.isMenuNavVisible}
              links={links}
              deleteLink={deleteLink}
              editLink={editLink}
              toggleEditable={toggleEditable}
              addLink={addLink}
            />
          </div>
        </div>
      </div>
    );
  }

  showOptionToggle = e => {
    this.setState({ [e.currentTarget.name]: !this.state.isMenuNavVisible });
  };
}
