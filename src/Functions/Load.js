export function LoadLinks() {
  let links = JSON.parse(localStorage.getItem("links"));
  if (!links) {
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

export function LoadColors() {
  let colors = JSON.parse(localStorage.getItem("colors"));
  if (!colors) {
    colors = {
      navBarColor: "#333333",
      timeMonitorColor: "#3e0070",
      alertsColor: "#aa0000",
      notesColor: "#416400",
      menuColor: "#3e0070"
    };
    localStorage.setItem("colors", JSON.stringify(colors));
  }

  return colors;
}
