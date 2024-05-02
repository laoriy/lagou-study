import React from "react";
import Layout from "./Layout";
import Search from "./Search";

function Home() {
  return (
    <Layout title="拉勾电商" subTitle="欢迎来到拉勾电商, 尽情享受吧">
      {/* Home */}
      <Search />
    </Layout>
  );
}

export default Home;
