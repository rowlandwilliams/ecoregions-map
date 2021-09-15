import {
  getMapSelections,
  pathGenerator,
  plotBaseMaps,
  plotBlurredMapOutline,
  plotLevel3PolygonOutlines,
  plotLevel4Polygons,
  plotSolidMapOutline,
  setStateMapMouseInteraction,
  statePolygons,
} from "./map-helpers";

export const drawMap = () => {
  const {
    continentOutlineBlur,
    continentOutline,
    continentOutlineFill,
    usOutlinePath,
    usStatesPath,
    mexGroup,
    stateMapOutlineBlur,
    l4Group,
    l3Group,
    stateMapOutlineSolid,
    caliRiversGroup,
  } = getMapSelections();

  plotBaseMaps(
    continentOutlineBlur,
    continentOutlineFill,
    continentOutline,
    usStatesPath,
    usOutlinePath,
    mexGroup,
    caliRiversGroup
  );
  plotBlurredMapOutline(stateMapOutlineBlur, pathGenerator);
  plotLevel4Polygons(l4Group, statePolygons.features, pathGenerator);
  plotLevel3PolygonOutlines(l3Group, pathGenerator);
  plotSolidMapOutline(stateMapOutlineSolid, pathGenerator);
  setStateMapMouseInteraction();
};
