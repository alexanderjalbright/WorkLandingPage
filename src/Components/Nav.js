import React, { Component } from "react";

export default class Nav extends Component {
  onMouseEnter(e) {
    e.currentTarget.lastChild.style.display = "block";
  }
  onMouseLeave(e) {
    e.currentTarget.lastChild.style.display = "none";
  }

  render() {
    const { links } = this.props;
    const isFile = bool => {
      return bool
        ? { target: "", rel: "" }
        : { target: "_blank", rel: "noopener noreferrer" };
    };
    return (
      <div className="Nav">
        {links.map(link => {
          const { target, rel } = isFile(link.file);
          return link.dropdown === undefined ? (
            <div className="nav-item" key={link.path}>
              <a
                className="nav-link"
                href={link.path}
                target={target}
                rel={rel}
              >
                {link.name}
              </a>
            </div>
          ) : (
            <div
              className="dropdown-cover"
              onMouseEnter={e => this.onMouseEnter(e)}
              onMouseLeave={e => this.onMouseLeave(e)}
            >
              <div className="nav-item nav-link">{link.name}</div>
              <div className="dropdown">
                {link.dropdown.map(dLink => {
                  const { target, rel } = isFile(dLink.file);
                  return (
                    <div className="dropdown-item" key={dLink.path}>
                      <a
                        className="nav-link"
                        href={dLink.path}
                        target={target}
                        rel={rel}
                      >
                        {dLink.name}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
