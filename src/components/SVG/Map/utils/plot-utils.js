import { select, geoMercator, geoPath } from "d3";
import { feature, merge, mesh } from "topojson-client";
import { caliData } from "../data/caliData";
import { l4Colors } from "./colors";
import { l3Codes, l4Column } from "./utils";

const getMapSelections = () => {
  return {
    l4Group: select("#l4-group"),
    l3Group: select("#l3-group"),
    mapOutlineSolid: select("#map-outline-solid"),
    mapOutlineBlur: select("#map-outline-blur"),
  };
};

const projection = geoMercator().center([-119.5, 40.3]).scale(5000);

const polygons = feature(caliData, caliData.objects.convert);

const mainMapGenerator = geoPath().projection(projection);

const plotSolidMapOutline = (mapOutlineSolid, pathGenerator) => {
  mapOutlineSolid
    .join("path")
    .attr("stroke", "black")
    .attr("stroke-opacity", 0.1)
    .attr("fill", "none")
    .attr("stroke-width", 4)
    .attr(
      "d",
      pathGenerator(
        mesh(caliData, caliData.objects.convert, function (a, b) {
          return a === b;
        })
      )
    );
};

export const plotLevel4Polygons = (l4Group, polygons, pathGenerator) => {
  l4Group
    .selectAll("path")
    .data(polygons)
    .join("path")
    .attr(
      "fill",
      (d) =>
        l4Colors.filter((color) => color.code === d.properties[l4Column])[0]
          .color
    )
    .attr("fill-opacity", 0.7)
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("stroke-opacity", 0.6)
    .attr("d", pathGenerator);
};

const plotBlurredMapOutline = (mapOutlineBlur, pathGenerator) => {
  mapOutlineBlur
    .join("path")
    .attr("stroke", "grey")
    .attr("stroke-opacity", 0.06)
    .attr("fill", "none")
    .attr("stroke-width", 50)
    .attr(
      "d",
      pathGenerator(
        mesh(caliData, caliData.objects.convert, function (a, b) {
          return a === b;
        })
      )
    );
};

const plotLevel3PolygonOutlines = (l3Group, pathGenerator) => {
  l3Group
    .selectAll("g")
    .data(l3Codes)
    .enter()
    .append("g")
    .attr("class", (d) => d)
    .append("path")
    .attr("stroke", "black")
    .attr("stroke-opacity", 0.8)
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
};

export const drawMap = () => {
  const { mapOutlineBlur, l4Group, l3Group, mapOutlineSolid } =
    getMapSelections();

  plotBlurredMapOutline(mapOutlineBlur, mainMapGenerator);
  plotLevel4Polygons(l4Group, polygons.features, mainMapGenerator);
  plotLevel3PolygonOutlines(l3Group, mainMapGenerator);
  plotSolidMapOutline(mapOutlineSolid, mainMapGenerator);
};
