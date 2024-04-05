const axios = require("axios");
const pluralize = require("pluralize");
const createNodeHelpers = require("gatsby-node-helpers").default;

async function sourceNodes({ actions }, configOptions) {
  const { createNode } = actions;
  const { apiURL, collectionTypes } = configOptions;
  // Post => posts
  const types = collectionTypes
    .map((type) => type.toLowerCase())
    .map((type) => pluralize(type));
  // 从外部数据源获取数据
  let final = await getContents(types, apiURL);

  for (let [key, value] of Object.entries(final)) {
    // 1.构建数据接地那对象
    const { createNodeFactory } = createNodeHelpers({
      typePrefix: key,
    });

    const createNodeObject = createNodeFactory("content");
    // 2. 根据数据节点对象创建节点
    value.data.forEach((item) => {
      createNode(createNodeObject(item));
    });
  }
}

async function getContents(types, apiURL) {
  const size = types.length;
  let index = 0;
  // {posts: [], products: []}
  const final = {};
  await request();
  async function request() {
    if (index == size) return;
    let { data } = await axios.get(`${apiURL}/api/${types[index]}`);
    final[types[index++]] = data;
    await request();
  }
  return final;
}

module.exports = {
  sourceNodes,
};
