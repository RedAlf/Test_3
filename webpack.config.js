const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS
        ]
      },
      {
        test: /\.pug$/,
        loader: "pug-loader",
        options: {
          pretty: true
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      {
        test: /\.exec\.js$/,
        use: ["script-loader"]
      }
    ]
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.pug"
    }),
    new CleanWebpackPlugin(["dist"]),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },

  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist")
  }
};
