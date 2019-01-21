const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = (process.env.NODE_ENV === 'production');

module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[hash].js'
  },
  resolve: {
    alias: {
      '$': path.resolve(__dirname, 'src')
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: [
        'ts-loader',
      ],
      include: path.resolve('src'),
      exclude: /node_modules/
    },
    {
      test: /\.css$/,
      use: [!isProduction ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader',
      ],
    },
    {
      test: /\.(eot|svg|ttf|TTF|otf)(\?\S*)?$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
      loader: 'url-loader',
      query: {
        limit: 1000,
        name: '[name].[ext]'
      }
    }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: !isProduction ? '[name].css' : '[name].[hash].css',
      chunkFilename: !isProduction ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'template.html'),
      filename: 'index.html',
      hash: false,
      minify: {
        removeAttributeQuotes: isProduction
      }
    }),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    compress: true,
    open: false,
    port: 6688,
    publicPath: "/"
  }
}
