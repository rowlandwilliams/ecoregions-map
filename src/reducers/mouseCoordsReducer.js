import { stateMapIsHoveredReducer } from "./stateMapIsHoveredReducer";

const intialState = { mouseCoords: [], polygonData: {} };

export const tooltipDataReducer = (state = intialState, action) => {
  switch (action.type) {
    case "CHANGE-MOUSE":
      return {
        ...state,
        mouseCoords: action.mouseCoords,
        polygonData: action.polygonData,
      };

    default:
      return state;
  }
};
