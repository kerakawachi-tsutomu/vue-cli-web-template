const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './', // buildファイルをローカル表示可能とする
  configureWebpack: {
    devtool: 'source-map'
  },
  pages: {
    top: {
      entry: 'src/pages/top/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    example: {
      entry: 'src/pages/example/main.js',
      template: 'public/index.html',
      filename: 'example.html',
    },
  },
})
