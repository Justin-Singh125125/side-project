import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import "./assets/css/main.scss";

import Login from "./pages/Login";
import Home from "./pages/Home";



class App extends Component {






  render() {
    return (

      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        {/* these are good */}
      </Switch>

    );
  }
}

export default withRouter(App);

