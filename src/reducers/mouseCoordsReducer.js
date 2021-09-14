const intialState = { x: null, y: null };

export const mouseCoordsReducer = (state = intialState, action) => {
  switch (action.type) {
    case "CHANGE-MOUSE":
      return action.mouseCoords;

    default:
      return state;
  }
};
