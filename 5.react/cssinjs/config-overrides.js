const { override, addBabelPreset } = require("customize-cra");

module.exports = {
  webpack: override(addBabelPreset("@emotion/babel-preset-css-prop")),
};
