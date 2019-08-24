import React, { Component } from "react";

export default class Menu extends Component {
  render() {
    const { links, deleteLink } = this.props;
    return (
      <div className="Menu">
        <h1>MENU</h1>
        <ul className="edit-links">
          {links.map((link, index) => (
            <li key={link.name}>
              {link.name}
              <button onClick={() => deleteLink(index)}>&times;</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
