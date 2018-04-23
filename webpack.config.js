module.exports = {
  entry: {
    app: ['./public/index.jsx'],
  },
  output: {
    path: __dirname,
    publicPath: '/public/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            'env',
            'react',
          ],
        },
      },
    ],
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
};
