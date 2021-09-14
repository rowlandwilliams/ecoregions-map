import classNames from "classnames";
import { useSelector } from "react-redux";
import { StateMap } from "./StateMap/StateMap";

const tooltipYPadding = 30;

export const StateMapPage = () => {
  const { stateMapIsHovered } = useSelector((state) => state);
  const { mouseCoords } = useSelector((state) => state);

  return (
    <div className="relative font-default-regular">
      <StateMap />
      {/* <MapKey /> */}
      <div>
        <div
          className={classNames(
            "absolute transform -translate-y-full -translate-x-1/2 bg-white p-4 pointer-events-none",
            {
              hidden: !stateMapIsHovered,
            }
          )}
          style={{
            left: mouseCoords[0],
            top: mouseCoords[1] - tooltipYPadding,
          }}
        >
          <div>Tooltip</div>
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
    </div>
  );
};
