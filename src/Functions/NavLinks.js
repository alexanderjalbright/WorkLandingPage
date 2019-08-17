import React from "react";

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

export function Link(link) {
  const { target, rel } = targetAndRel(link.file);
  return (
    <a
      key={link.name}
      className="nav-item nav-link"
      href={link.path}
      target={target}
      rel={rel}
    >
      {link.name}
    </a>
  );
}

export function Dropdown(link) {
  return (
    <div
      key={link.name}
      className="dropdown-cover"
      onMouseEnter={e => onMouseEnter(e)}
      onMouseLeave={e => onMouseLeave(e)}
    >
      <div className="nav-item nav-link">{link.name} ▼</div>
      <div className="dropdown">
        {link.dropdown.map(dLink => {
          const { target, rel } = targetAndRel(dLink.file);
          return (
            <a
              key={dLink.name}
              className="dropdown-item nav-link"
              href={dLink.path}
              target={target}
              rel={rel}
            >
              {dLink.name}
            </a>
          );
        })}
      </div>
    </div>
  );
}
