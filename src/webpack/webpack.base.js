const path = require("path");
const webpack = require("webpack");

const config = {
    // entry: "./src/js/index.js",
    output: {
        filename: "[name].min.js"
        // path: path.join(__dirname, "../public", "dist")
    },
    resolve: {
        modules: [path.resolve("./src/js"), path.resolve("./node_modules")]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || "development"
            )
        }),
        new webpack.ProgressPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks(module, count) {
                var context = module.context;
                return context && context.indexOf("node_modules") >= 0;
            }
        })
    ]
};

module.exports = config;
