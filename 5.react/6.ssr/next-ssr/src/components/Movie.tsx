import { Box, Stack, Image, Text, Heading } from "@chakra-ui/react";
import { MdMovie } from "react-icons/md";
// import axios from "axios";
import Link from "next/link";
// import { baseURL } from "../axios.config";

export default function Movie({
  title,
  data,
}: {
  title: string;
  data: { id: string; url: string; title: string; vid: string }[];
}) {
  return (
    <Box maxW="1200px" mx="auto" overflow="hidden">
      <Stack direction={"column"} mt="20px" fontSize="24px">
        <MdMovie />
        <Heading as="h3" fontSize="20px">
          {title}
        </Heading>
      </Stack>
      <Stack spacing={4} direction={"row"} mt="20px">
        {data &&
          data.map((item) => (
            <MovieItem
              key={item.id}
              url={item.url}
              title={item.title}
              vid={item.vid}
            ></MovieItem>
          ))}
      </Stack>
    </Box>
  );
}

function MovieItem({
  url,
  title,
  vid,
}: {
  url: string;
  title: string;
  vid: string;
}) {
  return (
    <Box w="290px">
      <Image src={url} />
      <Text mt="10px">
        <Link href="/detail/[id]" as={`/detail/${vid}`}>
          {title}
        </Link>
      </Text>
    </Box>
  );
}

// export function loadMovie() {
//   return axios.get("/movie", { baseURL: baseURL });
// }
