const path = require('path')
const config           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry:'./src/app.js',
    output: {
        path: path.resolve(__dirname,'dist'),
        publicPath: '/dist/',
        filename: 'js/app.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env','react']
            }
          }
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: "css-loader"
            })
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'resource/[name].[ext]'
                }
              }
            ]
        },
        // 字体图标的配置
        {
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }
            ]
        }
      ]
    },
    plugins: [
        // 处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html',
            favicon: './favicon.ico'
        }),
        // 独立css文件
        new ExtractTextPlugin("css/[name].css"),
    ],
    devServer:{
        port: 8086
    },
    // 提出公共模块
    optimization: {
        splitChunks: {
          chunks: "async",
          minSize: 30000, //模块大于30k会被抽离到公共模块
          minChunks: 1, //模块出现1次就会被抽离到公共模块
          maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
          maxInitialRequests: 3, //入口模块最多只能加载3个
          name: true,
          cacheGroups: {
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            }
          }
        },
        runtimeChunk: {
          name: "runtime"
        }
  }
}
