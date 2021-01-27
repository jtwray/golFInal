import React from "react";
import { Route, useLocation, useRouteMatch } from "react-router-dom";
import Game from "../views/Game";
import LandingPage from "../views/LandingPage";
import About from "../views/About";
import Rules from "../views/Rules";
import { AnimatePresence, motion } from "framer-motion";

export default function Application() {
  const location = useLocation();

  return (
    <AnimatePresence key={location.key} exitBeforeEnter>
      <Route key="1" path="/" component={LandingPage} />
      <Route key="2" path="/game" component={Game} />
      <Route key="3" path="/about" component={About} />
      <Route key="4" path="/rules" component={Rules} />
    </AnimatePresence>
  );
}
