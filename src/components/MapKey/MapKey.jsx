import { l3Regions } from "../SVG/Map/utils/colors";
import { MapKeyItem } from "./MapKeyItem/MapKeyItem";

export const MapKey = () => {
  return (
    <div className="absolute top-0 left-1/3 m-8 ml-32">
      <div className="text-5xl font-default-bold text-gray-800">
        The Eco-regions of California
      </div>
      <div className="flex flex-wrap py-8">
        {l3Regions.map((l3Region) => (
          <MapKeyItem l3Region={l3Region} />
        ))}
      </div>
    </div>
  );
};
