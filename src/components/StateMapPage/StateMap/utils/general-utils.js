import randomColor from "randomcolor";

export const l4Column = "US_L4CODE";

export const generateColor = (luminosityString, colorString) => {
  return randomColor({
    luminosity: luminosityString,
    hue: colorString,
  });
};

export const l3Codes = [
  "1",
  "9",
  "6",
  "7",
  "8",
  "85",
  "5",
  "4",
  "13",
  "78",
  "80",
  "14",
  "81",
];

export const mexicoGreen = "#e7ffe3";
export const outlineGrey = "#808080";
export const riverBlue = "#11cff5";
export const stateCream = "#394252";
export const seaBlue = "#9fb6d3";

export const minAreaForText = 25761156 * 5;

export const homeMapDims = [window.innerWidth, window.innerHeight * 1.2];
