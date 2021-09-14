export const setStateMapIsHovered = (isStateMapHovered) => ({
  type: "CHANGE-STATE-MAP-HOVER",
  stateMapIsHovered: isStateMapHovered,
});

export const setTooltipData = (coords, polygonData, activePolygonColor) => ({
  type: "CHANGE-MOUSE",
  mouseCoords: coords,
  polygonData: polygonData,
  activePolygonColor: activePolygonColor,
});
