import { Button, Image, Box, Container } from "@chakra-ui/react";
import { FaSignInAlt, FaSearch } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import Link from "next/link";

export default function Header() {
  return (
    <Box bg="#202020" h={"52px"} borderBottom="1px solid #393939">
      <Container maxW={1200} h={"52px"} pos="relative">
        <div className="h-12  text-white  flex items-center px-[15px] float-left">
          <Button
            size="xs"
            className="after:content-[''] after:w-[1px] after:h-[10px] after:bg-white after:ml-[12px] after:absolute after:right-0"
            leftIcon={<FaSignInAlt />}
            borderLeft={"1px solid #393939"}
            backgroundColor={"inherit"}
            borderRadius={0}
            height={"52px"}
          >
            登录
          </Button>
          <Button
            size="xs"
            className=" px-[10px]"
            borderRight={"1px solid #393939"}
            backgroundColor={"inherit"}
            height={"52px"}
            borderRadius={0}
            leftIcon={<BsFillPersonFill />}
          >
            注册
          </Button>
        </div>
        <Image
          src="/images/logo.png"
          w={140}
          position={"absolute"}
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          alt="logo"
        ></Image>
        <Link
          href="#"
          className="float-right h-[52px] text-white text-base flex items-center px-[15px] border-x border-[#393939]"
        >
          <FaSearch />
        </Link>
      </Container>
    </Box>
  );
}
