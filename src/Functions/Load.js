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
        name: "Music",
        path: "https://open.spotify.com"
      },
      {
        name: "Weather",
        path:
          "https://www.accuweather.com/en/us/macedonia/44056/minute-weather-forecast/339996"
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
      },
      {
        name: "Class",
        dropdown: [
          {
            name: "Noba | Psych",
            path: "https://nobaproject.com/textbooks/julie-evey-new-textbook"
          },
          {
            name: "Blackboard",
            path: "https://learn.kent.edu/webapps/login/"
          },
          {
            name: "Email",
            path: "https://email.kent.edu"
          },
          {
            name: "Flashline",
            path: "https://flashline.kent.edu"
          }
        ]
      },
      {
        name: "Work",
        dropdown: [
          {
            name: "Ultipro",
            path: "https://ew34.ultipro.com/login.aspx"
          }
        ]
      }
    ];
    localStorage.setItem("links", JSON.stringify(links));
  }
  links
    .sort((a, b) => a.name > b.name)
    .forEach(link => {
      link.dropdown === undefined ||
        link.dropdown.sort((a, b) => a.name > b.name);
      link.isEditable = false;
    });
  return links;
}

export function SaveLinks(newLinks) {
  localStorage.setItem("links", JSON.stringify(newLinks));
}
