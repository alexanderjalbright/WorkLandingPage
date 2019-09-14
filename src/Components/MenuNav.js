import React, { Component } from "react";
import { Link, Dropdown } from "./MenuLinks";

export default class Menu extends Component {
  constructor() {
    super();
    this.state = {
      name: ""
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
      <ul className="edit-links" style={{ height: visible ? "30vh" : "0px" }}>
        {links.map((link, index) => (
          <div key={link.name}>
            <Link
              link={link}
              index={index}
              deleteLink={deleteLink}
              editLink={editLink}
              toggleEditable={toggleEditable}
            />
            {link.dropdown === undefined || (
              <Dropdown
                link={link}
                index={index}
                deleteLink={deleteLink}
                editLink={editLink}
                toggleEditable={toggleEditable}
                addLink={addLink}
              />
            )}
          </div>
        ))}
        <li>
          <input
            name="name"
            className="menu-input"
            style={{ width: "70px", marginRight: "5px" }}
            value={this.state.name}
            onChange={this.setLinkProps}
            placeholder="Name"
          />

          <input
            name="path"
            className="menu-input"
            type="url"
            value={this.state.path}
            onChange={this.setLinkProps}
            placeholder="https://"
          />

          <button
            className="menu-btn add-btn"
            onClick={() => {
              const newLink = {
                name: this.state.name,
                path: this.state.path,
                isEditable: false,
                dropdown:
                  this.state.path === undefined || this.state.path === ""
                    ? [{ name: "", path: "" }]
                    : undefined
              };
              addLink(newLink);
              this.setState({ name: "", path: "" });
            }}
          >
            +
          </button>
          <button
            className="menu-btn del-btn"
            onClick={() => this.setState({ name: "", path: "" })}
          >
            &times;
          </button>
        </li>
      </ul>
    );
  }

  setLinkProps = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}
