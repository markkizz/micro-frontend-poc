/**
 * @type {import('webpack').Configuration}
 */

 const path = require('path')
 const webpack = require('webpack')

 const HtmlWebpackPlugin = require('html-webpack-plugin')

 const { dependencies } = require('./package.json')

 const srcPath = path.join(__dirname, 'src')

 module.exports = (env) => ({
   mode: env.mode,
   devtool: 'source-map',
   devServer: {
     host: '0.0.0.0',
     port: 3000,
     hot: true,
     historyApiFallback: true,
     headers: {
       'Access-Control-Allow-Origin': '*',
     },
   },
   entry: './src/index.ts',
   output: {
     filename: '[name].[contenthash].bundle.js',
     path: path.join(__dirname, 'dist'),
     publicPath: '/',
     clean: true,
     assetModuleFilename: 'assets/[name][ext][query]',
   },
   optimization: {
     splitChunks: {
       cacheGroups: {
         styles: {
           name: 'styles',
           test: /\.css$/,
           chunks: 'all',
           enforce: true,
         },
       },
     },
   },
   plugins: [
    //  new ESLintPlugin({
    //    extensions: ['ts', '.tsx', '.js', '.jsx'],
    //  }),
     new HtmlWebpackPlugin({
       template: './public/index.html',
      //  favicon: './public/favicon.svg',
       publicPath: '/',
     }),
    //  new MiniCSSExtractPlugin({
    //    filename: 'styles/[name].[contenthash].min.css',
    //  }),
     // new PurgecssPlugin({
     //   paths: glob.sync(`${srcPath}/**/*`, { nodir: true }),
     //   safelist: {
     //     standard: [/mdi.*/],
     //   },
     // }),
     new webpack.container.ModuleFederationPlugin({
       name: 'host',
       exposes: {},
       remotes: {
         // app2: 'app2@http://localhost:3002/remoteEntry.js',
       },
       shared: {
         react: {
           singleton: true,
           requiredVersion: dependencies['react'],
         },
         'react-dom': {
           singleton: true,
           requiredVersion: dependencies['react-dom'],
         },
        //  'react-router-dom': {
        //    singleton: true,
        //    requiredVersion: dependencies['react-router-dom'],
        //  },
       },
     }),
     new webpack.ProgressPlugin(),
    //  new ForkTsCheckerWebpackPlugin(),
   ],
   module: {
     rules: [
       {
         test: /\.tsx?$/i,
         use: 'ts-loader',
         exclude: /node_modules/,
       },
      //  {
      //    test: /\.(png|jpg|jpeg|gif|svg|ico)$/i,
      //    type: 'asset/resource',
      //    generator: {
      //      filename: 'images/[name][ext][query]',
      //    },
      //  },
      //  {
      //    test: /\.(ttf|woff|woff2|eot)$/i,
      //    type: 'asset/resource',
      //    generator: {
      //      filename: 'fonts/[name][ext][query]',
      //    },
      //  },
      //  {
      //    test: /\.s[ac]ss$/i,
      //    use: [
      //      MiniCSSExtractPlugin.loader,
      //      'css-loader',
      //      {
      //        loader: 'sass-loader',
      //        options: {
      //          implementation: require('sass'),
      //        },
      //      },
      //    ],
      //  },
     ],
   },
   resolve: {
     alias: {
       '@': srcPath,
     },
     extensions: ['.ts', '.tsx', '.js', '.jsx'],
   },
   stats: 'errors-only',
 })
