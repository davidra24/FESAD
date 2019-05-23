const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const IsomorphicLoaderPlugin = require('isomorphic-loader/lib/webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const outputDirectory = 'dist';

module.exports = env => {
  return {
    entry: {
      app: [path.resolve(__dirname, './src/client/pages/index.js')]
    },
    output: {
      path: path.resolve(__dirname, outputDirectory),
      filename: 'ssr/bundle.js',
      publicPath: '/',
      chunkFilename: 'js/[id].[chunkhash].js',
      libraryTarget: 'commonjs2'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        /*{
          test: /\.css$/,
          use: ['isomorphic-style-loader', 'css-loader']
        },*/
        {
          test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'file-loader', //'file-loader',
          options: {
            name: 'public/media/[name].[ext]',
            publicPath: url => url.replace(/public/, ''),
            emit: false
          }
        },
        {
          test: /\.css$/,
          use: ['isomorphic-style-loader', 'css-loader']
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
      }),
      new IsomorphicLoaderPlugin()
    ]
  };
};
