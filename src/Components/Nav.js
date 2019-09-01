import React, { Component } from "react";
import { Link, Dropdown } from "./NavLinks.js";

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
          links
            .sort((a, b) => a.name > b.name)
            .map(link => {
              //return link.dropdown !== undefined ? Dropdown(link) : Link(link);
              return link.dropdown !== undefined ? (
                <Dropdown link={link} />
              ) : (
                <Link link={link} classname="nav-item" />
              );
            })}
      </div>
    );
  }
}
