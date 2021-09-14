import { combineReducers } from "redux";
import { mouseCoordsReducer, tooltipDataReducer } from "./mouseCoordsReducer";
import { stateMapIsHoveredReducer } from "./stateMapIsHoveredReducer";

export const allReducers = combineReducers({
  stateMapIsHovered: stateMapIsHoveredReducer,
  tooltipData: tooltipDataReducer,
});
