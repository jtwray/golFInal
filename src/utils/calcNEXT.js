export function calcNEXT(gridHASH) {
  const cells = Object.keys(gridHASH);
  const rowLen = Math.sqrt(cells.length);
  const nextGrid = {};

  for (let index = 0; index < cells.length; index++) {
    const row = Math.floor(index / rowLen);
    const column = index % rowLen;
    let liveNeighbors = 0;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
      for (let columnOffset = -1; columnOffset <= 1; columnOffset++) {
        if (rowOffset === 0 && columnOffset === 0) continue;

        const neighborRow = row + rowOffset;
        const neighborColumn = column + columnOffset;
        if (
          neighborRow >= 0 && neighborRow < rowLen &&
          neighborColumn >= 0 && neighborColumn < rowLen
        ) {
          liveNeighbors += gridHASH[cells[neighborRow * rowLen + neighborColumn]];
        }
      }
    }

    const cell = cells[index];
    nextGrid[cell] = liveNeighbors === 3 ||
      (liveNeighbors === 2 && gridHASH[cell] === 1) ? 1 : 0;
  }

  return nextGrid;
}
