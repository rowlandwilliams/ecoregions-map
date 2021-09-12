import {  l3Regions, l4Colors } from "../../Map/utils/colors";

export const getNodeColorFromDepth = (d) => {
  if (d.depth === 1) {
    const filt = l3Regions.filter(
      (colorObject) => colorObject.code === d.data[0]
    );
    return filt[0].color;
  }

  const filt = l4Colors.filter(
    (colorObject) => colorObject.code === d.data.US_L4CODE
  );
  return filt.length > 0 ? filt[0].color : null;
};

export const transformTreeText = (d) => {
  const rotate1 = "rotate(" + ((d.x * 180) / Math.PI - 90) + ")";
  const translate = "translate(" + d.y + ",0)";
  const rotate2 = "rotate(" + (d.x >= Math.PI ? 180 : 0) + ")";
  return rotate1 + " " + translate + " " + rotate2;
};
