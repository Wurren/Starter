const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");

const config = {
    devtool: "source-map",
    plugins: [
        new UglifyJsWebpackPlugin({
            sourceMap: true
        }),
        new CompressionWebpackPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html|css)$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};

module.exports = config;
