const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 9003,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    allowedHosts: "all",
  },
  configureWebpack: {
    output: {
      libraryTarget: "system",
    },
    externals: ["single-spa"],
  },
});
