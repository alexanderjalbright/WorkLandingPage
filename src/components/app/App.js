import React, { Component } from "react";
import "./App.css";

import Nav from "../nav/Nav";
import Menu from "../menu/Menu";
import Alerts from "../alerts/Alerts";
import TimeMonitor from "../timemonitor/TimeMonitor";
import Notes from "../notes/Notes";

import { LoadLinks } from "../../functions/Load";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      links: [],
      isMenuVisible: false,
      startTime: "08:30:00",
      endTime: "17:00:00"
    };
  }

  render() {
    return (
      <div className="App">
        <Menu
          visible={this.state.isMenuVisible}
          links={this.state.links}
          deleteLink={this.deleteLink}
          editLink={this.editLink}
          toggleEditable={this.toggleEditable}
          addLink={this.addLink}
          startTime={this.state.startTime}
          endTime={this.state.endTime}
          setTimeMonitor={this.setTimeMonitor}
        />
        <div className="main">
          <Nav links={this.state.links} toggleMenu={this.toggleMenu} />
          <Alerts />
          <TimeMonitor
            startTime={this.state.startTime}
            endTime={this.state.endTime}
          />
          <Notes />
        </div>
      </div>
    );
  }

  componentDidMount = () => {
    this.setState({ links: LoadLinks() });
  };

  saveLinks = newLinks => {
    newLinks
      .sort((a, b) => a.name > b.name)
      .forEach(link => {
        link.dropdown === undefined ||
          link.dropdown.sort((a, b) => a.name > b.name);
      });

    localStorage.setItem("links", JSON.stringify(newLinks));
    this.setState({ links: newLinks });
  };

  deleteLink = (index, dIndex) => {
    const modLinks = [...this.state.links];
    dIndex === undefined
      ? modLinks.splice(index, 1)
      : modLinks[index].dropdown.splice(dIndex, 1);
    this.saveLinks(modLinks);
  };

  editLink = (index, dIndex, newLink) => {
    const modLinks = [...this.state.links];
    dIndex === undefined
      ? (modLinks[index] = newLink)
      : (modLinks[index].dropdown[dIndex] = newLink);
    this.saveLinks(modLinks);
  };

  addLink = (newLink, index) => {
    const modLinks = [...this.state.links];
    index === undefined
      ? modLinks.push(newLink)
      : modLinks[index].dropdown.push(newLink);
    this.saveLinks(modLinks);
  };

  toggleMenu = () => {
    this.setState({ isMenuVisible: !this.state.isMenuVisible });
  };

  setTimeMonitor = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
}
