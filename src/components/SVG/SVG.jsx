import { useEffect, useRef, useState } from "react";
import { Tree } from "../Tree/Tree";

export const SVG = () => {
  const parentRef = useRef(null);

  const [svgWidth, setSvgWidth] = useState(0);
  const [svgHeight, setSvgHeight] = useState(0);
  const [shortestDimension, setShortestDimension] = useState(0);

  const setDimensions = (current) => {
    setSvgWidth(current.offsetWidth);
    setSvgHeight(current.offsetHeight);
    current.offsetWidth > current.offsetHeight
      ? setShortestDimension(svgHeight)
      : setShortestDimension(svgWidth);
  };

  useEffect(() => {
    const { current } = parentRef;
    if (current) {
      setDimensions(current);
    }
  });

  return (
    <div className="w-full h-screen" ref={parentRef}>
      <svg viewBox={"0, 0, " + svgWidth + ", " + svgHeight} id="map-svg">
        <Tree
          shortestDimension={shortestDimension}
          svgWidth={svgWidth}
          svgHeight={svgHeight}
        />
      </svg>
    </div>
  );
};
