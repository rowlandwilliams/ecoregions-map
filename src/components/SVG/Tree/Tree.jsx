import { useEffect } from "react/cjs/react.development";
import { drawTree } from "./utils/plot-utils";

export const Tree = (props) => {
  const { shortestDimension } = props;
  const radius = shortestDimension / 2.4;
  useEffect(() => {
    drawTree(radius);
  });
  return (
    <g
      transform={
        "translate(" +
        (window.innerWidth / 2 + radius) +
        "," +
        window.innerHeight / 2 +
        ")"
      }
    >
      <g id="links"></g>
      <g id="nodes"></g>
      <g id="text" className="text-lg"></g>
    </g>
  );
};
