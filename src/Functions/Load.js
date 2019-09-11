export function LoadLinks() {
  let links = JSON.parse(localStorage.getItem("links"));
  if (links === null) {
    links = [
      {
        name: "StackOverflow",
        path: "https://stackoverflow.com/questions"
      },
      {
        name: "Documentation",
        dropdown: [
          {
            name: "MDN",
            path: "https://developer.mozilla.org/en-US/docs/Learn"
          },
          {
            name: "MSDN",
            path: "https://developer.microsoft.com/en-us/"
          },
          {
            name: "React.js",
            path: "https://reactjs.org/docs/getting-started.html"
          },
          {
            name: "W3Schools",
            path: "https://www.w3schools.com/"
          },
          {
            name: "W3Schools",
            path: "https://www.w3schools.com/"
          }
        ]
      }
    ];
    localStorage.setItem("links", JSON.stringify(links));
  }

  return links;
}
