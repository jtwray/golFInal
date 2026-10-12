import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Grid from "../components/Grid";
import SizeSlider from "../components/SizeSlider";
import Timer from "../components/Timer";
import { ChakraProvider } from "@chakra-ui/react";
import Game from "../views/Game";
import { gridReducer } from "../store/gridReducer";
import { calcNEXT } from "../utils/calcNEXT";
import { setGRID } from "../utils/setGRID";
import { useAniFrame } from "../utils/useAnimationLoop";

function stateWithGrid(rowLen) {
  const gridHASH = setGRID(rowLen * rowLen);
  return {
    gridHASH,
    bufferHASH: calcNEXT(gridHASH),
    gridSIZE: rowLen * rowLen,
    rowLen,
    generation: 0,
    isRunning: false,
    delay: 6
  };
}

test("Grid renders the cells from its state", () => {
  const { container } = render(<Grid state={stateWithGrid(3)} dispatch={jest.fn()} />);
  expect(container.querySelectorAll("#gridContainer > div > div")).toHaveLength(9);
});

test("neighbor counts do not wrap across row edges", () => {
  const grid = setGRID(9);
  grid.box2 = 1;
  grid.box3 = 1;
  grid.box4 = 1;

  expect(calcNEXT(grid).box0).toBe(0);

  const cornerBirth = setGRID(9);
  cornerBirth.box1 = 1;
  cornerBirth.box3 = 1;
  cornerBirth.box4 = 1;
  expect(calcNEXT(cornerBirth).box0).toBe(1);
});

test("resizing rebuilds a square grid and resets playback and generation", () => {
  const state = stateWithGrid(3);
  state.gridHASH.box0 = 1;
  state.generation = 7;
  state.isRunning = true;

  const resized = gridReducer(state, { type: "SETSIZE", payload: 5 });
  expect(resized.rowLen).toBe(5);
  expect(resized.gridSIZE).toBe(25);
  expect(Object.keys(resized.gridHASH)).toHaveLength(25);
  expect(Object.values(resized.gridHASH)).toEqual(Array(25).fill(0));
  expect(resized.bufferHASH).toEqual(resized.gridHASH);
  expect(resized.generation).toBe(0);
  expect(resized.isRunning).toBe(false);
});

test("the size slider displays the current cells per row", () => {
  const setSize = jest.fn();
  const { rerender } = render(
    <ChakraProvider><SizeSlider rowLen={20} setSize={setSize} /></ChakraProvider>
  );
  expect(screen.getByRole("slider", { name: "Cells per row" }))
    .toHaveAttribute("aria-valuenow", "20");

  rerender(<ChakraProvider><SizeSlider rowLen={5} setSize={setSize} /></ChakraProvider>);
  expect(screen.getByRole("slider", { name: "Cells per row" }))
    .toHaveAttribute("aria-valuenow", "5");
  fireEvent.keyDown(screen.getByRole("slider", { name: "Cells per row" }), {
    key: "ArrowRight", keyCode: 39
  });
  expect(setSize).toHaveBeenCalledWith(6);
});

test("the timer resets when resizing returns generation to zero", () => {
  jest.useFakeTimers();
  const running = { ...stateWithGrid(3), delay: 1000, generation: 1, isRunning: true };
  const { rerender } = render(<Timer state={running} />);
  act(() => jest.advanceTimersByTime(1000));
  expect(screen.getByText("1.00")).toBeInTheDocument();

  const resized = gridReducer(running, { type: "SETSIZE", payload: 5 });
  rerender(<Timer state={resized} />);
  expect(screen.getByText("0.00")).toBeInTheDocument();
  jest.useRealTimers();
});

test("the first step uses the next generation from edited cells", () => {
  let state = stateWithGrid(5);
  for (const cellID of ["box6", "box7", "box8"]) {
    state = gridReducer(state, { type: "TOGGLECELL", payload: { cellID, val: 1 } });
  }

  state = gridReducer(state, { type: "NEXT" });
  expect(state.generation).toBe(1);
  expect(Object.entries(state.gridHASH).filter(([, alive]) => alive === 1).map(([cell]) => cell))
    .toEqual(["box2", "box7", "box12"]);
});

test("clicking cells then pressing Step shows the expected first generation", () => {
  const { container } = render(<ChakraProvider><Game /></ChakraProvider>);
  const cells = () => container.querySelectorAll("#gridContainer > div > div");
  for (const index of [21, 22, 23]) fireEvent.click(cells()[index]);

  fireEvent.click(screen.getByRole("button", { name: "STEP" }));
  expect(cells()[2]).toHaveTextContent("1");
  expect(cells()[22]).toHaveTextContent("1");
  expect(cells()[42]).toHaveTextContent("1");
  expect(cells()[21]).toHaveTextContent("0");
});

test("changing grid size updates the controls and stops playback", () => {
  const { container } = render(<ChakraProvider><Game /></ChakraProvider>);
  fireEvent.click(screen.getByRole("button", { name: "START" }));
  expect(screen.getByRole("button", { name: "STOP" })).toBeInTheDocument();

  fireEvent.keyDown(screen.getByRole("slider", { name: "Cells per row" }), {
    key: "ArrowRight", keyCode: 39
  });
  expect(screen.getByRole("button", { name: "START" })).toBeInTheDocument();
  expect(container.querySelector("#cells-per-row")).toHaveTextContent("21");
  expect(container.querySelector("#totalCells")).toHaveTextContent("441");
  expect(container.querySelector("#generation")).toHaveTextContent("0");
  expect(container.querySelectorAll("#gridContainer > div > div")).toHaveLength(441);
});

test("leaving the game cancels its animation frame", () => {
  const request = jest.spyOn(window, "requestAnimationFrame").mockReturnValue(42);
  const cancel = jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {});

  function LoopHarness() {
    const [, start] = useAniFrame(jest.fn(), 6);
    return <button onClick={start}>Start loop</button>;
  }

  const { unmount } = render(<LoopHarness />);
  fireEvent.click(screen.getByRole("button", { name: "Start loop" }));
  expect(request).toHaveBeenCalled();
  unmount();
  expect(cancel).toHaveBeenCalledWith(42);
  request.mockRestore();
  cancel.mockRestore();
});
