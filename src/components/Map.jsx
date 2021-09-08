import { useEffect, useRef, useState } from "react";
import { caliData } from "./data/caliData";
import { select, geoMercator, geoPath } from "d3";
import { feature, mesh } from "topojson-client";
import randomColor from "randomcolor";

const column = "US_L4CODE";

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

  const l3Codes = [
    ...new Set(
      caliData.objects.convert.geometries.map((x) => x.properties[column])
    ),
  ];

  const colors = [];
  l3Codes.forEach((code) =>
    colors.push({
      code: code,
      color: randomColor({
        luminosity: "bright",
        format: "rgb", // e.g. 'rgb(225,200,20)'
      }),
    })
  );

  useEffect(() => {
    const mapGroup = select("#map-group");
    const outline = select("#outline");

    const projection = geoMercator().center([-122, 37]).scale(4500);

    const pathGenerator = geoPath().projection(projection);
    const countries = feature(caliData, caliData.objects.convert);

    mapGroup
      .selectAll("path")
      .data(countries.features)
      .join("path")
      .attr(
        "fill",
        (d) =>
          colors.filter((color) => color.code === d.properties[column])[0].color
      )
      .attr("stroke", "grey")
      .attr("stroke-opacity", 0.4)
      .attr("d", pathGenerator);

    outline
      .join("path")
      .attr("stroke", "black")
      .attr("stroke-opacity", 0.4)
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
        <path
          id="outline"
          transform={"translate(0," + window.innerHeight / 4 + ")"}
        ></path>
      </svg>
    </div>
  );
};
