const webpackMerge = require("webpack-merge");
const baseConfig = require("./src/webpack/webpack.base");

const envi = { production: "prod", development: "dev" };

const envConfig = require(`./src/webpack/webpack.${
    envi[process.env.NODE_ENV]
}.js`);

module.exports = webpackMerge(baseConfig, envConfig);
