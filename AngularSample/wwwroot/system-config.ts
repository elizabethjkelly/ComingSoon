let packages = {};

let appPackages = [
  'app',
  'rxjs'
];

appPackages.forEach(pkg =>
  packages[pkg] = { main: 'index', defaultExtension: 'js' }
);

let map = {
  // angular bundles
  '@angular/core': 'node_modules/@angular/core/bundles/core.umd.js',
  '@angular/common': 'node_modules/@angular/common/bundles/common.umd.js',
  '@angular/compiler': 'node_modules/@angular/compiler/bundles/compiler.umd.js',
  '@angular/platform-browser': 'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
  '@angular/platform-browser-dynamic': 'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
  '@angular/http': 'node_modules/@angular/http/bundles/http.umd.js',
  '@angular/router': 'node_modules/@angular/router/bundles/router.umd.js',
  '@angular/forms': 'node_modules/@angular/forms/bundles/forms.umd.js',
  '@angular/material': 'node_modules/@angular/material/bundles/material.umd.js',

  'rxjs': "node_modules/rxjs",

  'css-loader': "node_modules/systemjs-plugin-css/css.js"
};

System.config({
  packages: packages,
  map: map,
  paths: {
    "$/*": "app/*/index.js",
    "@*": "*"
  },
  meta: {
    '*.css': { loader: 'css-loader' }
  }
});

System.import('main.js')
  .catch(e => console.error(e));
