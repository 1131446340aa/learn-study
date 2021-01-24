import { Configuration, WebpackPluginInstance } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { resolve } from 'path'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
const webpackBase: Configuration = {
  entry: resolve(__dirname, './src/index.tsx'),
  output: {
    path: resolve(__dirname, './dist'),
    filename: 'app.[hash].js'
  },
  plugins: [
    new CleanWebpackPlugin() as any,
    new MiniCssExtractPlugin()
  ].concat([new HtmlWebpackPlugin({
    template: './src/index.html'
  })]),
  module: {

  }
}

export default webpackBase

