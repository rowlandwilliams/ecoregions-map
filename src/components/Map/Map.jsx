import { useEffect, useRef, useState } from "react";
import { drawMap } from "./utils/plot-utils";

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
    <>
      <rect width="100%" height="100%" fill="white" stroke="black"></rect>
      <path id="map-outline-blur"></path>
      <g id="l4-group"></g>
      <g id="l3-group"></g>
      <path id="map-outline-solid"></path>
    </>
  );
};
