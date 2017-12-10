module.exports = {
  devtool: "inline-source-map",
  resolve: {
    extensions: [ ".js", ".jsx" ]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
}
