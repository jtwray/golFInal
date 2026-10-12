import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, wait, waitForElement } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import App from "../App";

function renderAt(path) {
  const history = createMemoryHistory({ initialEntries: [path] });
  render(<Router history={history}><App /></Router>);
  return history;
}

test("the root URL opens the game", async () => {
  const history = renderAt("/");
  await waitForElement(() => screen.getByText(/Game Of Life-Cellular Automata/i));
  expect(history.location.pathname).toBe("/game");
});

test("drawer links navigate, mark the current page, and close", async () => {
  const history = renderAt("/game");
  fireEvent.click(screen.getByRole("button", { name: /open navigation/i }));
  const rules = await waitForElement(() => screen.getByRole("link", { name: "Rules" }));
  expect(screen.getByRole("link", { name: "Game" })).toHaveAttribute("aria-current", "page");
  fireEvent.click(rules);
  expect(history.location.pathname).toBe("/rules");
  await waitForElement(() => screen.getByRole("heading", { name: "Rules" }));
  await wait(() => expect(screen.queryByRole("navigation", { name: "Main navigation" })).not.toBeInTheDocument());
  fireEvent.click(screen.getByRole("button", { name: /open navigation/i }));
  const currentRules = await waitForElement(() => screen.getByRole("link", { name: "Rules" }));
  expect(currentRules).toHaveAttribute("aria-current", "page");
});

test("the navigation drawer closes with Escape", async () => {
  renderAt("/rules");
  fireEvent.click(screen.getByRole("button", { name: /open navigation/i }));
  await waitForElement(() => screen.getByRole("navigation", { name: "Main navigation" }));
  fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape", code: "Escape" });
  await wait(() => expect(screen.queryByRole("navigation", { name: "Main navigation" })).not.toBeInTheDocument());
});

test("rules explain the four outcomes", async () => {
  renderAt("/rules");
  await waitForElement(() => screen.getByRole("heading", { name: "Rules" }));
  expect(screen.getByText(/Birth:/)).toBeInTheDocument();
  expect(screen.getByText(/Survival:/)).toBeInTheDocument();
  expect(screen.getByText(/Death by isolation:/)).toBeInTheDocument();
  expect(screen.getByText(/Death by overcrowding:/)).toBeInTheDocument();
});

test("about links to its historical sources", async () => {
  renderAt("/about");
  await waitForElement(() => screen.getByRole("heading", { name: "About" }));
  expect(screen.getByText(/John Conway created the Game of Life/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Martin Gardner/ })).toHaveAttribute(
    "href", "https://www.scientificamerican.com/article/mathematical-games-1970-10/"
  );
  expect(screen.getByRole("link", { name: /Oxford/ })).toHaveAttribute(
    "href", "https://www.cs.ox.ac.uk/files/3319/PRG43.pdf"
  );
});
