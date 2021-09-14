const intialState = {
  mouseCoords: [],
  polygonData: {},
  activePolygonColor: null,
};

export const tooltipDataReducer = (state = intialState, action) => {
  switch (action.type) {
    case "CHANGE-MOUSE":
      return {
        ...state,
        mouseCoords: action.mouseCoords,
        polygonData: action.polygonData,
        activePolygonColor: action.activePolygonColor,
      };

    default:
      return state;
  }
};
