const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "laoriy",
    projectName: "tools",
    webpackConfigEnv,
    outputSystemJS: true,
    argv,
  });

  return merge(defaultConfig, {
    externals: ["rxjs"],
    // modify the webpack config however you'd like to by adding to this object
  });
};
