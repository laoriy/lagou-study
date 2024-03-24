// app/page.tsx

import Movie, { loadMovie } from "../components/Movie";
import Swiper from "../components/Carousel";
import Layout from "../components/Layout";
import { cache } from "react";
import axios from "axios";
import { baseURL } from "@/service/axio";
function loadSwiper() {
  return axios.get("/swiper", { baseURL: baseURL });
}
const getItem = cache(async () => {
  try {
    const d = await loadSwiper();
    return d.data;
  } catch (error) {
    console.log(error);
    return [];
  }
});

const getMovie = cache(async () => {
  try {
    const d = await loadMovie();
    return d.data;
  } catch (error) {
    console.log(error);
    return [];
  }
});
export default async function Page() {
  const item: any = await getItem();
  const movie: any = await getMovie();

  return (
    <Layout>
      <Swiper data={item} />
      <Movie title="电影" data={movie} />
    </Layout>
  );
}
