import { Map } from "./Map/Map";

export const SVG = () => {
  return (
    <div>
      <svg
        width="100%"
        height={window.innerHeight}
        // viewBox={"0, 0, " + window.innerWidth + "," + window.innerHeight}
        id="map-svg"
      >
        <rect width="100%" height="100%" fill="#fffbdb"></rect>
        <Map />
      </svg>
    </div>
  );
};
