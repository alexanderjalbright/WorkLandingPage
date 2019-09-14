import React, { Component } from "react";
import "./Nav.css";
import { Link, Dropdown } from "./NavLinks.js";

export default class Nav extends Component {
  render() {
    const { links, toggleMenu } = this.props;
    return (
      <div className="Nav">
        <button className="menu-btn nav-link nav-item" onClick={toggleMenu}>
          Menu
        </button>
        {links !== undefined &&
          links.map(link =>
            link.dropdown !== undefined ? (
              <Dropdown key={`nav${link.name}`} link={link} />
            ) : (
              <Link key={`nav${link.name}`} link={link} classname="nav-item" />
            )
          )}
      </div>
    );
  }
}
