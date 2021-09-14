import { select, geoMercator, geoPath, polygonArea } from "d3";
import { feature, merge, mesh } from "topojson-client";
import { caliData } from "../data/caliData";
import { mexicoOutline } from "../data/mexicoOutline";
import { usData } from "../data/usData";
import { usMexico } from "../data/usMexico";
import { usStatesInnerOutlines } from "../data/usStatesInnerOutlines";
import { l4Colors } from "./colors";
import { l3Codes, l4Column } from "./utils";
import { caliRivers } from "../data/caliRivers";
import { store } from "../../../../index";
import {
  setMouseCoords,
  setStateMapIsHovered,
  setTooltipData,
} from "../../../../actions";

const mexicoGreen = "#e7ffe3";
const outlineGrey = "#808080";
const riverBlue = "#11cff5";
const stateCream = "#FFFBEB";

const getMapSelections = () => {
  return {
    continentOutlineBlur: select("#continent-outline-blur"),
    continentOutlineFill: select("#continent-outline-fill"),
    continentOutline: select("#continent-outline"),
    usOutlinePath: select("#us-outline"),
    usStatesPath: select("#us-states"),
    mexGroup: select("#mexico-group"),
    caliRiversGroup: select("#cali-rivers"),
    l4Group: select("#l4-group-polygons"),
    l4GroupText: select("#l4-group-text"),
    l3Group: select("#l3-group"),
    stateMapOutlineSolid: select("#state-outline-solid"),
    stateMapOutlineBlur: select("#map-outline-blur"),
  };
};

export const homeMapDims = [window.innerWidth, window.innerHeight * 2];

// define projections, state polygons and path generator
const statePolygons = feature(caliData, caliData.objects.convert);
const riverPolygons = feature(caliRivers, caliRivers.objects.MajorRivers);

const padding = 50;

const projection = geoMercator().fitExtent(
  [
    [padding / 2, 0],
    [homeMapDims[0] * 0.9 - padding / 2, homeMapDims[1] - padding],
  ],
  statePolygons
);

const pathGenerator = geoPath().projection(projection);
const l4PathCoords = [];

const plotBaseMaps = (
  continentOutlineBlur,
  continentOutlineFill,
  continentOutline,
  usStatesPath,
  usOutlinePath,
  mexGroup,
  caliRiversGroup
) => {
  continentOutlineBlur
    .join("path")
    .attr("d", pathGenerator(usMexico))
    .attr("fill", stateCream)
    .attr("stroke", "black")
    .attr("stroke-width", 20)
    .attr("stroke-opacity", 0.1);

  continentOutline
    .join("path")
    .attr("d", pathGenerator(usMexico))
    .attr("fill", "none")
    .attr("stroke", outlineGrey)
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.6);

  continentOutlineFill
    .join("path")
    .attr("d", pathGenerator(usMexico))
    .attr("fill", "#FFFBEB")
    .attr("stroke", "none");

  usOutlinePath
    .join("path")
    .attr("fill", "none")
    .attr("stroke", outlineGrey)
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.6)
    .attr(
      "d",
      pathGenerator(
        mesh(usData, usData.objects.states, function (a, b) {
          return a !== b;
        })
      )
    );

  usStatesPath
    .join("path")
    .attr("fill", "none")
    .attr("stroke", outlineGrey)
    .attr("stroke-width", 0.5)
    .attr("d", pathGenerator(usStatesInnerOutlines));

  mexGroup
    .join("path")
    .attr("d", pathGenerator(mexicoOutline))
    .attr("fill", mexicoGreen)
    .attr("stroke", outlineGrey)
    .attr("stroke-width", 1.5)
    .attr("stroke-opacity", 0.6);

  caliRiversGroup
    .selectAll("path")
    .data(riverPolygons.features)
    .join("path")
    .attr("stroke", riverBlue)
    .attr("stroke-width", 1)
    .attr("d", pathGenerator);
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

const setStateMapMouseInteraction = () => {
  const stateMapGroup = select("#state-map-group");

  stateMapGroup
    .on("mouseenter", () => store.dispatch(setStateMapIsHovered(true)))
    .on("mouseleave", () => store.dispatch(setStateMapIsHovered(false)));
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
    .style("pointer-events", "all")
    .attr("stroke", "black")
    .attr("stroke-width", 0.5)
    .attr("stroke-opacity", 0.6)
    .attr("d", pathGenerator)
    .each((d) => {
      l4PathCoords[d.properties.OBJECTID] = pathGenerator.centroid(d);
    })
    .on("mouseover", (event) => {
      event.currentTarget.setAttribute("fill", "url(#hash)");
      event.currentTarget.setAttribute("stroke-opacity", 1);
    })
    .on("mouseleave", (event, d) => {
      event.currentTarget.setAttribute(
        "fill",
        l4Colors.filter((color) => color.code === d.properties[l4Column])[0]
          .color
      );
      event.currentTarget.setAttribute("stroke-opacity", 0.6);
    })
    .on("mousemove", (event, d) => {
      store.dispatch(
        setTooltipData(
          [event.pageX, event.pageY],
          d.properties,
          l4Colors.filter((color) => color.code === d.properties[l4Column])[0]
            .color
        )
      );
    });
};

const minAreaForText = 25761156 * 5;
const plotLevel4PolygonsText = (l4GroupText, polygons) => {
  const textGroups = l4GroupText
    .selectAll("g")
    .data(
      polygons.filter(
        (polygon) => polygon.properties.Shape_Area > minAreaForText
      )
    )
    .join("g")
    .attr(
      "transform",
      (d) =>
        "translate(" +
        l4PathCoords[d.properties.OBJECTID][0] +
        ", " +
        l4PathCoords[d.properties.OBJECTID][1] +
        ")"
    )
    .attr("width", 20)
    .attr("height", 20);

  textGroups
    .append("text")
    .text((d) => d.properties.US_L4CODE)
    .attr("font-size", "0.7rem")
    .attr("x", -10);
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
    continentOutlineBlur,
    continentOutline,
    continentOutlineFill,
    usOutlinePath,
    usStatesPath,
    mexGroup,
    stateMapOutlineBlur,
    l4Group,
    l4GroupText,
    l3Group,
    stateMapOutlineSolid,
    caliRiversGroup,
  } = getMapSelections();

  plotBaseMaps(
    continentOutlineBlur,
    continentOutlineFill,
    continentOutline,
    usStatesPath,
    usOutlinePath,
    mexGroup,
    caliRiversGroup
  );
  plotBlurredMapOutline(stateMapOutlineBlur, pathGenerator);
  plotLevel4Polygons(l4Group, statePolygons.features, pathGenerator);

  plotLevel4PolygonsText(l4GroupText, statePolygons.features);
  plotLevel3PolygonOutlines(l3Group, pathGenerator);
  plotSolidMapOutline(stateMapOutlineSolid, pathGenerator);
  setStateMapMouseInteraction();
};
