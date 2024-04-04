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
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/src/posts/`,
      },
    },
    "gatsby-transformer-json", //将原始 JSON 字符串转换成 JavaScript 对象
    // 不需要特殊配置的可以直接放到 plugin 数组中
    "gatsby-plugin-sharp", // 提供本地图像的处理功能（调整图像尺寸、压缩体积等）
    "gatsby-transformer-sharp", // 将 gatsby-plugin-sharp插件处理后的图像信息添加到数据层
    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 600, // 生成图片的最大宽度，默认 650
              linkImagesToOriginal: false, // 是否将图片包裹在 a 标签中
            },
          },
        ],
      },
    }, // 将数据层中的原始 Markdown 数据转化成可用的对象形式
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: "http://127.0.0.1:1337",
        accessToken:
          "0fdd61fb3c1f5a00474a977e71175411ffc8c68ed8b6f6dae61cbeb4b20f138af67bd62745bd6998aa7b7b150a7dcba925dd85ff929c5aa55d65b7b58cd4b5b01a88f96c3d2b33e962751b804ce7f74249312c3b5028b1cf397a14019695f4866c57192f770a8d5bfb72492ee419972d5eb54e1df09ad6b01751cc878d89a43e",
        collectionTypes: ["post"],
        singleTypes: [],
        remoteFileHeaders: {
          /**
           * Customized request headers
           * For http request with a image or other files need authorization
           * For expamle: Fetch a CDN file which has a security config when gatsby building needs
           */
          // Referer: "https://your-site-domain/",
          // Authorization: "Bearer eyJhabcdefg_replace_it_with_your_own_token",
        },
      },
    },
  ],
};

export default config;
