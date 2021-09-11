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
