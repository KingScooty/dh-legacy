

module.exports = {
  entry: './src/client.js',
  output: {
    filename: './src/dist/bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
    // loaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: 'babel',
    //     query: {
    //       presets: ['react', 'es2015']
    //     }
    //   }
    // ]
  }
};
