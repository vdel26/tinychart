module.exports = {
  cache: true,
  entry: './index',
  output: {
    filename: 'browser-bundle.js'
  },
  module: {
    loaders: [
      {test: /\.(js|jsx)$/, loader: 'jsx-loader'}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  }
};
