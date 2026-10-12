import { calcNEXT } from "../utils/calcNEXT";
import { setGRID } from "../utils/setGRID";
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
        isRunning: false
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
