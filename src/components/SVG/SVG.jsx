import { Tree } from "../Tree/Tree";
// 7016 x 4961 px

export const SVG = () => {
  return (
    <svg width={window.innerWidth} height={window.innerHeight} id="map-svg">
      <rect width="100%" height="100%" fill="#fff6c7"></rect>

      <Tree />
    </svg>
  );
};
