import { stateCream } from "../StateMap/utils/general-utils";
import { l3Regions } from "../StateMap/utils/polygon-colors";
import { MapKeyItem } from "./MapKeyItem/MapKeyItem";

export const MapKey = () => {
  return (
    <div
      className="h-screen py-16 px-12 text-gray-300 "
      style={{ backgroundColor: stateCream }}
    >
      <div className="text-3xl font-default-bold ">
        The Eco-regions of California
      </div>
      <div className="text-sm flex flex-wrap py-8">
        {l3Regions.map((l3Region) => (
          <MapKeyItem l3Region={l3Region} />
        ))}
      </div>
      <div className="flex justify-center">
        <svg
          className="fill-current "
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          height="40px"
          width="40px"
          viewBox="0 0 407.437 407.437"
        >
          <polygon points="386.258,91.567 203.718,273.512 21.179,91.567 0,112.815 203.718,315.87 407.437,112.815 " />
        </svg>
      </div>
    </div>
  );
};
