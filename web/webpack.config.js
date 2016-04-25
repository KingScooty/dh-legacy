

module.exports = {
  entry: './src/views/index.jsx',
  output: {
    filename: './src/views/index.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  }
};
