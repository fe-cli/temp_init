const path = require('path')
const Config= require('../config')
function resolve(file) {
  return path.resolve(__dirname, "../", file)
}

module.exports = {
  dev: {
    host: Config.host,
    port: Config.port,
    devtool: 'cheap-module-eval-source-map',
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    assetsPublicPath: '',
    assetsSubDirectory: 'static',
    poll: false,
    proxyTable: Config.mock && {
      ...Config.mock
    }
  },
  build: {
    assetsRoot: resolve('./dist'),// 打包输出路径
    assetsSubDirectory: 'static',
    assetsPublicPath: '../'// 输出插入的js/css引用路径
  }
}
