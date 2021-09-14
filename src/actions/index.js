export const setStateMapIsHovered = (isStateMapHovered) => ({
  type: "CHANGE-STATE-MAP-HOVER",
  stateMapIsHovered: isStateMapHovered,
});

export const setMouseCoords = (coords) => ({
  type: "CHANGE-MOUSE",
  mouseCoords: coords,
});
