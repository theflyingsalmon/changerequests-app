const { defineConfig } = require('@vue/cli-service')
const { devtools } = require('vue')
module.exports = defineConfig({
  transpileDependencies: true
})


module.exports = {
  devServer: {
    port: 3038
  },
  configureWebpack: {
    //devtool: 'source-map'
  }
}