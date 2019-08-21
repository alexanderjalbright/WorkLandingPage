import React, { Component } from "react";
import "./App.css";

import Nav from "./Components/Nav";
import Menu from "./Components/Menu";
import Alerts from "./Components/Alerts";
import Trackers from "./Components/Trackers";
import Notes from "./Components/Notes";

import { LoadLinks } from "./Functions/Load.js";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      links: [],
      isMenuOpen: false
    };
  }

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
        {this.state.isMenuOpen && <Menu />}
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
