const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const config = {
    devtool: 'eval-source-map',
    entry: {
        main: './src/assets/scripts/main.js'
    },
    output: {
        filename: 'main.bundle.js'
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        })
    ],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader"
          }
        ]
    }
};

module.exports = config;