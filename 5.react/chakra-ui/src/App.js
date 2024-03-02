import * as React from "react";

// 1. import `ChakraBaseProvider` component
import {
  CSSReset,
  Button,
  Box,
  useColorMode,
  Text,
  useColorModeValue,
  LightMode,
} from "@chakra-ui/react";
import CustomButton from "./components/CustomButton";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("tomato", "skyblue");
  // 2. Wrap ChakraBaseProvider at the root of your app
  return (
    <>
      <CSSReset />
      <Box w={100} h={100} bg={bgColor} p={5} borderRadius={10}></Box>
      <Box
        w={[100, 200, 300]}
        h={100}
        bg="gray.500"
        color="red.300"
        p={5}
        my="10px"
        mt={20}
        fontSize={["2xl", "3xl", "4xl"]}
        borderRadius={10}
      >
        你好
      </Box>
      <Text>当前颜色模式：{colorMode}</Text>
      <LightMode>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
      </LightMode>
      <Button onClick={toggleColorMode}>
        Toggle {colorMode === "light" ? "Dark" : "Light"}
      </Button>
      <CustomButton size="md" variant="danger">
        自定义按钮
      </CustomButton>
    </>
  );
}

export default App;
