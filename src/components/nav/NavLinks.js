import React from "react";

export function Link(props) {
  const { link, classname } = props;
  const targetAndRel = isFile =>
    isFile
      ? { target: "", rel: "" }
      : { target: "_blank", rel: "noopener noreferrer" };
  const { target, rel } = targetAndRel(link.file);
  return (
    <a
      key={`navLink${link.name}`}
      className={`nav-link ${classname}`}
      href={link.path}
      target={target}
      rel={rel}
    >
      {link.name}
    </a>
  );
}

export function Dropdown(props) {
  const onMouseEnter = e => {
    e.currentTarget.lastChild.style.display = "flex";
  };

  const onMouseLeave = e => {
    e.currentTarget.lastChild.style.display = "none";
  };
  const { link } = props;
  return (
    <div
      key={`dropdown${link.name}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="nav-item nav-link">{link.name} &nabla;</div>
      <div
        className="dropdown"
        style={{
          display: "none",
          flexDirection: "column",
          position: "absolute",
          zIndex: "10",
          backgroundColor: "#333",
          boxShadow: "0px 8px 16px 0px rgba(0, 0, 0, 1)"
        }}
      >
        {link.dropdown.map(dLink => {
          return (
            <Link
              key={`dlink${dLink.name}`}
              link={dLink}
              classname="dropdown-item"
            />
          );
        })}
      </div>
    </div>
  );
}
