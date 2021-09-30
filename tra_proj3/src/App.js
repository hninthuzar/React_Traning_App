import React, { Component } from "react";
import TTable from "./components/tTable";
import ActiveButton from "./components/activeButton";
import Temp, { Temp2, Temp3 } from "./components/tem";
import { DatePicker } from "antd";
import moment from "moment";
import "./App.css";
import "./App.scss";

class App extends Component {
  state = {
    data: [
      { id: 1, first: "Aung", last: "Aung", age: 34, active: true },
      { id: 2, first: "Phyu", last: "Mya", age: 24, active: true },
      { id: 3, first: "Hla", last: "Hla", age: 22, active: true },
      { id: 4, first: "U", last: "Ba", age: 19, active: false },
    ],
  };

  showActive = (x) => {
    const activeOnly = this.state.data.filter((x) => x.active);
    this.setState({ data: activeOnly });
  };

  render() {
    const mystyle = {
      color: "white",
      backgroundColor: "DodgerBlue",
      padding: "10px",
      fontFamily: "Arial",
    };

    return (
      <React.Fragment>
        <h1 className="text-center" style={mystyle}>
          {" "}
          Demo Table with Map
        </h1>
        {/* <h2 className="text-center"> I am external css</h2> */}
        <TTable data={this.state.data} />
        <br />
        <div className="text-center">
          <ActiveButton onClickEvent={this.showActive} />
        </div>

        {/* <br/>
        <Temp/>
        <Temp2/>
        <Temp3/>

        <br/>

        <DatePicker defaultValue={moment()} /> */}
      </React.Fragment>
    );
  }
}

export default App;
