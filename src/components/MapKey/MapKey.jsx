import { l3Colors } from "../SVG/Map/utils/colors";

export const MapKey = () => {
  return (
    <div className="absolute top-0 left-1/2 m-8">
      <div className="text-5xl font-default-bold text-gray-800">
        The Eco-regions of California
      </div>
      <div className="p-8">
        {l3Colors.map((l3Region) => (
          <div className="flex items-center my-4">
            <div
              className="w-16 h-12 border border-1 border-gray-100 mr-4 rounded-full"
              style={{ backgroundColor: l3Region.color }}
            ></div>
            <div key={l3Region.key}>{l3Region.key}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
