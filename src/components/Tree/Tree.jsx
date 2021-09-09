import { tree } from "d3-hierarchy";
import { select } from "d3";
import { useEffect } from "react/cjs/react.development";
import { groupByName, root } from "./data/treeData";

export const Tree = () => {
  useEffect(() => {
    var treemap = tree().size([400, 500]);

    const final = treemap(root);
    const nodesGroup = select("#nodes");
    const linksGroup = select("#links");

    nodesGroup
      .selectAll("circle.node")
      .data(final.descendants())
      .join("circle")
      .classed("node", true)
      .attr("cx", function (d) {
        return d.x;
      })
      .attr("cy", function (d) {
        return d.y;
      })
      .attr("r", 4)
      .on("mouseover", (event, d) => console.log(d.data));
    linksGroup
      .selectAll("line")
      .data(final.links())
      .join("line")
      .attr("x1", function (d) {
        return d.source.x;
      })
      .attr("y1", function (d) {
        return d.source.y;
      })
      .attr("x2", function (d) {
        return d.target.x;
      })
      .attr("y2", function (d) {
        return d.target.y;
      })
      .attr("stroke", "green");
  });
  return (
    <>
      <g id="nodes"></g>
      <g id="links"></g>
    </>
  );
};
