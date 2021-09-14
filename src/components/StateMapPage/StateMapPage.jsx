import classNames from "classnames";
import { useSelector } from "react-redux";
import { StateMap } from "./StateMap/StateMap";

export const StateMapPage = () => {
  const { stateMapIsHovered } = useSelector((state) => state);

  return (
    <div className="relative font-default-regular">
      <StateMap />
      {/* <MapKey /> */}
      <div
        className={classNames("absolute top-0 bg-white p-4", {
          flex: stateMapIsHovered,
          hidden: !stateMapIsHovered,
        })}
      >
        Toooltip
      </div>
    </div>
  );
};
