import React, { useReducer } from "react";
import { gridReducer } from "../store/gridReducer";
import { initialState, init } from "../store/initialState";
import { motion } from "framer-motion";
import { containerVariants } from "../utils/styleVariants";
import Grid from "../components/Grid";
import ControlPanel from "../components/ControlPanel";
import { useAniFrame } from "../utils/useAnimationLoop";
import Timer from "../components/Timer";

export default function Game() {
  const [state, dispatch] = useReducer(gridReducer, initialState);

  const next = () => dispatch({ type: "NEXT" });

  const [step, start, stop] = useAniFrame(next, state.delay, state);

  const setSize = (size) => {
    console.log({ size });
    size && dispatch({ type: "SETSIZE", payload: size });
  };

  const toggleStart = () => {
    if (state.isRunning) {
      dispatch({ type: "STOP" });
      dispatch({ type: "STOP_TIMER" });

      stop();
    }
    if (!state.isRunning) {
      dispatch({ type: "START" });
      dispatch({ type: "START_TIMER" });
      start();
    }
  };

  const setSpeed = (delayValue) => {
    dispatch({ type: "SETSPEED", payload: delayValue });
  };

  const random = () => {
    let randomGridHASH = { ...state.gridHASH };
    for (let cell in randomGridHASH) {
      let randomNum = Math.floor(Math.random() * 2);
      randomGridHASH[cell] = randomNum;
    }
    dispatch({ type: "RANDOM", payload: randomGridHASH });
  };

  const clear = () => {
    let clearGridHASH = { ...state.gridHASH };
    for (let cell in clearGridHASH) {
      clearGridHASH[cell] = 0;
    }
    dispatch({ type: "CLEAR", payload: clearGridHASH });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div style={{ fontSize: "36px" }}>
        <h2>Game Of Life-Cellular Automata </h2>
        <Timer state={state} />
        <ControlPanel
          random={random}
          clear={clear}
          step={step}
          toggleStart={toggleStart}
          isRunning={state.isRunning}
          generation={state.generation}
          rowLen={state.rowLen}
          gridSIZE={state.gridSIZE}
          delay={state.delay}
          dispatch={dispatch}
          setSpeed={setSpeed}
          setSize={setSize}
          state={state}
        />
        <Grid state={state} dispatch={dispatch} />
      </div>
    </motion.div>
  );
}
