import { Carousel } from "react-responsive-carousel";
import { Heading, Box, Text, Button, Image } from "@chakra-ui/react";
import Link from 'next/link'
// import axios from "axios";
// import { baseURL } from "../axios.config";

const imagesUrls = [
  {
    url: "/images/1.jpg",
    description: "desc1",
    title: "title1",
    id: "1",
  },
  {
    url: "/images/2.jpg",
    description: "desc2",
    title: "title2",
    id: "2",
  },
  {
    url: "/images/3.jpg",
    description: "desc3",
    title: "title3",
    id: "3",
  },
];

export default function Swiper({ data }: any) {
  return (
    <>
      <Carousel showArrows={false} showIndicators={false} showStatus={false}>
        {imagesUrls.map((swiper, index) => (
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

// export function loadSwiper() {
//   return axios.get("/swiper", { baseURL: baseURL });
// }
