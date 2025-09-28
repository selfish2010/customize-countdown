const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  entry: {
    'customize-countdown': './src/index.js',
    'customize-countdown.min': './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'CustomizeCountdown',
    libraryTarget: 'umd',
    globalObject: 'this',
    clean: true,
    libraryExport: 'default' // 添加这一行，确保默认导出能被正确访问
  },
  module: {
    rules: [
      {
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: 'babel-loader'
      },
      {
        test: /\.less$/, 
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/,
      }),
      new CssMinimizerPlugin({
        include: /\.min\.css$/,
      })
    ]
  },
  mode: 'production'
};