const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const utils = require('./utils')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const merge = require('webpack-merge')
// css 压缩
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')
const webpackBase = require('./webpack.base.conf')

module.exports = (env, argv) => {
  return merge(webpackBase, {
    mode: 'production',
    output: {
      filename: "[name].js",
      path: config.build.assetsRoot,
      publicPath: config.build.assetsPublicPath
    },
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader", // css处理器
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: 'postcss.config.js'// 这个得在项目根目录创建此文件
                }
              }
            },
            `${utils.cssLoader}` // sass处理器 、甚至还可以再加一个less的处理器
          ]
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[ext]',
              publicPath: `${config.build.assetsPublicPath}statice/`,
              outputPath: "statice/"
            }
          }]
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            publicPath: `${config.build.assetsPublicPath}statice/icon/`,
            outputPath: "statice/icon/"
          }
        }
      ]
    },
    optimization: {
      minimizer: [new UglifyJsPlugin()],
      runtimeChunk: {
        name: 'manifest'
      },
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            name: 'common'
          },
          vendor: {
            chunks: "initial",
            test: path.resolve(__dirname, "../node_modules"),
            name: "vendor", // 使用 vendor 入口作为公共部分
            enforce: true
          }
        }
      }
    },
    plugins: [
      new CleanWebpack(config.build.assetsRoot,{
        root: path.resolve(__dirname, "../"),
        verbose: true
      }),
      new MiniCssExtractPlugin({
        filename: "style/[name].[hash:8].css",
        chunkFilename: "style/[name].[hash:8].css"
      }),
      new OptimizeCSSAssetsPlugin({}),
    ]
  })
}
