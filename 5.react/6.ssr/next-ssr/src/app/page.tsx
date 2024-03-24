// app/page.tsx

import Movie from "../components/Movie";
import Swiper from "../components/Carousel";
import Layout from "../components/Layout";
import { cache } from "react";
import axios from "axios";
import { baseURL } from "@/service/axio";
function loadSwiper() {
  return axios.get("/swiper", { baseURL: baseURL });
}
export const getItem = cache(async () => {
  try {
    const d = await loadSwiper();
    return d.data;
  } catch (error) {
    console.log(error);
    return [];
  }
});
export default async function Page() {
  const item: any = await getItem();
  return (
    <Layout>
      <Swiper data={item} />
      <Movie
        title="电影"
        data={[
          { id: "1", url: "/images/item_1.jpg", title: "title1", vid: "1" },
          { id: "2", url: "/images/item_1.jpg", title: "title2", vid: "2" },
        ]}
      />
    </Layout>
  );
}
