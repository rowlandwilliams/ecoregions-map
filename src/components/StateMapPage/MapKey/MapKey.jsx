import { l3Regions } from "../StateMap/utils/polygon-colors";
import { MapKeyItem } from "./MapKeyItem/MapKeyItem";

export const MapKey = () => {
  return (
    <div className="absolute top-0 left-1/3 pt-16 ml-32">
      <div className="text-3xl font-default-bold text-gray-800">
        The Eco-regions of California
      </div>
      <div className="text-sm flex flex-wrap py-8">
        {l3Regions.map((l3Region) => (
          <MapKeyItem l3Region={l3Region} />
        ))}
      </div>
    </div>
  );
};
