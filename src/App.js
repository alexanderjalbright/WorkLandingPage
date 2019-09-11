import React, { Component } from "react";
import "./App.css";

import Nav from "./Components/Nav";
import Menu from "./Components/Menu";
import Alerts from "./Components/Alerts";
import Trackers from "./Components/Trackers";
import Notes from "./Components/Notes";

import { LoadLinks, SaveLinks } from "./Functions/Load.js";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      links: [],
      isMenuOpen: false
    };
  }

  saveLinks = newLinks => {
    newLinks
      .sort((a, b) => a.name > b.name)
      .forEach(link => {
        link.dropdown === undefined ||
          link.dropdown.sort((a, b) => a.name > b.name);
        link.isEditable = false;
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

  toggleEditable = (index, dIndex) => {
    const modLinks = [...this.state.links];
    dIndex === undefined
      ? (modLinks[index].isEditable = !modLinks[index].isEditable)
      : (modLinks[index].dropdown[dIndex].isEditable = !modLinks[index]
          .dropdown[dIndex].isEditable);
    this.setState({ links: modLinks });
  };

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  componentDidMount() {
    this.setState({
      links: LoadLinks()
    });
  }
  render() {
    return (
      <div className="App">
        {this.state.isMenuOpen && (
          <Menu
            links={this.state.links}
            deleteLink={this.deleteLink}
            editLink={this.editLink}
            toggleEditable={this.toggleEditable}
            addLink={this.addLink}
          />
        )}
        <div className="main">
          <Nav links={this.state.links} toggleMenu={this.toggleMenu} />
          <Alerts />
          <Trackers />
          <Notes />
        </div>
      </div>
    );
  }
}
