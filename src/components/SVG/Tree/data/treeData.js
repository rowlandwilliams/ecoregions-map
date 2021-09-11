import { caliData } from "../../Map/data/caliData";
import { group, hierarchy } from "d3";

export const properties = caliData.objects.convert.geometries.map(
  (x) => x.properties
);

const seen = new Set();

export const filteredCaliData = properties.filter((el) => {
  const duplicate = seen.has(el.L4_KEY);
  seen.add(el.L4_KEY);
  return !duplicate;
});

export const groups = group(filteredCaliData, (d) => d.US_L3CODE);

export const root = hierarchy(groups);
