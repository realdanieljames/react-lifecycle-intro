import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Todo from "./components/Todo/Todo";
import Home from "./components/home/home";
import Nav from "./components/nav/Nav";

import "./App.css";

class App extends Component {

  state = {
    isAut: false,
    user:null,
  }
  render() {
    return (
      <Router>
        <Nav />

        <Switch>
          <Route path="/sign-up"  component={Signup}/>
          <Route path="/sign-in"  component={Signin}/>
          <Route path="/todo"  component={Todo}/>
          <Route path="/"  component={Home}/>
        </Switch>
      </Router>
    )
  }
}

export default App;

