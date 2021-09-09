import { Map } from "../Map/Map";
import { Tree } from "../Tree/Tree";

const a4Width = 3508;
const a4Height = 2480;

export const SVG = () => {
  return (
    <svg width={a4Width} height={a4Height} id="map-svg">
      {/* <Map /> */}
      <Tree />
    </svg>
  );
};
