const path = require('path');
const webpack = require('webpack');
const TsCheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env) =>
{
  var isDevBuild = !(env && env.prod);

  // Configuration for client-side bundle suitable for running in browsers
  const appBundleOutputDir = './wwwroot/app';
  const appBundleConfig = {
    entry: { 'app': './src/boot.ts' },
    output: {
      filename: '[name].js',
      chunkFilename: '[name]-applet.js',
      path: path.join(__dirname, appBundleOutputDir),
      publicPath: 'app/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    context: __dirname,
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [new TsConfigPathsPlugin()]
    },
    module: {
      rules: [
        { test: /\.ts$/, use: ['awesome-typescript-loader?silent=true', 'angular2-template-loader', 'angular-router-loader'] },
        { test: /\.html$/, use: 'html-loader?minimize=false' },
        { test: /\.css$/, exclude: /assets/, use: ['to-string-loader', 'css-loader?minimize'] },
        { test: /\.css$/, include: /assets/, use: ['style-loader', 'css-loader?minimize'] },
        { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
      ]
    },
    plugins: [
      new TsCheckerPlugin(),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./wwwroot/app/vendor-manifest.json')
      }),
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map', // Remove this line if you prefer inline source maps
        moduleFilenameTemplate: path.relative(appBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false
      })
    ]
  };

  return [appBundleConfig];
};
