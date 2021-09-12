import { geoMercator, geoPath } from "d3";
import { useEffect } from "react";
import { feature, merge } from "topojson-client";
import { caliData } from "../../SVG/Map/data/caliData";
import { getL3SvgSelections } from "./utils/plot-utils";
import { plotLevel4Polygons } from "../../SVG/Map/utils/plot-utils";

const polygons = feature(caliData, caliData.objects.convert);
// const l3SvgDim = 110;

export const L3Svg = (props) => {
  const { l3RegionCode, l3SvgDim, svgPadding } = props;

  const mergedL3Region = merge(
    caliData,
    caliData.objects.convert.geometries.filter(
      (x) => x.properties.US_L3CODE === l3RegionCode
    )
  );

  // sclae projection to l3Region
  const projection = geoMercator().fitExtent(
    [
      [svgPadding, svgPadding],
      [l3SvgDim - svgPadding, l3SvgDim - svgPadding],
    ],
    mergedL3Region
  );

  const l3SvgGenerator = geoPath().projection(projection);

  useEffect(() => {
    const { l3Group, l4Group, mapOutlineBlur } = getL3SvgSelections(
      l3RegionCode,
      l3SvgDim
    );

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
    <svg width={l3SvgDim} height={l3SvgDim} className="mr-8">
      {/* <rect width="100%" height="100%" fill="none" stroke="black"></rect> */}
      <g
        id={
          l3SvgDim > 150
            ? `l4-group-${l3RegionCode}`
            : `l4-group-${l3RegionCode}-key`
        }
      ></g>
      <g
        id={
          l3SvgDim > 150
            ? `l3-group-${l3RegionCode}`
            : `l3-group-${l3RegionCode}-key`
        }
      ></g>
      <path
        id={
          l3SvgDim > 150
            ? `outline-blur-${l3RegionCode}`
            : `outline-blur-${l3RegionCode}-key`
        }
      ></path>
    </svg>
  );
};
