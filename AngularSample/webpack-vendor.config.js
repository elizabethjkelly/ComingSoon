const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');

const treeShakableModules = [
  '@angular/animations',
  '@angular/common',
  '@angular/common/http',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/platform-browser/animations',
  '@angular/router',
  'zone.js',
  'rxjs',

  '@angular/material',
];

const nonTreeShakableModules = [
  'core-js',
  'event-source-polyfill',
  'jquery',
  'hammerjs/hammer',
  'ng2-cookies/cookie',

  'font-awesome/css/font-awesome.min.css',
];
const allModules = treeShakableModules.concat(nonTreeShakableModules);

module.exports = (env) => {
  const extractCSS = new ExtractTextPlugin('vendor.css');
  const isDevBuild = !(env && env.prod);
  const sharedConfig = {
    stats: { modules: false },
    resolve: { extensions: ['.js'] },
    module: {
      rules: [
        { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
      ]
    },
    output: {
      publicPath: 'app/',
      filename: '[name].js',
      library: '[name]_[hash]'
    },
    plugins: [
      // Workaround for https://github.com/angular/angular/issues/11580
      new webpack.ContextReplacementPlugin(/\@angular\b.*\b(bundles|linker)/, path.join(__dirname, './client')),
      new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/, path.resolve(__dirname, 'doesnotexist/')),
      // Workaround for https://github.com/angular/angular/issues/14898
      new webpack.ContextReplacementPlugin(/angular(\\|\/)core(\\|\/)@angular/, path.join(__dirname, './client')),
      // Workaround for https://github.com/stefanpenner/es6-promise/issues/100
      new webpack.IgnorePlugin(/^vertx$/)
    ]
  };

  const clientBundleConfig = merge(sharedConfig, {
    entry: {
      // To keep development builds fast, include all vendor dependencies in the vendor bundle.
      // But for production builds, leave the tree-shakable ones out so the AOT compiler can produce a smaller bundle.
      vendor: isDevBuild ? allModules : nonTreeShakableModules
    },
    output: { path: path.join(__dirname, 'wwwroot', 'app') },
    module: {
      rules: [
        { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
      ]
    },
    plugins: [
      extractCSS,
      new webpack.DllPlugin({
        path: path.join(__dirname, 'wwwroot', 'app', '[name]-manifest.json'),
        name: '[name]_[hash]'
      })
    ].concat(isDevBuild ? [] : [
      new webpack.optimize.UglifyJsPlugin()
    ])
  });

  return [clientBundleConfig];
}
