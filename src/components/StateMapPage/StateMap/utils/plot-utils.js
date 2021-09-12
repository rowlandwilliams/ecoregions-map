import { select, geoMercator, geoPath } from "d3";
import { feature, merge, mesh } from "topojson-client";
import { caliData } from "../data/caliData";
import { mexicoOutline } from "../data/mexicoOutline";
import { statesData } from "../data/statesData";
import { l4Colors } from "./colors";
import { l3Codes, l4Column } from "./utils";

const getMapSelections = () => {
  return {
    usGroup: select("#us-group"),
    mexGroup: select("#mexico-group"),
    l4Group: select("#l4-group"),
    l3Group: select("#l3-group"),
    stateMapOutlineSolid: select("#state-outline-solid"),
    stateMapOutlineBlur: select("#map-outline-blur"),
  };
};

// define projections, state polygons and path generator
const statePolygons = feature(caliData, caliData.objects.convert);

const projection = geoMercator().fitExtent(
  [
    [50, -200],
    [window.innerWidth * 0.8, window.innerHeight * 2],
  ],
  statePolygons
);
const pathGenerator = geoPath().projection(projection);

const plotBaseMaps = (statesGroup, mexGroup) => {
  statesGroup
    .selectAll("path")
    .data(statesData.features)
    .join("path")
    .attr("fill", "white")
    .attr("fill-opacity", 0.5)
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("stroke-opacity", 0.6)
    .attr("d", pathGenerator);

  mexGroup
    .join("path")
    .attr("d", pathGenerator(mexicoOutline))
    .attr("fill", "transparent")
    .style("stroke", "#333");
};

const plotSolidMapOutline = (mapOutlineSolid, pathGenerator) => {
  mapOutlineSolid
    .join("path")
    .attr("stroke", "black")
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
  const {
    usGroup,
    mexGroup,
    stateMapOutlineBlur,
    l4Group,
    l3Group,
    stateMapOutlineSolid,
  } = getMapSelections();

  plotBaseMaps(usGroup, mexGroup);
  plotBlurredMapOutline(stateMapOutlineBlur, pathGenerator);
  plotLevel4Polygons(l4Group, statePolygons.features, pathGenerator);
  plotLevel3PolygonOutlines(l3Group, pathGenerator);
  plotSolidMapOutline(stateMapOutlineSolid, pathGenerator);
};
