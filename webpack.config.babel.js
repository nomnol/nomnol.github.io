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
        use: checkEnv(process.env.NODE_ENV)
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

function checkEnv(env) {
  if (env == 'development') {
    return ['style-loader', 'css-loader?sourceMap', {
      loader: 'postcss-loader',
      options: {
        config: {
          path: 'postcss.config.js'
        }
      }
    }
    ]
  } else {
    return ExtractTextPlugin.extract({
      use: ['css-loader?sourceMap', {
        loader: 'postcss-loader',
        options: {
          config: {
            path: 'postcss.config.js'
          }
        }
      }
      ]
    })
  }
}