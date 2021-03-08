import React from "react";

export default function Cell({ cellID, val, state, dispatch }) {
  let cellWidth = `${100 / state.rowLen}`;
  let cellStyles = {
    background: "transparent",
    border: "inset indigo 3px",
    color: "transparent",
    flex: `0 ${state.rowLen} ${cellWidth}%`,
    fontSize: cellWidth * 2.5 + "px",
    width: `${100 / state.rowLen}%`,
    height: `${100 / state.rowLen}%`,
    textAlign: "center",
    textShadow: `-.4px -.4px .5px white,1px 1px 0.4px black,1px 1px 4px indigo`,
    transition: "all .2s ease",
    transform: "translate3d(0,0,0)",
    display: "flex",
    placeContent: "center"
  };
  let liveCellStyles = {
    transition: "all .2s ease",
    transform: "translate3d(0,0,0)",
    background: "lime",
    color: "transparent",
    textShadow: `-.4px -.4px .5px white,1px 1px 0.4px black,1px 1px 0.4px lime`
  };

  return (
    <div
      onClick={() =>
        dispatch({
          type: "TOGGLECELL",
          payload: { cellID: cellID, val: val === 0 ? 1 : 0 }
        })
      }
      style={{ ...cellStyles, ...(val === 1 && liveCellStyles) }}
    >
      {val}
    </div>
  );
}
