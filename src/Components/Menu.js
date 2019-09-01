import React, { Component } from "react";
import { Link, Dropdown } from "./MenuLinks";

export default class Menu extends Component {
  render() {
    const { links, deleteLink } = this.props;
    return (
      <div className="Menu">
        <h1>MENU</h1>
        <ul className="edit-links">
          {links.map((link, index) =>
            link.dropdown !== undefined ? (
              <Dropdown link={link} index={index} deleteLink={deleteLink} />
            ) : (
              <Link link={link} index={index} deleteLink={deleteLink} />
            )
          )}
        </ul>
      </div>
    );
  }
}
