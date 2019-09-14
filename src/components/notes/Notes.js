import React, { Component } from "react";
import "./Notes.css";

export default class Notes extends Component {
  render() {
    return (
      <div className="Notes" style={{ backgroundColor: this.props.notesColor }}>
        notes
      </div>
    );
  }
}
