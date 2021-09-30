import React, { Component } from "react";
import ActiveBook from "./activeBook";
import BookTable from "./bookTable";
import {DatePicker } from "antd";
import moment from 'moment';

class Book extends Component {
  state = {
    data: [
      { id: "1", first: "Mark", last: "John", age: 34, active: true },
      { id: "2", first: "Mark 2", last: "John 2", age: 24, active: true },
      { id: "3", first: "Mark 3", last: "John 3", age: 18, active: false },
    ],
  };

  onlyActiveList = () => {
    const data = this.state.data.filter((x) => x.active);
    this.setState({ data });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="text-center">Books </h1>
        <BookTable data={this.state.data} />
        <br />
        <ActiveBook onlyActiveList={this.onlyActiveList} />
        <br/>
        <div className="text-center">
            <DatePicker defaultValue={moment()} ></DatePicker>
        </div>
      </React.Fragment>
    );
  }
}

export default Book;
