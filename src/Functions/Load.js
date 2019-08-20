export function LoadLinks() {
  let links = JSON.parse(localStorage.getItem("links"));
  if (links === null) {
    links = [
      {
        name: "Todo",
        path: "https://todo.microsoft.com"
      },
      {
        name: "Search",
        path: "https://google.com"
      },
      {
        name: "Social",
        dropdown: [
          {
            name: "Github",
            path: "https://github.com/alexanderjalbright"
          },
          {
            name: "LinkedIn",
            path: "https://www.linkedin.com/in/alexanderjalbright/"
          },
          {
            name: "Portfolio",
            path: "https://alexalbright.dev"
          }
        ]
      }
    ];
    localStorage.setItem("links", JSON.stringify(links));
  }
  links.sort((a, b) => a.name > b.name);
  return links;
}
