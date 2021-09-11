import { useEffect } from "react";
import { drawMap } from "./utils/plot-utils";

export const Map = () => {
  useEffect(() => {
    drawMap();
  });

  return (
    <>
      <g>
        <path id="map-outline-blur"></path>
        <g id="l4-group"></g>
        <g id="l3-group"></g>
        <path id="map-outline-solid"></path>
      </g>
    </>
  );
};
