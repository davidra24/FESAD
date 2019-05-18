const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  //['babel-polyfill', path.resolve(__dirname, './src/client/index.js')],
  entry: {
    app: [
      'idempotent-babel-polyfill',
      path.resolve(__dirname, './src/server/index.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, outputDirectory),
    publicPath: '/',
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|svg|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      '/api': 'http://localhost:8080'
    }
  },

  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      inject: false,
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
