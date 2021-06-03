const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//用于在构建前清除dist目录中的内容
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash].js",
    // publicPath: 'https://cdn.example.com/assets/'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'imgs/[name]-[hash].[ext]?[contenthash]',
        },
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          // 将 JS 字符串生成为 style 节点
          "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
          // 全局导入scss资源
          { 
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [
                path.resolve(__dirname, "src/assets/scss/var.scss"),
              ]
            }
          }
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,  // 处理后缀名为js的文件
        use: 'babel-loader', // 使用babel-loader进行处理
        exclude: /(node_modules)/  //排除node_modules下的文件
      }
    ],
  },
  devServer: {
      // 必须配置的选项，服务启动的目录，默认为跟目录
      contentBase: './dist',
      // 使用热加载时需要设置为 true
      hot: true,
      /**
       * 下面为可选配置
       */
      // 指定使用一个 host。默认是 localhost
      host: 'localhost',
      // 端口号
      port: 8081,
      // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过设置为 true 进行启用
      historyApiFallback: {
        disableDotRule: true
      },
      // 出现错误时是否在浏览器上出现遮罩层提示
      overlay: true,
      /**
       * 在 dev-server 的两种不同模式之间切换
       *   默认情况下，应用程序启用内联模式 inline
       *   设置为 false，使用 iframe 模式，它在通知栏下面使用 <iframe> 标签，包含了关于构建的消息
       */
      inline: true,
      /**
       * 统计信息，枚举类型，可供选项：
       *      "errors-only": 只在发生错误时输出
       *      "minimal": 只在发生错误或有新的编译时输出
       *      "none": 没有输出
       *      "normal": 标准输出
       *      "verbose": 全部输出
       */
      stats: "errors-only",
      // 设置接口请求代理，更多 proxy 配置请参考 https://github.com/chimurai/http-proxy-middleware#options
      proxy: {
          '/api/': {
              changeOrigin: true,
              // 目标地址
              target: 'http://localhost:3000',
              // 重写路径
              pathRewrite: {
                  '^/api/': '/'
              }
          }
      }
  },
  plugins: [
    // 指定html模板
    new HtmlWebpackPlugin({
      title: "Webpack 开发环境配置",
      template: path.resolve(__dirname, "public/index.html"),
      inject: "body",
      favicon: path.resolve(__dirname, "public/favicon.ico")
    }),
    //清除dist构建目录文件
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new VueLoaderPlugin()
  ]
};