import React from "react";

export default function Github(props) {
  const { user, recent3Repos } = props;
  const dateSplitter = textDate => {
    const endOfDate = textDate.indexOf("T") - 1;
    const dateOnly = textDate.slice(0, endOfDate);
    const datePieces = dateOnly.split("-");
    return `${datePieces[1]}/${datePieces[2]}`;
  };
  console.log(user);
  return (
    <div style={{ backgroundColor: "#9B8900", overflowY: "scroll" }}>
      <h1>
        <a href={user.html_url}>{user.name}</a>
      </h1>
      <h2>
        <a href={user.blog}>{user.login}</a>
      </h2>
      <ol>
        {recent3Repos.map(repo => (
          <li>
            <a href={repo.html_url}>{repo.name}</a>
            <span>{dateSplitter(repo.updated_at)}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
