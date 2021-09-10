import { tree } from "d3-hierarchy";
import { select, linkHorizontal } from "d3";
import { useEffect } from "react/cjs/react.development";
import { groupByName, root } from "./data/treeData";

export const Tree = () => {
  useEffect(() => {
    var treemap = tree().size([window.innerWidth, window.innerHeight]);

    const final = treemap(root);
    const nodesGroup = select("#nodes");
    const linksGroup = select("#links");

    nodesGroup
      .selectAll("circle.node")
      .data(final.descendants())
      .join("circle")
      .classed("node", true)
      .attr("cx", function (d) {
        return d.y;
      })
      .attr("cy", function (d) {
        return d.x;
      })
      .attr("r", 2)
      .on("mouseover", (event, d) => console.log(d.data));

    linksGroup
      .selectAll("line")
      .data(final.links())
      .join("path")
      .attr(
        "d",
        linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x)
      )
      .attr("stroke", "grey")
      .attr("fill", "none");

    nodesGroup
      .selectAll("text")
      .data(final.descendants())
      .join("text")
      .attr("x", function (d) {
        return d.children ? -13 : d.y + 5;
      })
      .attr("dy", function (d) {
        return d.children ? ".35em" : d.x + 2;
      })
      .text((d) => (d.children ? d.data[0] : d.data.L4_KEY))
      .attr("font-size", "0.5rem");
    // .each((d) => (d.children ? console.log(d.data) : console.log(d)));

    // .attr("x", function (d) {
    //   return d.children ? -13 : 13;
    // })
    // .style("text-anchor", function (d) {
    //   return d.children ? "end" : "start";
    // })
    // .text("suh")
    // .style("fill", "red");
  });
  return (
    <>
      <g id="nodes"></g>
      <g id="links"></g>
    </>
  );
};
