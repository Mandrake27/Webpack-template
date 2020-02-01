const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PATHS = {
  src: path.join(__dirname, "../src"),
  dist: path.join(__dirname, "../dist"),
  assets: "assets/"
};

module.exports = {
  externals: {
    paths: PATHS
  },

  entry: `${PATHS.src}/index.js`,

  output: {
    path: PATHS.dist,
    filename: `${PATHS.assets}js/[name].[hash].js`,
    publicPath: "/"
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test: /node_modules/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },

  module: {
    rules: [
      // Loading JavaScript through Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
              "@babel/preset-env",
              "@babel/react",
            {
              plugins: ["@babel/plugin-proposal-class-properties"],
            }
          ]
        }
      },

      // Loading CSS
      {
        test: /\.css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: './js/postcss.config.js' }
            }
          }
        ]
      },

      // Loading SCSS
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: './js/postcss.config.js' }
            }
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ]
      },

      // Loading raw files
      {
        test: /\.txt$/,
        loader: "raw-loader"
      },

      // Loading images
      {
        test: /\.(png|jpg|gif|jpeg|ico)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]"
            }
          }
        ]
      },

      //Loading fonts
      {
        test: /\.(woof(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file-loader",
        options: {
          name: "[name].[ext]"
        }
      }
    ]
  },

  resolve: {
    alias: {
      components: path.resolve(__dirname, `${PATHS.src}/components`),
      store: path.resolve(__dirname, `${PATHS.src}/store`),
      assets: path.resolve(__dirname, `${PATHS.src}/assets`),
    },
    extensions: ['.js', '.css', '.scss']
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].[hash].css`
    }),
    new HtmlWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
      inject: false
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/${PATHS.assets}img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/${PATHS.assets}fonts`, to: `${PATHS.assets}fonts` }
    ])
  ]
};
