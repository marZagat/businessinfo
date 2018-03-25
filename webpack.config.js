const webpack = require('webpack');
const path = require('path');

const common = {
  context: __dirname + '/client',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'env'],
        },
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve('node_modules/react'),
    },
  },
};

const client = {
  entry: './client.js',
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  },
};

const server = {
  entry: './server.js',
  target: 'node',
  output: {
    path: __dirname + '/public',
    filename: 'app-server.js',
    libraryTarget: 'commonjs-module',
  },
};

module.exports = [
  Object.assign({}, common, client),
  Object.assign({}, common, server),
];

// *** OLD WEBPACK ***
// module.exports = {
//   entry: "./client/src/index.jsx",
//   output: {
//     filename: "./client/dist/bundle.js"
//   },
//   module: {
//     loaders: [
//       {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
//       {test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/},
//       {test: /\.css$/, loader: ['style-loader', 'css-loader']}
//     ]
//   },
//   devtool: "source-map"
// }
