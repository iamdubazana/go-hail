// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.alias = {
  ...(config.resolver.alias || {}),
  // force uuid to use RN build instead of esm-browser
  "uuid": require.resolve("uuid"),
};

module.exports = config;
