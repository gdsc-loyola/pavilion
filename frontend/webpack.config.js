const path = require("path");
const webpack = require("webpack")

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.s[ac]ss/i,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ['style-loader','css-loader', 'file-loader']
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          }
        ]
      },
      {
        test: /\.png$/,
        loader: 'file-loader'
      }
    ]
  },
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENG: JSON.stringify("development")
      }
    })
  ]
};