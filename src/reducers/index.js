import { combineReducers } from "redux";
import { mouseCoordsReducer } from "./mouseCoordsReducer";
import { stateMapIsHoveredReducer } from "./stateMapIsHoveredReducer";

export const allReducers = combineReducers({
  stateMapIsHovered: stateMapIsHoveredReducer,
  mouseCoords: mouseCoordsReducer,
});
