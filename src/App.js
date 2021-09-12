import { L3Svg } from "./components/MapKey/L3Svg/L3Svg";
import { MapKey } from "./components/MapKey/MapKey";
import { l3Regions } from "./components/SVG/Map/utils/colors";
import { SVG } from "./components/SVG/SVG";

function App() {
  return (
    <div>
      <div className="relative font-default-regular">
        <SVG />
        <MapKey />
      </div>
      <div>
        {l3Regions.map((l3Region) => (
          <div
            className="flex items-center w-full h-screen"
            style={{ backgroundColor: l3Region.color }}
          >
            <L3Svg
              l3RegionCode={l3Region.code}
              l3SvgDim={window.innerHeight * 0.75}
              svgPadding={50}
            />
            <div>suh</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
