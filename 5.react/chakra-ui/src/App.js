import * as React from "react";

// 1. import `ChakraBaseProvider` component
import { CSSReset, Button, Box, useColorMode, Text } from "@chakra-ui/react";
import theme from "./theme";

// const { Button } = chakraTheme.components;

// const theme = extendBaseTheme({
//   components: {
//     Button,
//   },
// });

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  // 2. Wrap ChakraBaseProvider at the root of your app
  return (
    <>
      {" "}
      <CSSReset />
      <Box w={100} h={100} bg={"red"} p={5} borderRadius={10}></Box>
      <Text>当前颜色模式：{colorMode}</Text>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </>
  );
}

export default App;
