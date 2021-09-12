import { useEffect } from "react";
import { drawMap } from "./utils/plot-utils";

export const StateMap = () => {
  useEffect(() => {
    drawMap();
  });

  return (
    <svg width="100%" height={window.innerHeight * 2} id="map-svg">
      <g>
        <g id="us-group"></g>
        <path id="mexico-group"></path>
        <g id="l4-group"></g>
        <g id="l3-group"></g>
        <path id="state-outline-solid"></path>
      </g>
    </svg>
  );
};
