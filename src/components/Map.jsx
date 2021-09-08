import { useEffect, useRef, useState } from "react";

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

  return (
    <div className="w-full h-screen m-2" ref={parentRef}>
      <svg width={width} height="100%" id="map-svg"></svg>
    </div>
  );
};
