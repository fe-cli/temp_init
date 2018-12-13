const webpack = require('webpack')
const merge = require('webpack-merge')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBase = require('./webpack.base.conf')
const config = require('./config')
const utils = require('./utils')
const Mock = require('../mock')

module.exports = (evn, argv) => {
  return merge(webpackBase, {
    mode: 'development',
    output: {
      filename: "[name].js",
      path: config.build.assetsRoot,
      publicPath: config.dev.assetsPublicPath
    },
    devServer: {
      // 当我们在 package.json 中使用 webpack-dev-server --inline 模式的时候
      // 我们在 chrome 的开发工具的控制台 console 可以看到信息种类
      // 可选 none error warning info
      clientLogLevel: "warning",
      // webpack 最有用的功能之一 --- by webpack
      // 热更新装置启动
      hot: true,
      // 告诉 webpack-dev-server 搭建服务contentBase器的时候从哪里获取静态文件
      // 默认情况下，将使用当前工作目录作为提供静态文件的目录
      // contentBase: true,
      // 搭建的开发服务器启动 gzip 压缩
      compress: true,
      // 搭建的开发服务器的 host，这里使用了一个函数去获取当前电脑的局域网 ip
      // 这个可以获取你的电脑的 ip 地址，然后开发服务器就可以搭建在局域网里
      // 如果有一同开发的小伙伴，在同一局域网内就可以直接访问地址看到你的页面
      // 同样，这个也适用于手机，连上同一个 wifi 之后就可以在手机上实时看到修改的效果
      host: config.dev.host || utils.getIPAdress(),
      // 开发服务器的端口号
      // 但是后面我们会用到 portfinder 插件，如果真的 config/index.js 中的端口被占用了
      // 那这个插件会以这个为 basePort 去找一个没有被占用的端口
      port: config.dev.port,
      // 是否要服务器搭建完成之后自动打开浏览器
      open: config.dev.autoOpenBrowser,
      // 是否打开发现错误之后在浏览器全屏幕显示错误信息功能
      overlay: config.dev.errorOverlay ? {
        warnings: false,
        errors: true
      } : false,
      // 此路径下的打包文件可在浏览器中访问
      // 假设服务器运行在 http://localhost:8080 并且 output.filename 被设置为 bundle.js
      // 默认 publicPath 是 "/"所以 bundle.js 可以通过 http://localhost:8080/bundle.js 访问
      publicPath: config.dev.assetsPublicPath,
      // 启动接口访问代理
      // proxy: config.dev.proxyTable,
      before: function (app) {
        Mock(app)
      },
      // 启用 quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台
      // 和 FriendlyErrorsPlugin 配合食用更佳
      quiet: true,
      // 开启监听文件修改的功能，在 webpack-dev-server 和 webpack-dev-middleware 中是默认开始的
      // watch: true，
      // 关于上面 watch 的一些选项配置
      watchOptions: {
        // 排除一些文件监听，这有利于提高性能
        // 这里排除了 node_modules 文件夹的监听
        // 但是这在应对需要 npm install 一些新的 module 的时候，就需要重启服务
        ignored: /node_modules/,
        // 是否开始轮询，有的时候文件已经更改了但是却没有被监听到，这时候就可以开始轮询
        // 但是比较消耗性能，选择关闭
        poll: config.dev.poll
      }
    },
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader?limit=0',
              options: {
                limit: 1000,
                fallback: 'file-loader',
                name: '[name].[ext]'
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      // 开启热更新插件
      new webpack.HotModuleReplacementPlugin(),
      // ...utils.getPages()['htmlPlugins']
    ]
  })
}
