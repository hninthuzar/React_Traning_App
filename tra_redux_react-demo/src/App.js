import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/home";
import Customer from "./components/customer";
import Item from "./components/item";
import NavBar from "./components/navBar";

class App extends Component {
  state = {  }
  render() { 
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/customer" component={Customer} />
            <Route exact path="/item" component={Item} />
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
 
export default App;