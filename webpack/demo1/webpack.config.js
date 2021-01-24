/*
 * @Descripttion: 
 * @Date: 2020-07-27 11:22:34
 * @LastEditors: 黄力豪
 * @LastEditTime: 2020-07-27 12:50:28
 */

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将css单独打包成文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports = {
    entry: path.resolve(__dirname, './src'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.[hash].js'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
          filename: 'index.css',
          chunkFilename: '[id].css'
        }),
        new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/g,
          cssProcessor: require('cssnano'), // 用于优化\最小化 CSS 的 CSS 处理器，默认为 cssnano
          cssProcessorOptions: { safe: true, discardComments: { removeAll: true } }, // 传递给 cssProcesso
          canPrint: true // 布尔值，指示插件是否可以将消息打印到控制台，默认为 true
        })
    ],
    module: {
        rules: [{
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ],
                        plugins: ['@babel/plugin-transform-runtime']
                    },
                }

            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', ]
            },
            {
                test: /\.jpeg$/,
                use: ['file-loader', 'image-webpack-loader']
            }
        ]
    },

    mode: "production"
}