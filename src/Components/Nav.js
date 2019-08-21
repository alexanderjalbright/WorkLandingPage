import React, { Component } from "react";
import { Link, Dropdown } from "../Functions/NavLinks";

export default class Nav extends Component {
  render() {
    const { links, toggleMenu } = this.props;
    return (
      <div className="Nav">
        <button
          className="menu-btn nav-link nav-item"
          onClick={() => toggleMenu()}
        >
          Menu
        </button>
        {links !== undefined &&
          links.map(link => {
            return link.dropdown !== undefined ? Dropdown(link) : Link(link);
          })}
      </div>
    );
  }
}
