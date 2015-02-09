var webpack = require('webpack');

var plugins = [];
if (process.env.NODE_ENV === 'production') {
  var release = true;
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()
  );
}

module.exports = {
  cache: true,
  entry: './index',
  output: {
    path: release ? './dist' : '.',
    filename: 'browser-bundle.js'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'jsx-loader'},
      {test: /\.json$/, loader: 'json-loader'},
      {test: /\.svg$/, loader: 'raw-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.svg']
  },
  plugins: plugins
};
