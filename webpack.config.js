module.exports = {
  cache: true,
  entry: './index',
  output: {
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
  }
};
