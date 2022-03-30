import { Platform } from "react-native"

const theme = {
  colors: {
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textReverse: "white",
    textError: "#d73a4a",
    primary: "#0366d6",
    bgPrimary: "#24292e",
    bgGray: "#e1e4e8",
    bgWhite: "white",
    bgWarning: "#d73a4a",
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    // main: "System",
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
}

export default theme
