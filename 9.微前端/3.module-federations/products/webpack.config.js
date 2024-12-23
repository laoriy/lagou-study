const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

module.exports = {
  mode: "development",
  devServer: {
    port: 8081
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "products", // 模块名称
      filename: "remoteEntry.js", // 模块的入口文件
      exposes: {
        "./Index": "./src/bootstrap.js" // 暴露的模块
      },
      shared: {
        faker: {
          singleton: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
