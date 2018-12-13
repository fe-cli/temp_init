const path = require('path')
const utils = require('./utils')
module.exports = {
  entry: utils.getPages()['entrys'],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              // modules: true,
              localIdentName: '[local]_[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'// 这个得在项目根目录创建此文件
              }
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".scss", ".css"],
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@assets': path.resolve(process.cwd(),'src/assets'),
      '@@': path.resolve(process.cwd())
    }
  },
  plugins: [
    ...utils.getPages()['htmlPlugins']
  ]
}
