import React from "react";
import { Box, Stack, Image, Button, useColorMode } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { Outlet } from "react-router-dom";
export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box h="60px" bg={colorMode === "light" ? "gray.200" : "gray.700"}>
        <Box w="80%" m="auto" overflow="hidden">
          <Image float="left" mt="10px" w="40px" src={logo} />
          <Stack
            spacing={8}
            direction="horizontal"
            ml={8}
            h="60px"
            float="left"
            align="center"
          >
            <Link to="/home">首页</Link>
            <Link to="/form">表单</Link>
            <Link to="/card">卡片</Link>
          </Stack>
          <Button
            colorScheme="teal"
            float="right"
            mt="10px"
            onClick={toggleColorMode}
          >
            切换模式
          </Button>
        </Box>
      </Box>
      <Box w="50%" mx="auto" mt="100px" d="flex" justifyContent="center">
        <Outlet />
      </Box>
    </>
  );
}
