import React, { Component } from "react";
import NavigationBar from "./components/navigationBar";
import BodyPage from "./components/bodyPage";

class Home extends Component {
  state = {};
  render() {
    return (
     <div>
        <NavigationBar />
        <BodyPage/>
    </div>
    );
  }
}

export default Home;
