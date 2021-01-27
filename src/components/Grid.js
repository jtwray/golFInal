import React from "react";
import Cell from "./Cell";
import { gridSubcontainer } from "../utils/styles";
import {
  Box,
  ButtonGroup,
  Button,
  Stat,
  StatLabel,
  StatNumber
} from "@chakra-ui/react";

export default function Grid({ state, dispatch }) {
  return (
    <>
      <div id="gridContainer" justify="space-around">
        <div style={gridSubcontainer}>
          {state.gridHASH &&
            Object.entries(state.gridHASH).map(([key, val]) => (
              <Cell
                state={state}
                dispatch={dispatch}
                cellID={key}
                val={val}
                key={`_${key}`}
              />
            ))}
        </div>
      </div>
    </>
  );
}
