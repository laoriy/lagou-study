"use client";
import { Carousel } from "react-responsive-carousel";
import { Heading, Box, Text, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function Swiper({
  data,
}: {
  data: {
    url: string;
    description: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <>
      <Carousel showArrows={false} showIndicators={false} showStatus={false}>
        {data.map((swiper, index) => (
          <div className="relative" key={index}>
            <img src={swiper.url} className="filter brightness-50" alt="" />
            <Box className="w-full max-w-[1200px] absolute left-[50%] top-0 pt-[180px] translate-x-[-50%] text-left text-white">
              <Heading as="h2">{swiper.title}</Heading>
              <Text className="w-[450px] my-[20px] text-[14px]">
                {swiper.description}
              </Text>
              <Button colorScheme="red">
                <Link href={`/detail/${swiper.id}`}>CHECK DETAIL</Link>
              </Button>
            </Box>
          </div>
        ))}
      </Carousel>
    </>
  );
}
