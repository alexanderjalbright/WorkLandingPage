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
      links: []
    };
  }
  componentDidMount() {
    this.setState({
      links: LoadLinks()
    });
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
