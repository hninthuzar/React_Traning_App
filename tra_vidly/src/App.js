import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <main className="container">
        <NavBar/>
        <Switch>
        <Route path="/registration" component={RegisterForm}></Route>
          <Route path="/login" component={LoginForm}></Route>
          <Route path="/customers" component={Customers}></Route>
          <Route path="/rentals" component={Rentals}></Route>
          <Route path="/not-found" component={NotFound}></Route>
          <Route path="/movies/:id" component={MovieForm}></Route>          
          <Route path="/movies" component={Movies}></Route>          
          <Route path="/" exact component={Movies}></Route>
          <Redirect to="/not-found" />
        </Switch>
      </main>
    );
  }
}

export default App;
