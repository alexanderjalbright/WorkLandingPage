import React, { Component } from "react";

export class Link extends Component {
  constructor(props) {
    super();
    this.state = {
      name: props.link.name
    };
  }
  render() {
    const {
      link,
      index,
      dIndex,
      deleteLink,
      editLink,
      toggleEditable
    } = this.props;
    return (
      <li key={`menuLink${index}${dIndex}`}>
        {link.isEditable ? (
          <input
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />
        ) : (
          <span>{link.name}</span>
        )}
        <span>
          <button
            className="menu-btn"
            style={{
              color: link.isEditable ? "#aa0000" : "rgb(65, 100, 0)"
            }}
            onClick={() => toggleEditable(index, dIndex)}
          >
            &Delta;
          </button>
        </span>
        {link.isEditable && (
          <span>
            <button
              className="menu-btn"
              onClick={() => editLink(index, dIndex, this.state.name)}
            >
              +
            </button>
            <button
              className="menu-btn"
              onClick={() => deleteLink(index, dIndex)}
            >
              &times;
            </button>
          </span>
        )}
      </li>
    );
  }
}

export class Dropdown extends Component {
  render() {
    const { link, index, deleteLink, editLink, toggleEditable } = this.props;
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
                toggleEditable={toggleEditable}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}
