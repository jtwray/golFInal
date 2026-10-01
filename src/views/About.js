import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "../utils/styleVariants";

export default function About() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <main className="informationPage">
        <h1>About</h1>
        <p>
          Mathematician John Conway created the Game of Life. Martin Gardner
          introduced it to a wider audience in his October 1970{" "}
          <a href="https://www.scientificamerican.com/article/mathematical-games-1970-10/">Scientific American column</a>.
          Simple local rules can produce patterns that remain still, repeat, or
          travel across the grid.
        </p>
        <h2>Sources</h2>
        <ul>
          <li><a href="https://www.scientificamerican.com/article/mathematical-games-1970-10/">Martin Gardner, “Mathematical Games” (1970)</a></li>
          <li><a href="https://www.cs.ox.ac.uk/files/3319/PRG43.pdf">Oxford, “Conway’s game of ‘Life’”</a></li>
        </ul>
      </main>
    </motion.div>
  );
}
