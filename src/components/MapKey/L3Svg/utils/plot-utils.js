import { select } from "d3";

export const getL3SvgSelections = (l3RegionCode, l3SvgDim) => {
  return {
    l3Group:
      l3SvgDim > 150
        ? select(`#l3-group-${l3RegionCode}`)
        : select(`#l3-group-${l3RegionCode}-key`),
    l4Group:
      l3SvgDim > 150
        ? select(`#l4-group-${l3RegionCode}`)
        : select(`#l4-group-${l3RegionCode}-key`),
    mapOutlineBlur:
      l3SvgDim > 150
        ? select(`#outline-blur-${l3RegionCode}`)
        : select(`#outline-blur-${l3RegionCode}-key`),
  };
};
