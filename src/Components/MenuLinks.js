import React, { Component } from "react";

export class Link extends Component {
  render() {
    const { link, index, dIndex, deleteLink } = this.props;
    return (
      <li key={link.name}>
        {link.name}
        <button onClick={() => deleteLink(index, dIndex)}>&times;</button>
      </li>
    );
  }
}

export class Dropdown extends Component {
  render() {
    const { link, index, deleteLink } = this.props;
    return (
      <div>
        <div style={{ textDecoration: "underline" }}>{link.name}</div>
        <ul>
          {link.dropdown
            .sort((a, b) => a.name > b.name)
            .map((dLink, dIndex) => {
              return (
                <Link
                  link={dLink}
                  index={index}
                  dIndex={dIndex}
                  deleteLink={deleteLink}
                />
              );
            })}
        </ul>
      </div>
    );
  }
}
