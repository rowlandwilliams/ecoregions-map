import { combineReducers } from "redux";
import {  tooltipDataReducer } from "./tooltipDataReducer";
import { stateMapIsHoveredReducer } from "./stateMapIsHoveredReducer";

export const allReducers = combineReducers({
  stateMapIsHovered: stateMapIsHoveredReducer,
  tooltipData: tooltipDataReducer,
});
