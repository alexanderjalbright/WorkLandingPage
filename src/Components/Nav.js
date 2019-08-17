import React, { Component } from "react";
import { Link, Dropdown } from "../Functions/NavLinks";

export default class Nav extends Component {
  render() {
    const { links } = this.props;
    return (
      <div className="Nav">
        {links !== undefined &&
          links.map(link => {
            return link.dropdown !== undefined ? Dropdown(link) : Link(link);
          })}
      </div>
    );
  }
}
