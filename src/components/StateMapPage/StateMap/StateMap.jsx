import { useEffect } from "react";
import { drawMap } from "./utils/plot-utils";

export const StateMap = () => {
  useEffect(() => {
    drawMap();
  });

  return (
    <svg width="100%" height={window.innerHeight} id="map-svg">
      <g>
        <path id="map-outline-blur"></path>
        <g id="l4-group"></g>
        <g id="l3-group"></g>
        <path id="map-outline-solid"></path>
      </g>
    </svg>
  );
};
