import { select, tree, linkRadial } from "d3";
import { l4Colors } from "../../Map/utils/colors";
import { root } from "../data/treeData";

const width = window.innerWidth / 2;
const radius = width / 1.8;

const getTreeSelections = () => {
  return {
    nodesGroup: select("#nodes"),
    linksGroup: select("#links"),
    textGroup: select("#text"),
  };
};

const getTreeData = () => {
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
    .attr("fill", (d) => {
      const filt = l4Colors.filter(
        (colorObject) => colorObject.code === d.data.US_L4CODE
      );
      return filt.length > 0 ? filt[0].color : "black";
    })
    .attr("r", 3);
};

const plotTreeLinks = (linksGroup, treeData) => {
  return linksGroup
    .selectAll("line")
    .data(treeData.links())
    .join("path")
    .attr(
      "d",
      linkRadial()
        .angle((d) => d.x)
        .radius((d) => d.y)
    )
    .attr("stroke", "grey")
    .attr("opacity", 0.5)
    .attr("fill", "none");
};

const transformTreeText = (d) => {
  const rotate1 = "rotate(" + ((d.x * 180) / Math.PI - 90) + ")";
  const translate = "translate(" + d.y + ",0)";
  const rotate2 = "rotate(" + (d.x >= Math.PI ? 180 : 0) + ")";
  return rotate1 + " " + translate + " " + rotate2;
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
    .attr("font-size", "0.5rem");
};

export const drawTree = () => {
  const { nodesGroup, linksGroup, textGroup } = getTreeSelections();

  const treeData = getTreeData();

  plotTreeNodes(nodesGroup);

  plotTreeLinks(linksGroup, treeData);

  plotTreeText(textGroup);
};
