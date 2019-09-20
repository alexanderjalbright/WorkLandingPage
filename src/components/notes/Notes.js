import React, { Component } from "react";

export default class Notes extends Component {
  render() {
    return (
      <div
        style={{ gridArea: "notes", backgroundColor: this.props.notesColor }}
      >
        notes
      </div>
    );
  }
}
