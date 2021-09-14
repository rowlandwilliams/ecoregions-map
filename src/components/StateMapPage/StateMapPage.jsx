import { StateMap } from "./StateMap/StateMap";
import { StateMapTooltip } from "./StateMapTooltip/StateMapTooltip";

export const StateMapPage = () => {
  return (
    <div className="relative font-default-regular">
      <StateMap />
      {/* <MapKey /> */}
      <StateMapTooltip />
    </div>
  );
};
