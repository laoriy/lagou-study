import { baseURL } from "@/service/axio";
import Layout from "../../../components/Layout";
import { Heading, Box, Divider, Text } from "@chakra-ui/react";
import axios from "axios";

export async function generateStaticParams() {
  let { data } = await axios.get("/videos", { baseURL: baseURL });
  let paths = data.map((id: any) => ({ id }));
  return paths;
}

export async function getPost(id: string) {
  let { data: post } = await axios.get(`/detail?id=${id}`, {
    baseURL: baseURL,
  });
  return post;
}

export default async function VideoDetail({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);
  return (
    <Layout>
      <Box maxW={"1200px"} mx="auto">
        <Heading as="h2" size="xl">
          {post.title}
        </Heading>
        <Heading as="h4" size="lg" mt={4} color="gray.500" fontWeight="light">
          {post.sub}
        </Heading>
        <Divider my={4} />
        <Box overflow="hidden" className="text-[14px]">
          <Text float="left">作者: {post.author}</Text>
          <Text float="right">发布时间: {post.publish}</Text>
        </Box>
        <Divider my={4} />
        <Box
          className="py-[10px] text-[14px] [&_p]:mb-[10px]"
          maxW={1200}
          mx="auto"
        >
          <Box dangerouslySetInnerHTML={{ __html: post.content }}></Box>
        </Box>
      </Box>
    </Layout>
  );
}
