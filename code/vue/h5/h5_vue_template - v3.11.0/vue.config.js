const vuxLoader = require('vux-loader');
const px2remLoader = {
  loader: 'px2rem-loader',
  options: {
    remUnit: 75
  }
};
module.exports = {
  devServer: {
    port: 8889,     // 端口
    proxy: {
      '/fx':{
        target: 'http://localhost:8080',
      },
      '/token': {
        target: 'http://gyt.www7soft.cn',
      },
      '/mer': {
        target: 'http://gyt.www7soft.cn',
      },
    },
  },


  outputDir: 'h5',
  assetsDir: 'static',
  lintOnSave: false,   // 取消 eslint 验证
  configureWebpack: config => {
    vuxLoader.merge(config, {
      plugins: ['vux-ui', 'duplicate-style']
    });
  }
};
