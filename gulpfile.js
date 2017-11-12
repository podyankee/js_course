'use strict';

global.$ = {
 
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsVendor: require('./gulp/paths/js.vendor.js'),
    cssVendor: require('./gulp/paths/css.vendor.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  del: require('del'),
  browserSync: require('browser-sync').create(),
  gp: require('gulp-load-plugins')(),
 
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});
$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'pug',
    'js:vendor',
    'js:process',
    'copy:image',
    'copy:font',
    'css:vendor'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));
