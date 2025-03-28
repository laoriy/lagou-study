const singleSpaDefaults = require("webpack-config-single-spa");
const { merge } = require("webpack-merge");

module.exports = () => {
  const defaultConfig = singleSpaDefaults({
    orgName: "laoriy",
    projectName: "lagou",
    outputSystemJS: true,
  });
  return merge(defaultConfig, {
    devServer: {
      port: 9001,
    },
  });
};
