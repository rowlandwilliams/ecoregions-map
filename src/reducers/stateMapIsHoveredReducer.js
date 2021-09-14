const intialState = false;

export const stateMapIsHoveredReducer = (state = intialState, action) => {
  switch (action.type) {
    case "CHANGE-STATE-MAP-HOVER":
      return action.stateMapIsHovered;

    default:
      return state;
  }
};
