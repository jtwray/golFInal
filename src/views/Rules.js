import React from "react";
import { motion } from "framer-motion";
import { containerVariants } from "../utils/styleVariants";

export default function Rules() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <main className="informationPage">
        <h1>Rules</h1>
        <p>
          Conway’s Game of Life is a simulation on a grid. Each cell is alive or
          dead. In every generation, count its eight neighbors, including the
          diagonal cells. All cells change at the same time.
        </p>
        <h2>What happens next?</h2>
        <ul>
          <li><strong>Birth:</strong> A dead cell with exactly three live neighbors becomes alive.</li>
          <li><strong>Survival:</strong> A live cell with two or three live neighbors stays alive.</li>
          <li><strong>Death by isolation:</strong> A live cell with zero or one live neighbor dies.</li>
          <li><strong>Death by overcrowding:</strong> A live cell with four or more live neighbors dies.</li>
        </ul>
        <p>A dead cell with any count other than three stays dead.</p>
      </main>
    </motion.div>
  );
}
