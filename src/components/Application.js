import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Game from "../views/Game";
import About from "../views/About";
import Rules from "../views/Rules";
export default function Application() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/game" />} />
      <Route path="/game" component={Game} />
      <Route path="/rules" component={Rules} />
      <Route path="/about" component={About} />
    </Switch>
  );
}
