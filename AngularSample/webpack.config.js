const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

module.exports = (env) => {
  // Configuration in common to both client-side and server-side bundles
  var isDevBuild = !(env && env.prod);

  const sharedConfig = {
    stats: { modules: false },
    context: __dirname,
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [new TsConfigPathsPlugin()]
    },
    output: {
      filename: '[name].js',
      publicPath: 'app/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
    },
    module: {
      rules: [
        { test: /\.ts$/, use: isDevBuild ? ['awesome-typescript-loader?silent=true', 'angular2-template-loader'] : '@ngtools/webpack' },
        { test: /\.html$/, use: 'html-loader?minimize=false' },
        //{ test: /\.css$/, include: /flex\/assets/, use: ['style-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize'] },
        { test: /\.css$/, use: ['to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize'] },
        { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
      ]
    },
    plugins: [
      new CheckerPlugin()
    ]
  };

  // Configuration for client-side bundle suitable for running in browsers
  const clientBundleOutputDir = './wwwroot/app';
  const clientBundleConfig = merge(sharedConfig, {
    entry: { 'app': './client/boot.ts' },
    output: { path: path.join(__dirname, clientBundleOutputDir) },
    plugins: [
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: require('./wwwroot/app/vendor-manifest.json')
      }),
      new webpack.SourceMapDevToolPlugin({
        filename: '[file].map', // Remove this line if you prefer inline source maps
        moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
      })
    ]
  });

  return [clientBundleConfig];
};
