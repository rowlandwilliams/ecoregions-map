export const setStateMapIsHovered = (isStateMapHovered) => ({
  type: "CHANGE-STATE-MAP-HOVER",
  stateMapIsHovered: isStateMapHovered,
});

export const setTooltipData = (coords, polygonData) => ({
  type: "CHANGE-MOUSE",
  mouseCoords: coords,
  polygonData: polygonData,
});
