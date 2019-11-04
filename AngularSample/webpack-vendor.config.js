const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const treeShakableModules = [
  '@angular/core',
  '@angular/common',
  '@angular/common/http',
  '@angular/compiler',
  '@angular/forms',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/platform-browser/animations',
  '@angular/animations',
  '@angular/router',
  'zone.js',
  'rxjs',

  '@angular/material'
];

const nonTreeShakableModules = [
  'core-js',
  'reflect-metadata'
];
const allModules = treeShakableModules.concat(nonTreeShakableModules);

module.exports = (env) =>
{
  const extractCSS = new ExtractTextPlugin('vendor.css');
  const isDevBuild = !(env && env.prod);

  const vendorBundleConfig = {
    entry: {
      // To keep development builds fast, include all vendor dependencies in the vendor bundle.
      // But for production builds, leave the tree-shakable ones out so the AOT compiler can produce a smaller bundle.
      //vendor: isDevBuild ? allModules : nonTreeShakableModules
      vendor: allModules
    },
    output: {
      path: path.join(__dirname, 'wwwroot', 'app'),
      filename: '[name].js',
      publicPath: 'app/',
      library: '[name]_[hash]'
    },
    module: {
      rules: [
        { test: /\.css(\?|$)/, use: extractCSS.extract({ use: 'css-loader?minimize' }) },
        { test: /\.(png|woff|woff2|eot|ttf|svg)(\?|$)/, use: 'url-loader?limit=100000' }
      ]
    },
    stats: { modules: false },
    resolve: { extensions: ['.js'] },
    plugins: [
      extractCSS,
      new webpack.DllPlugin({
        path: path.join(__dirname, 'wwwroot', 'app', '[name]-manifest.json'),
        name: '[name]_[hash]'
      })
    ]
  };

  return [vendorBundleConfig];
};
