import React, { Component } from "react";

function onMouseEnter(e) {
  e.currentTarget.lastChild.style.display = "flex";
}
function onMouseLeave(e) {
  e.currentTarget.lastChild.style.display = "none";
}

function targetAndRel(bool) {
  return bool
    ? { target: "", rel: "" }
    : { target: "_blank", rel: "noopener noreferrer" };
}

export class Link extends Component {
  render() {
    const { link, classname } = this.props;
    const { target, rel } = targetAndRel(link.file);
    return (
      <a
        key={link.name}
        className={`nav-link ${classname}`}
        href={link.path}
        target={target}
        rel={rel}
      >
        {link.name}
      </a>
    );
  }
}

export class Dropdown extends Component {
  render() {
    const { link } = this.props;
    return (
      <div
        key={link.name}
        className="dropdown-cover"
        onMouseEnter={e => onMouseEnter(e)}
        onMouseLeave={e => onMouseLeave(e)}
      >
        <div className="nav-item nav-link">{link.name} ▼</div>
        <div className="dropdown">
          {link.dropdown
            .sort((a, b) => a.name > b.name)
            .map(dLink => {
              return <Link link={dLink} classname="dropdown-item" />;
            })}
        </div>
      </div>
    );
  }
}
