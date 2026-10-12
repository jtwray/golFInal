import { calcNEXT } from "../utils/calcNEXT";
import { setGRID } from "../utils/setGRID";
import { presets } from "../data/presets";
import { initialState } from "./initialState";

export function gridReducer(state = initialState, action) {
  switch (action.type) {
    case "START":
      console.log("CASE START");
      return { ...state, isRunning: true };
    case "STOP":
      console.log("CASE STOP");
      return { ...state, isRunning: false };
    case "TOGGLECELL": {
      const gridHASH = {
        ...state.gridHASH,
        [action.payload.cellID]: action.payload.val
      };
      return {
        ...state,
        gridHASH,
        bufferHASH: calcNEXT(gridHASH)
      };
    }
    case "RANDOM":
      console.log("CASE RANDOM");
      return {
        ...state,
        gridHASH: { ...action.payload },
        bufferHASH: { ...calcNEXT(action.payload) }
      };
    case "CLEAR":
      console.log("CASE CLEAR");
      return {
        ...state,
        gridHASH: { ...action.payload },
        bufferHASH: { ...action.payload },
        generation: 0
      };
    case "SETSIZE": {
      const rowLen = action.payload;
      const gridSIZE = rowLen * rowLen;
      const gridHASH = setGRID(gridSIZE);
      return {
        ...state,
        gridHASH,
        bufferHASH: calcNEXT(gridHASH),
        rowLen,
        gridSIZE,
        generation: 0,
        isRunning: false,
        timerResetKey: (state.timerResetKey || 0) + 1
      };
    }
    case "LOAD_PRESET": {
      const preset = presets[action.payload];
      if (!preset) return state;

      const height = preset.rows.length;
      const width = preset.rows[0].length;
      const rowLen = Math.max(state.rowLen, 5, height + 2, width + 2);
      const gridHASH = setGRID(rowLen * rowLen);
      const top = Math.floor((rowLen - height) / 2);
      const left = Math.floor((rowLen - width) / 2);

      preset.rows.forEach((row, y) => {
        for (let x = 0; x < width; x++) {
          if (row[x] === "O") gridHASH[`box${(top + y) * rowLen + left + x}`] = 1;
        }
      });

      return {
        ...state,
        gridHASH,
        bufferHASH: calcNEXT(gridHASH),
        rowLen,
        gridSIZE: rowLen * rowLen,
        generation: 0,
        isRunning: false,
        timerResetKey: (state.timerResetKey || 0) + 1
      };
    }
    case "SETSPEED":
      console.log("CASE SETSPEED");
      return {
        ...state,
        delay: action.payload
      };
    case "NEXT":
      console.log("CASE NEXT");
      return {
        ...state,
        gridHASH: state.bufferHASH,
        bufferHASH: calcNEXT(state.bufferHASH),
        generation: state.generation + 1
      };
    default:
      return {
        ...state
      };
  }
}
