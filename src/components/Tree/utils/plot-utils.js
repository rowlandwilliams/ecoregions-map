import { select, tree, linkRadial } from "d3";
import { root } from "../data/treeData";
import { getNodeColorFromDepth, transformTreeText } from "./tree-helpers";

const linkColor = "grey";

const getTreeSelections = () => {
  return {
    nodesGroup: select("#nodes"),
    linksGroup: select("#links"),
    textGroup: select("#text"),
  };
};

const getTreeData = (radius) => {
  var treemap = tree()
    .size([2 * Math.PI, radius])
    .separation((a, b) => (a.parent === b.parent ? 1 : 2) / a.depth);
  return treemap(root);
};

const plotTreeNodes = (nodesGroup) => {
  nodesGroup
    .selectAll("circle")
    .data(root.descendants())
    .join("circle")
    .attr(
      "transform",
      (d) => `
        rotate(${(d.x * 180) / Math.PI - 90})
        translate(${d.y},0)
      `
    )
    .attr("opacity", (d) => d.depth === 0 && 0)
    .attr("fill", (d) => getNodeColorFromDepth(d))
    .attr("r", (d) => (d.depth > 1 ? 3 : 6))
    .attr("stroke", linkColor)
    .attr("stroke-width", (d) => (d.depth > 1 ? 0 : 2));
};

const plotTreeLinks = (linksGroup, treeData) => {
  linksGroup
    .selectAll("line")
    .data(treeData.links())
    .join("path")
    .attr(
      "d",
      linkRadial()
        .angle((d) => d.x)
        .radius((d) => d.y)
    )
    .attr("stroke", linkColor)
    .attr("opacity", 0.8)
    .attr("fill", "none");
};

const plotTreeText = (textGroup) => {
  return textGroup
    .selectAll("text")
    .data(root.descendants())
    .join("text")
    .attr("transform", (d) => transformTreeText(d))
    .attr("dy", "0.31em")
    .attr("x", (d) => (d.x < Math.PI && !d.children ? 6 : -6))
    .attr("text-anchor", (d) => (d.x < Math.PI ? "start" : "end"))
    .text((d) => d.data.US_L4CODE)
    .attr("font-size", "0.75rem");
};

export const drawTree = (radius) => {
  const { nodesGroup, linksGroup, textGroup } = getTreeSelections();

  const treeData = getTreeData(radius);

  plotTreeNodes(nodesGroup);

  plotTreeLinks(linksGroup, treeData);

  plotTreeText(textGroup);
};
