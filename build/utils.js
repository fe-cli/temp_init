const path = require('path')
const os = require("os")
// 说明API http://nodejs.cn/api/os.html
const packageConfig = require('../package.json')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Config = require ('../config')
// 多页面
exports.getPages = function () {
  // 获取入口文件
  const entries = glob.sync(Config.entryFile)
  const entrys = {}
  const htmlPlugins = []
  // 量产html
  for (const file of entries) {
    const template = file.replace('index.js', 'index.html')
    var chunkName = (/.*\/(pages\/.*?\/index)\.js/.exec(file)[1]).replace(/pages\//g, '')
    // 生成入口文件
    entrys[chunkName] = path.resolve('./', file)
    // 生成页面模板文件
    htmlPlugins.push(new HtmlWebpackPlugin({
      template,
      filename: path.resolve('./dist', chunkName + '.html'),
      chunksSortMode: 'none',
      chunks: [chunkName],
      // favicon: './favicon.ico',
      inject: true,
      hash: false, // 开启hash  ?[hash]
      minify: false
      /* : {
        removeComments: true, // 移除HTML中的注释
        collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
        removeAttributeQuotes: true // 去除属性引用
      } */
    }))
  }
  return {
    htmlPlugins,
    entrys
  }
}

exports.getIPAdress = function () {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}
// sass/less判断
const cssModule = () => {
  if(packageConfig.keywords[0]=="sass"){
    return 'sass-loader'
  }else{
    return 'less-loader'
  }
}
exports.cssLoader = cssModule()
// 'node-notifier'是一个跨平台系统通知的页面，当遇到错误时，它能用系统原生的推送方式给你推送信息
exports.createNotifierCallback = function () {
  const notifier = require('node-notifier')
  return (severity, errors) => {
    if (severity !== "error") return
    const error = errors[0]
    const filename = error.file && error.file.split("!").pop()
    notifier.notify({
      title: packageConfig.name,
      message: severity + ": " + error.name,
      subtitle: filename || ""
    })
  }
}
