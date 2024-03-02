// theme.js

// 1. import `extendTheme` function
import { extendTheme } from "@chakra-ui/react";
import { CustomButton } from "./custom";

// 2. Add your color mode config
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
const breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

// 3. extend the theme
const theme = extendTheme({
  config,
  breakpoints,
  components: {
    CustomButton,
  },
});

export default theme;
