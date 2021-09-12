import { select } from "d3";

export const getL3SvgSelections = (l3RegionCode) => {
  return {
    l3Group: select(`#l3-group-${l3RegionCode}`),
    l4Group: select(`#l4-group-${l3RegionCode}`),
    mapOutlineBlur: select(`#outline-blur-${l3RegionCode}`),
  };
};
