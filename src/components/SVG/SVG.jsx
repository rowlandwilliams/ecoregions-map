import { Map } from "../Map/Map";
import { Tree } from "../Tree/Tree";

const a4Width = 3508;
const a4Height = 2480;

export const SVG = () => {
  return (
    <svg width={window.innerWidth} height={window.innerHeight * 2} id="map-svg">
      {/* <Map /> */}
      <Tree />
    </svg>
  );
};
