import randomColor from "randomcolor";

export const possibleShades = ["light", "bright"];
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

export const l3Colors = [
  {
    code: "1",
    colorString: "blue",
    luminosityString: "bright",
  },
  {
    code: "9",
    colorString: "orange",
    luminosityString: "bright",
  },
  {
    code: "6",
    colorString: "yellow",
    luminosityString: "dark",
  },
  {
    code: "7",
    colorString: "orange",
    luminosityString: "bright",
  },
  {
    code: "8",
    colorString: "green",
    luminosityString: "light",
  },
  {
    code: "85",
    colorString: "orange",
    luminosity: "bright",
  },
  {
    code: "5",
    colorString: "green",
    luminosityString: "bright",
  },
  {
    code: "4",
    colorString: "blue",
    luminosityString: "light",
  },
  {
    code: "13",
    colorString: "pink",
    luminosity: "light",
  },
  {
    code: "78",
    colorString: "green",
    luminosityString: "light",
  },
  {
    code: "80",
    colorString: "yellow",
    luminosityString: "light",
  },
  {
    code: "14",
    colorString: "red",
    luminosityString: "light",
  },
  {
    code: "81",
    colorString: "red",
    luminosityString: "light",
  },
];
