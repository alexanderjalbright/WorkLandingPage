import React from "react";
import "./App.css";

import Nav from "./Components/Nav";
import Menu from "./Components/Menu";
import Alerts from "./Components/Alerts";
import Trackers from "./Components/Trackers";
import Notes from "./Components/Notes";

function App() {
  return (
    <div className="App">
      <Nav />
      <Menu />
      <Alerts />
      <Trackers />
      <Notes />
    </div>
  );
}

export default App;
