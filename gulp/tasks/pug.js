'use strict';

module.exports = function() {
  $.gulp.task('pug', function() {
    //var locals = require('../../content.json');
    var fs = require('fs');
    return $.gulp.src('./source/template/pages/*.pug')
      .pipe($.gp.pug({ 
       locals :{
          nav: JSON.parse(fs.readFileSync('./data/navigation.json', 'utf8')),
          content: JSON.parse(fs.readFileSync('./data/content.json', 'utf8')),
          indexSlider: JSON.parse(fs.readFileSync('./data/indexSlider.json', 'utf8')),
          promoNews: JSON.parse(fs.readFileSync('./data/promoNews.json', 'utf8'))
        } 
        //locals: locals
        , pretty: true }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        }
       }))
      .pipe($.gulp.dest($.config.root));
  });
};
