import { StateMap } from "./StateMap/StateMap";
import { StateMapTooltip } from "./StateMapTooltip/StateMapTooltip";
import { MapKey } from "./MapKey/MapKey";

export const StateMapPage = () => {
  return (
    <div className="relative font-default-regular">
      <MapKey />
      <StateMap />
      <StateMapTooltip />
    </div>
  );
};
