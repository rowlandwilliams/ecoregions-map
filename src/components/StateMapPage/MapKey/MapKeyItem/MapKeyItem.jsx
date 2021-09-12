import { L3Svg } from "../../../RegionMapPages/RegionMap/RegionMap";

export const MapKeyItem = (props) => {
  const { l3Region } = props;
  return (
    <div className="flex items-center px-12 py-8">
      <L3Svg l3RegionCode={l3Region.code} l3SvgDim={120} svgPadding={10} />
      <div key={l3Region.key} className="w-20">
        {l3Region.key}
      </div>
    </div>
  );
};
