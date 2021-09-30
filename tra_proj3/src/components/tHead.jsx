import React, { Component } from "react";

class THead extends Component {
  state = {};
  render() {
    return (
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Age</th>
          <th scope="col">Active</th>
        </tr>
      </thead>
    );
  }
}

export default THead;
