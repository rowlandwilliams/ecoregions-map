import { useEffect, useRef, useState } from "react";
import { caliData } from "./data/caliData";
import { select, geoMercator, geoPath } from "d3";
import { feature, mesh, merge } from "topojson-client";
import randomColor from "randomcolor";

const l4Column = "US_L4CODE";
const l3Column = "US_L3CODE";

const l4Codes = [
  ...new Set(
    caliData.objects.convert.geometries.map((x) => x.properties[l4Column])
  ),
];

const l3Codes = [
  ...new Set(
    caliData.objects.convert.geometries.map((x) => x.properties[l3Column])
  ),
];

console.log(l3Codes);

const colors = [];
l4Codes.forEach((code) =>
  colors.push({
    code: code,
    color: randomColor({
      luminosity: "bright",
      format: "rgb", // e.g. 'rgb(225,200,20)'
    }),
  })
);

export const Map = () => {
  const parentRef = useRef(null);
  const [width, setWidth] = useState(0);
  const handleWindowResize = (current) => {
    setWidth(current.offsetWidth);
  };

  useEffect(() => {
    const { current } = parentRef;
    if (current) {
      handleWindowResize(current);
      window.addEventListener("resize", () => handleWindowResize(current));
      return () =>
        window.removeEventListener("resize", () => handleWindowResize(current));
    }
  }, [parentRef]);

  useEffect(() => {
    const l4Group = select("#map-group");
    const outline = select("#outline");
    const l3Group = select("#l3-group");
    const projection = geoMercator().center([-122, 37]).scale(4500);

    const pathGenerator = geoPath().projection(projection);
    const polygons = feature(caliData, caliData.objects.convert);

    l4Group
      .selectAll("path")
      .data(polygons.features)
      .join("path")
      .attr(
        "fill",
        (d) =>
          colors.filter((color) => color.code === d.properties[l4Column])[0]
            .color
      )
      .attr("opacity", 0.8)
      .attr("stroke", "grey")
      .attr("stroke-opacity", 0.4)
      .attr("d", pathGenerator);

    l3Group
      .selectAll("g")
      .data(l3Codes)
      .enter()
      .append("g")
      .attr("class", (d) => d)
      .append("path")
      .attr("stroke", "black")
      .attr("stroke-opacity", 0.6)
      .attr("fill", "none")
      .attr("stroke-width", 1)
      .attr("d", (d) =>
        pathGenerator(
          merge(
            caliData,
            caliData.objects.convert.geometries.filter(
              (x) => x.properties.US_L3CODE === d
            )
          )
        )
      );

    outline
      .join("path")
      .attr("stroke", "black")
      .attr("stroke-opacity", 1)
      .attr("fill", "none")
      .attr("stroke-width", 2)
      .attr(
        "d",
        pathGenerator(
          mesh(caliData, caliData.objects.convert, function (a, b) {
            return a === b;
          })
        )
      );
  });

  return (
    <div className="w-full h-screen" ref={parentRef}>
      <svg width={width} height="100%" id="map-svg">
        <g
          id="map-group"
          transform={"translate(0," + window.innerHeight / 4 + ")"}
        ></g>
        <g
          id="l3-group"
          transform={"translate(0," + window.innerHeight / 4 + ")"}
        ></g>
        <path
          id="outline"
          transform={"translate(0," + window.innerHeight / 4 + ")"}
        ></path>
      </svg>
    </div>
  );
};
