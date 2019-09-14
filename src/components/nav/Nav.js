import React, { Component } from "react";
import "./Nav.css";
import { Link, Dropdown } from "./NavLinks.js";
import cog from "../../assets/cog.png";

export default class Nav extends Component {
  render() {
    const { links, toggleMenu, navBarColor } = this.props;
    return (
      <div className="nav" style={{ backgroundColor: navBarColor }}>
        {links !== undefined &&
          links.map(link =>
            link.dropdown !== undefined ? (
              <Dropdown key={`nav${link.name}`} link={link} />
            ) : (
              <Link key={`nav${link.name}`} link={link} classname="nav-item" />
            )
          )}
        <button
          style={{ width: "50px", marginLeft: "auto" }}
          className="menu-btn nav-link nav-item"
          onClick={toggleMenu}
        >
          <img style={{ height: "50%" }} src={cog} alt="Menu" />
        </button>
      </div>
    );
  }
}
