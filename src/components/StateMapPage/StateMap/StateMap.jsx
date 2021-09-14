import { useEffect } from "react";
import { drawMap } from "./utils/plot-utils";

export const StateMap = () => {
  useEffect(() => {
    drawMap();
  }, []);

  return (
    <svg width="100%" height={window.innerHeight * 2} id="map-svg">
      <g>
        <g>
          <path id="continent-outline-blur"></path>
          <path id="continent-outline"></path>
          <path id="continent-outline-fill"></path>
          <path id="us-states"></path>
          <path id="mexico-group"></path>
        </g>
        <g id="state-map-group">
          <g id="l4-group-polygons"></g>
          <g id="l4-group-text"></g>
          <g id="l3-group"></g>
          <path id="us-outline"></path>
          <g id="cali-rivers"></g>
          <path id="state-outline-solid"></path>
        </g>
      </g>
    </svg>
  );
};
