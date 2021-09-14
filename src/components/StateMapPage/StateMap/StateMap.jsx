import { useEffect } from "react";
import { useSelector } from "react-redux";
import { drawMap, homeMapDims } from "./utils/plot-utils";

export const StateMap = () => {
  useEffect(() => {
    drawMap();
  }, []);

  const { activePolygonColor } = useSelector((state) => state).tooltipData;

  return (
    <svg width="100%" height={homeMapDims[1]} id="map-svg">
      <defs>
        <pattern
          id="hash"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)"
        >
          <rect
            width="4"
            height="8"
            transform="translate(0,0)"
            fill={activePolygonColor}
          ></rect>
        </pattern>
      </defs>
      <g>
        <g>
          <path id="continent-outline-blur"></path>
          <path id="continent-outline"></path>
          <path id="continent-outline-fill"></path>
          <path id="us-states"></path>
          <path id="mexico-group"></path>
        </g>
        <g id="state-map-group" className="cursor-pointer">
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
