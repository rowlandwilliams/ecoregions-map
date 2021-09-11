import { caliData } from "../../Map/data/caliData";
import { group, hierarchy } from "d3";

const properties = caliData.objects.convert.geometries.map((x) => x.properties);

const seen = new Set();

export const filteredCaliData = properties.filter((el) => {
  const duplicate = seen.has(el.L4_KEY);
  seen.add(el.L4_KEY);
  return !duplicate;
});

export const groups = group(
  filteredCaliData,
  // (d) => d.L1_KEY,
  (d) => d.L3_KEY
);

export const root = hierarchy(groups);
