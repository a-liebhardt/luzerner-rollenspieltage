import path from 'path';
import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
const secrets = require(path.join(__dirname, 'secrets.json'));

module.exports = () => {
  let config = {};

  config = {
    entry: {
      main: './patterns/main.js',
      polyfills: './patterns/polyfills.js',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './public/js/'),
    },
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: ['babel-loader', 'eslint-loader'],
          exclude: [/node_modules/],
        },
        {
          test: /\.(woff2?|ttf|otf|eot)$/,
          loader: 'file-loader',
          exclude: /node_modules/,
          options: {
            name: '[name].[ext]',
            outputPath: '../fonts/',
          },
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].css',
                outputPath: '../css/',
              },
            },
            { loader: 'extract-loader' },
            {
              loader: 'css-loader',
              options: {
                minimize: true,
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                includePaths: ['node_modules/'],
              },
            },
          ],
        },
        {
          test: /\.(js|css|yml|html|php)$/,
          loader: 'string-replace-loader',
          options: {
            multiple: secrets.replacements
          }
        },
      ],
    },
    resolve: {
      extensions: ['.js'],
    },
    plugins: [
      new ExtractTextPlugin({ // define where to save the file
        filename: 'public/[name].bundle.css',
        allChunks: true,
      }),
      new CopyWebpackPlugin([
        { from: 'patterns/static_www/**/*', to: '../', flatten: true },
        { from: 'patterns/vendor/*', to: '../vendor/', flatten: true },
        { from: 'patterns/**/*.json', to: '../rest/', flatten: true },
      ], {
        debug: false,
        context: __dirname,
        copyUnmodified: true,
      }),
      new CopyWebpackPlugin([
        {
          from: '**/*',
          to: path.join(__dirname, '/docker'),
          flatten: false,
          context: path.join(__dirname, '/patterns/static_docker'),
          transform (content, path) {
            content = content.toString();
            secrets.replacements.forEach((obj) => {
              content = content.replace(obj.search, obj.replace);
            });
            return Promise.resolve(Buffer.from(content, 'utf8'));
          }
        },
        {
          from: '**/*',
          to: path.join(__dirname, '/docker/src'),
          flatten: false,
          context: path.join(__dirname, '/patterns/static_www'),
          transform (content, path) {
            content = content.toString();
            secrets.replacements.forEach((obj) => {
              content = content.replace(obj.search, obj.replace);
            });
            return Promise.resolve(Buffer.from(content, 'utf8'));
          }
        },
      ], {
        debug: false,
        context: __dirname,
        copyUnmodified: false,
      }),
    ],
  };

  if (process.env.NODE_ENV === 'production') {
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  return config;
};
