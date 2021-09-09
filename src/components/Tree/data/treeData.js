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

export const caliTest = caliData.objects.convert.geometries
  .filter((x) => x.properties.NA_L1CODE === "7")
  .map((x) => x.properties);

export const groups = group(
  caliTest,
  (d) => d.L1_KEY,
  (d) => d.L2_KEY,
  (d) => d.L3_KEY
);
export const root = hierarchy(groups);
console.log(root);
