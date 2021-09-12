import classNames from "classnames";
import { RegionMap } from "./RegionMap/RegionMap";
import { l3Regions } from "../StateMapPage/StateMap/utils/colors";

export const RegionMapPages = () => {
  return (
    <div>
      {l3Regions.map((l3Region, i) => (
        <div
          className={classNames(
            "flex",
            {
              "flex-row-reverse": i % 2 === 0,
            },
            "items-center w-full h-screen"
          )}
          style={{ backgroundColor: l3Region.color }}
        >
          <RegionMap
            l3RegionCode={l3Region.code}
            l3SvgDim={window.innerHeight * 0.75}
            svgPadding={50}
          />
          <div>suh</div>
        </div>
      ))}
    </div>
  );
};
