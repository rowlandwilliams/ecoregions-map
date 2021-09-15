import { RegionMap } from "../../../RegionMapPages/RegionMap/RegionMap";

export const MapKeyItem = (props) => {
  const { l3Region } = props;
  return (
    <div className="flex items-center px-12 py-8">
      <RegionMap l3RegionCode={l3Region.code} l3SvgDim={110} svgPadding={10} />
      <div key={l3Region.key} className="w-20">
        {l3Region.key}
      </div>
    </div>
  );
};
