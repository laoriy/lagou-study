import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Laoriy Gatsby Site`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-source-filesystem`, //用于将本地文件中的数据添加至数据层
      options: {
        // The unique name for each instance
        name: `json`,
        // Path to the directory
        path: `${__dirname}/json/`,
      },
    },
    "gatsby-transformer-json", //将原始 JSON 字符串转换成 JavaScript 对象
  ],
};

export default config;
