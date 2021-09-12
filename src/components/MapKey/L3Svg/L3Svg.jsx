import { geoMercator, geoPath } from "d3";
import { useEffect } from "react";
import { feature, merge } from "topojson-client";
import { caliData } from "../../SVG/Map/data/caliData";
import { getL3SvgSelections } from "./utils/plot-utils";
import { plotLevel4Polygons } from "../../SVG/Map/utils/plot-utils";

const polygons = feature(caliData, caliData.objects.convert);

export const L3Svg = (props) => {
  const { l3RegionCode } = props;

  const mergedL3Region = merge(
    caliData,
    caliData.objects.convert.geometries.filter(
      (x) => x.properties.US_L3CODE === l3RegionCode
    )
  );

  // sclae projection to l3Region
  const projection = geoMercator().fitSize([150, 150], mergedL3Region);

  const l3SvgGenerator = geoPath().projection(projection);

  useEffect(() => {
    const { l3Group, l4Group, mapOutlineBlur } =
      getL3SvgSelections(l3RegionCode);

    const filteredPolygons = polygons.features.filter(
      (feature) => feature.properties.US_L3CODE === l3RegionCode
    );

    plotLevel4Polygons(l4Group, filteredPolygons, l3SvgGenerator);

    l3Group
      .selectAll("path")
      .data(l3RegionCode)
      .join("path")
      .attr("class", (d) => d)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("d", (d) => l3SvgGenerator(mergedL3Region));

    mapOutlineBlur
      .join("path")
      .attr("stroke", "grey")
      .attr("stroke-opacity", 0.15)
      .attr("fill", "none")
      .attr("stroke-width", 10)
      .attr("d", (d) => l3SvgGenerator(mergedL3Region));
  });

  return (
    <svg width="150px" height="150px" className="mr-8">
      <g id={`l4-group-${l3RegionCode}`}></g>
      <g id={`l3-group-${l3RegionCode}`}></g>
      <path id={`outline-blur-${l3RegionCode}`}></path>
    </svg>
  );
};
