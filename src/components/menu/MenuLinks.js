import React, { Component } from "react";

export class Link extends Component {
  constructor(props) {
    super();
    this.state = {
      name: props.link.name,
      path: props.link.path
    };
  }
  render() {
    const { link, index, dIndex, deleteLink, editLink } = this.props;

    return (
      <li key={`menuLink${index}${dIndex}`}>
        <span>
          <input
            className="menu-input"
            style={{ width: "70px", marginRight: "5px" }}
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
          {link.path === undefined || (
            <span>
              &#10132;&nbsp;
              <input
                className="menu-input"
                type="url"
                value={this.state.path}
                onChange={e => this.setState({ path: e.target.value })}
              />
            </span>
          )}
        </span>

        <span>
          <button
            className="menu-btn add-btn"
            onClick={() => {
              const newLink = {
                name: this.state.name,
                path: this.state.path,
                dropdown: link.dropdown
              };
              editLink(index, dIndex, newLink);
            }}
          >
            +
          </button>
          <button
            className="menu-btn del-btn"
            onClick={() => deleteLink(index, dIndex)}
          >
            &times;
          </button>
        </span>
      </li>
    );
  }
}

export class Dropdown extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      path: ""
    };
  }

  render() {
    const { link, index, deleteLink, editLink, addLink } = this.props;

    return (
      <div>
        <ul>
          {link.dropdown.map((dLink, dIndex) => {
            return (
              <Link
                key={`menuDropdown${index}${dIndex}`}
                link={dLink}
                index={index}
                dIndex={dIndex}
                deleteLink={deleteLink}
                editLink={editLink}
              />
            );
          })}
          <li>
            <input
              className="menu-input"
              style={{ width: "70px", marginRight: "5px" }}
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Name"
            />

            <input
              className="menu-input"
              type="url"
              value={this.state.path}
              onChange={e => this.setState({ path: e.target.value })}
              placeholder="https://"
            />

            <button
              className="menu-btn add-btn"
              onClick={() => {
                const newLink = {
                  name: this.state.name,
                  path: this.state.path
                };
                addLink(newLink, index);
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
      </div>
    );
  }
}
