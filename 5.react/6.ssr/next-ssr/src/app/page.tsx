// app/page.tsx
"use client";
import Movie from "../components/Movie";
import Swiper from "../components/Carousel";
import Layout from "../components/Layout";

export default function Page() {
  return (
    <Layout>
      <Swiper />
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
