import React from "react";
import { Route, useLocation, useRouteMatch } from "react-router-dom";
import Game from "../views/Game";
import About from "../views/About";
import Rules from "../views/Rules";
import { AnimatePresence, motion } from "framer-motion";

export default function Application({ state, dispatch }) {
  const location = useLocation();

  return (
    <AnimatePresence key={location.key} exitBeforeEnter>
      <Route key="2" path="/game">
        <Game state={state} dispatch={dispatch} />
      </Route>
      <Route key="3" path="/about" component={About} />
      <Route key="4" path="/rules" component={Rules} />
    </AnimatePresence>
  );
}
