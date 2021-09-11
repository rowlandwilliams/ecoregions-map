import { useEffect } from "react/cjs/react.development";
import { drawTree } from "./utils/plot-utils";

export const Tree = (props) => {
  const { shortestDimension } = props;

  useEffect(() => {
    drawTree(shortestDimension / 2.2);
  });
  return (
    <g
      transform={
        "translate(" +
        window.innerWidth / 2 +
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
