const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, './static/frontend'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      $stylesheets: path.resolve(__dirname, '/stylesheets'),
      $lib: path.resolve(__dirname, './src/lib'),
      $modules: path.resolve(__dirname, './src/modules'),
      $components: path.resolve(__dirname, './src/components'),
      $services: path.resolve(__dirname, './src/services'),
    },

    extensions: ['', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'file-loader'],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.png$/,
        loader: 'file-loader',
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [],
};
