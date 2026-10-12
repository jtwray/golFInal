import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Game from "../views/Game";
import Timer from "../components/Timer";
import { presets } from "../data/presets";
import { gridReducer } from "../store/gridReducer";
import { calcNEXT } from "../utils/calcNEXT";
import { setGRID } from "../utils/setGRID";

function stateWithGrid(rowLen) {
  const gridHASH = setGRID(rowLen * rowLen);
  return {
    gridHASH,
    bufferHASH: calcNEXT(gridHASH),
    gridSIZE: rowLen * rowLen,
    rowLen,
    generation: 0,
    isRunning: false,
    delay: 1000,
    timerResetKey: 0
  };
}

function liveCells(gridHASH) {
  return Object.keys(gridHASH).filter((cell) => gridHASH[cell] === 1);
}

const canonicalRows = {
  glider: [".O.", "..O", "OOO"],
  rPentomino: [".OO", "OO.", ".O."],
  acorn: [".O.....", "...O...", "OO..OOO"],
  pulsar: [
    "..OOO...OOO..", ".............",
    "O....O.O....O", "O....O.O....O", "O....O.O....O",
    "..OOO...OOO..", ".............", "..OOO...OOO..",
    "O....O.O....O", "O....O.O....O", "O....O.O....O",
    ".............", "..OOO...OOO.."
  ],
  lightweightSpaceship: [".O..O", "O....", "O...O", "OOOO."]
};

test("named presets retain their canonical cell layouts", () => {
  for (const [id, rows] of Object.entries(canonicalRows)) {
    expect(presets[id].rows).toEqual(rows);
    expect(rows.every((row) => row.length === rows[0].length)).toBe(true);
  }
  expect(canonicalRows.pulsar.join("").split("O")).toHaveLength(49);
});

test("loading each preset centers its complete pattern on a fresh board", () => {
  for (const [id, rows] of Object.entries(canonicalRows)) {
    const state = stateWithGrid(20);
    state.gridHASH.box0 = 1;
    const loaded = gridReducer(state, { type: "LOAD_PRESET", payload: id });
    const top = Math.floor((20 - rows.length) / 2);
    const left = Math.floor((20 - rows[0].length) / 2);
    const expected = [];
    rows.forEach((row, y) => {
      [...row].forEach((cell, x) => {
        if (cell === "O") expected.push(`box${(top + y) * 20 + left + x}`);
      });
    });

    expect(liveCells(loaded.gridHASH)).toEqual(expected);
    expect(loaded.gridHASH.box0).toBe(0);
    expect(Object.keys(loaded.gridHASH)).toHaveLength(400);
    expect(loaded.bufferHASH).toEqual(calcNEXT(loaded.gridHASH));
  }
});

test("small boards grow to fit each wide pattern with a border", () => {
  const cases = [
    ["acorn", 9, 7],
    ["pulsar", 15, 48],
    ["lightweightSpaceship", 7, 9]
  ];
  for (const [id, rowLen, liveCount] of cases) {
    const loaded = gridReducer(stateWithGrid(5), { type: "LOAD_PRESET", payload: id });
    expect(loaded.rowLen).toBe(rowLen);
    expect(loaded.gridSIZE).toBe(rowLen * rowLen);
    expect(Object.keys(loaded.gridHASH)).toHaveLength(rowLen * rowLen);
    expect(liveCells(loaded.gridHASH)).toHaveLength(liveCount);
  }
});

test("reloading the same preset resets an evolved or edited board", () => {
  const running = { ...stateWithGrid(20), generation: 7, isRunning: true };
  const original = gridReducer(running, { type: "LOAD_PRESET", payload: "glider" });
  expect(original.generation).toBe(0);
  expect(original.isRunning).toBe(false);
  expect(original.timerResetKey).toBe(1);

  let changed = gridReducer(original, { type: "NEXT" });
  changed = gridReducer(changed, {
    type: "TOGGLECELL", payload: { cellID: "box0", val: 1 }
  });
  const reloaded = gridReducer(changed, { type: "LOAD_PRESET", payload: "glider" });
  expect(reloaded.gridHASH).toEqual(original.gridHASH);
  expect(reloaded.bufferHASH).toEqual(original.bufferHASH);
  expect(reloaded.generation).toBe(0);
  expect(reloaded.timerResetKey).toBe(2);
});

test("loading a preset resets the visible timer", () => {
  jest.useFakeTimers();
  const running = { ...stateWithGrid(20), generation: 1, isRunning: true };
  const { rerender } = render(<Timer state={running} />);
  act(() => jest.advanceTimersByTime(1000));
  expect(screen.getByText("1.00")).toBeInTheDocument();

  const loaded = gridReducer(running, { type: "LOAD_PRESET", payload: "glider" });
  rerender(<Timer state={loaded} />);
  expect(screen.getByText("0.00")).toBeInTheDocument();
  jest.useRealTimers();
});

test("a small-board preset updates the slider and remains editable", () => {
  const { container } = render(<ChakraProvider><Game /></ChakraProvider>);
  fireEvent.keyDown(screen.getByRole("slider", { name: "Cells per row" }), {
    key: "Home", keyCode: 36
  });
  expect(container.querySelector("#cells-per-row")).toHaveTextContent("5");

  fireEvent.change(screen.getByLabelText("Starting pattern"), {
    target: { value: "pulsar" }
  });
  expect(screen.getByText(/repeats every three generations/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Load pattern" }));
  expect(container.querySelector("#cells-per-row")).toHaveTextContent("15");
  expect(container.querySelector("#totalCells")).toHaveTextContent("225");
  expect(screen.getByRole("slider", { name: "Cells per row" }))
    .toHaveAttribute("aria-valuenow", "15");
  expect(container.querySelectorAll("#gridContainer > div > div")).toHaveLength(225);

  const cell = container.querySelectorAll("#gridContainer > div > div")[0];
  fireEvent.click(cell);
  expect(cell).toHaveTextContent("1");
});

test("Load pattern can be clicked again and the first Step uses the seed", () => {
  const { container } = render(<ChakraProvider><Game /></ChakraProvider>);
  const load = screen.getByRole("button", { name: "Load pattern" });
  fireEvent.click(load);
  fireEvent.click(screen.getByRole("button", { name: "STEP" }));
  expect(container.querySelector("#generation")).toHaveTextContent("1");

  fireEvent.click(load);
  expect(container.querySelector("#generation")).toHaveTextContent("0");
  fireEvent.click(screen.getByRole("button", { name: "STEP" }));
  const cells = container.querySelectorAll("#gridContainer > div > div");
  expect([188, 190, 209, 210, 229].map((index) => cells[index].textContent))
    .toEqual(["1", "1", "1", "1", "1"]);
  expect(container.querySelector("#generation")).toHaveTextContent("1");

  fireEvent.click(screen.getByRole("button", { name: "START" }));
  expect(screen.getByRole("button", { name: "STOP" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "STOP" }));
});
