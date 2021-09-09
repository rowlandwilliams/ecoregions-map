import { useEffect, useRef, useState } from "react";
import { caliData } from "./data/caliData";
import { select, geoMercator, geoPath } from "d3";
import { feature, mesh, merge } from "topojson-client";
import { generateColor, l3Codes, l3Colors } from "./utils";

const l3Column = "US_L3CODE";

const a4Width = 3508;
const a4Height = 2480;

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
    const l4Group = select("#l4-group");
    const l3Group = select("#l3-group");
    const outline = select("#outline");
    const outline2 = select("#outline2");

    const projection = geoMercator().center([-122, 41.5]).scale(10500);

    const pathGenerator = geoPath().projection(projection);
    const polygons = feature(caliData, caliData.objects.convert);

    l4Group
      .selectAll("path")
      .data(polygons.features)
      .join("path")
      .attr("fill", (d) => {
        const filteredColorObj = l3Colors.filter(
          (color) => color.code === d.properties[l3Column]
        )[0];

        return generateColor(
          filteredColorObj.luminosityString,
          filteredColorObj.colorString
        );
      })
      .attr("fill-opacity", 0.8)
      .attr("stroke", "grey")
      .attr("d", pathGenerator);

    outline2
      .join("path")
      .attr("stroke", "grey")
      .attr("stroke-opacity", 0.05)
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

    outline
      .join("path")
      .attr("stroke", "black")
      .attr("stroke-opacity", 0.4)
      .attr("filter", "url(#blur)")
      .attr("fill", "none")
      .attr("stroke-width", 8)
      .attr(
        "d",
        pathGenerator(
          mesh(caliData, caliData.objects.convert, function (a, b) {
            return a === b;
          })
        )
      );

    l3Group
      .selectAll("g")
      .data(l3Codes)
      .enter()
      .append("g")
      .attr("class", (d) => d)
      .append("path")
      .attr("stroke", "#454545")
      .attr("stroke-opacity", 0.8)
      .attr("fill", "none")
      .attr("stroke-width", 2)
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
  });

  return (
    <div className="w-full h-screen m-4" ref={parentRef}>
      <svg width={a4Width} height={a4Height} id="map-svg">
        <defs>
          <filter id="blur">
            <feGaussianBlur stdDeviation="5"></feGaussianBlur>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="white" stroke="black"></rect>
        <path id="outline2"></path>
        <path id="outline"></path>

        <g id="l4-group">
          {/* <rect width="100%" height="100%" fill="grey"></rect> */}
        </g>
        <g id="l3-group"></g>
      </svg>
    </div>
  );
};
