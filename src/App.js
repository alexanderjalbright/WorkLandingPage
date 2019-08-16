import React, { Component } from "react";
import "./App.css";

import Nav from "./Components/Nav";
import Menu from "./Components/Menu";
import Alerts from "./Components/Alerts";
import Trackers from "./Components/Trackers";
import Notes from "./Components/Notes";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      links: [
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
      ]
    };
  }

  render() {
    return (
      <div className="App">
        <Nav links={this.state.links} />
        <Menu />
        <Alerts />
        <Trackers />
        <Notes />
      </div>
    );
  }
}
