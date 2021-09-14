import classNames from "classnames";
import { area } from "d3-shape";
import { useSelector } from "react-redux";
import { caliData } from "../StateMap/data/caliData";

const tooltipYPadding = 30;

const californiaArea = 409597040191.3525;

// caliData.objects.convert.geometries
//   .map((x) => x.properties.Shape_Area)
//   .reduce((a, b) => a + b, 0);

const areas = caliData.objects.convert.geometries.map(
  (x) => x.properties.Shape_Area
);

export const StateMapTooltip = () => {
  const { stateMapIsHovered } = useSelector((state) => state);
  const { mouseCoords, polygonData } = useSelector(
    (state) => state
  ).tooltipData;

  return (
    <div>
      <div
        className={classNames(
          "absolute transform -translate-y-full -translate-x-1/2 bg-white p-4 pointer-events-none text-sm",
          {
            hidden: !stateMapIsHovered,
          }
        )}
        style={{
          left: mouseCoords[0],
          top: mouseCoords[1] - tooltipYPadding,
        }}
      >
        <div className="font-default-bold">{polygonData.US_L4NAME}</div>
        <div className="font-default-medium">% of California</div>
        <div>
          {((polygonData.Shape_Area / californiaArea) * 100).toFixed(2)}
        </div>
        <div
          className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-3 h-3"
          style={{
            borderLeft: "12px solid transparent",
            borderRight: "12px solid transparent",
            borderTop: "12px solid #FFFFFF",
          }}
        ></div>
      </div>
    </div>
  );
};
