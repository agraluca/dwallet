export default {
  grid: {
    container: "126rem",
    gutter: "3.2rem",
  },
  border: {
    radius: "0.8rem",
  },
  font: {
    family:
      "'Big Shoulders Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    weight: {
      thin: 400,
      normal: 500,
      bold: 700,
    },
    sizes: {
      xsmall: "1.2rem",
      small: "1.8rem",
      medium: "2.2rem",
      large: "3.2rem",
      xlarge: "3.6rem",
    },
  },
  colors: {
    yellow: "#F5CB5C",
    black: "#242423",
    lightBlack: "#333333",
    blue: "#CFDBD5",
    lightBlue: "#E8EDDF",
    green: "#33CC95",
    red: "#E52E4D",
    white: "#FAFAFA",
  },
  spacings: {
    xxsmall: "0.8rem",
    xsmall: "1.6rem",
    small: "2.4rem",
    medium: "3.2rem",
    large: "4.0rem",
    xlarge: "4.8rem",
    xxlarge: "5.6rem",
  },
  layers: {
    base: 10,
    menu: 20,
    overlay: 30,
    modal: 40,
    alwaysOnTop: 50,
  },
} as const;
