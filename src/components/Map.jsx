import { useEffect, useRef, useState } from "react";
import { drawMap } from "./utils/plot-utils";

const a4Width = 3508;
const a4Height = 2480;

export const Map = () => {
  const parentRef = useRef(null);
  const [width, setWidth] = useState(0);
  const handleWindowResize = (current) => {
    setWidth(current.offsetWidth);
  };

  useEffect(() => {
    const { current } = parentRef;
    if (current) {
      handleWindowResize(current);
      window.addEventListener("resize", () => handleWindowResize(current));
      return () =>
        window.removeEventListener("resize", () => handleWindowResize(current));
    }
  }, [parentRef]);

  useEffect(() => {
    drawMap();
  });

  return (
    <div className="w-full h-screen m-4" ref={parentRef}>
      <svg width={a4Width} height={a4Height} id="map-svg">
        <rect width="100%" height="100%" fill="white" stroke="black"></rect>
        <path id="map-outline-blur"></path>
        <g id="l4-group"></g>
        <g id="l3-group"></g>
        <path id="map-outline-solid"></path>
      </svg>
    </div>
  );
};
