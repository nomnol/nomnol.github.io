import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HotModuleReplacementPlugin from 'webpack/lib/HotModuleReplacementPlugin.js';

module.exports = {
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /'node_modules'/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: 'css-loader'
      },
      {
        test: /\.cssnext$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader?sourceMap'
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              plugins: (loader) => [
                require('postcss-import')({root: loader.resourcePath}),
                require('postcss-apply')(),
                require('postcss-nested')(),
                require('postcss-url')(),
                require('postcss-cssnext')()
              ]
            }
          }
        ]
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/index.css'),
    new HotModuleReplacementPlugin()
  ],
  devServer: {
    port: 9010,
    hot: true
  },
  devtool: 'source-map'
}