import { combineReducers } from "redux";
import { stateMapIsHoveredReducer } from "./stateMapIsHoveredReducer";

export const allReducers = combineReducers({
  stateMapIsHovered: stateMapIsHoveredReducer,
});
