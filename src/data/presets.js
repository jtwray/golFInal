// Live cells are O; dots are dead cells. Rows follow the canonical LifeWiki RLEs.
// https://conwaylife.com/wiki/Glider
// https://conwaylife.com/wiki/R-pentomino
// https://conwaylife.com/wiki/Acorn
// https://conwaylife.com/wiki/Pulsar
// https://conwaylife.com/wiki/Lightweight_spaceship
export const presets = {
  glider: {
    name: "Glider",
    description: "A five-cell spaceship that travels diagonally.",
    rows: [".O.", "..O", "OOO"]
  },
  rPentomino: {
    name: "R-pentomino",
    description: "Five cells that evolve for many generations before settling.",
    rows: [".OO", "OO.", ".O."]
  },
  acorn: {
    name: "Acorn",
    description: "Seven cells that grow into a long-lived, complex pattern.",
    rows: [".O.....", "...O...", "OO..OOO"]
  },
  pulsar: {
    name: "Pulsar",
    description: "A 48-cell oscillator that repeats every three generations.",
    rows: [
      "..OOO...OOO..",
      ".............",
      "O....O.O....O",
      "O....O.O....O",
      "O....O.O....O",
      "..OOO...OOO..",
      ".............",
      "..OOO...OOO..",
      "O....O.O....O",
      "O....O.O....O",
      "O....O.O....O",
      ".............",
      "..OOO...OOO.."
    ]
  },
  lightweightSpaceship: {
    name: "Lightweight Spaceship",
    description: "A nine-cell spaceship that travels horizontally.",
    rows: [".O..O", "O....", "O...O", "OOOO."]
  }
};
