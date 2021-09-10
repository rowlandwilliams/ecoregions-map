import { caliData } from "../../Map/data/caliData";
import { group, hierarchy, rollup, nest } from "d3";

export const treeData = [
  {
    name: "Top Level",
    parent: "null",
    children: [
      {
        name: "Level 2: A",
        parent: "Top Level",
        children: [
          {
            name: "Son of A",
            parent: "Level 2: A",
          },
          {
            name: "Daughter of A",
            parent: "Level 2: A",
          },
        ],
      },
      {
        name: "Level 2: B",
        parent: "Top Level",
      },
    ],
  },
];

const properties = caliData.objects.convert.geometries.map((x) => x.properties);
console.log(properties);

const seen = new Set();

const filteredCaliData = properties.filter((el) => {
  const duplicate = seen.has(el.L4_KEY);
  seen.add(el.L4_KEY);
  return !duplicate;
});

export const groups = group(
  filteredCaliData,
  // (d) => d.L1_KEY,
  (d) => d.L2_KEY,
  (d) => d.L3_KEY
);

export const root = hierarchy(groups);
