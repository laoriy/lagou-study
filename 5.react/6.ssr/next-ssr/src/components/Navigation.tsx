import { Box, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default function Navigation() {
  return (
    <Box bg="#202020" h={"52px"}>
      <Stack
        justifyContent="center"
        alignItems="center"
        color="white"
        h={"52px"}
        direction={["column", "row"]}
        fontSize={13}
      >
        <Link href="#">影片</Link>
        <Link href="#">漫画</Link>
        <Link href="#">电影</Link>
        <Link href="#">电视</Link>
        <Link href="#">新闻</Link>
      </Stack>
    </Box>
  );
}
