const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      browserSync  = require('browser-sync'),
      babel        = require('gulp-babel'),
      del          = require('del'),
      imagemin     = require('gulp-imagemin'),
      pngquant     = require('imagemin-pngquant'),
      cache        = require('gulp-cache'),
      cssmin       = require('gulp-minify-css'),
      autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', () => {
  return gulp.src('src/sass/**/*.sass')
             .pipe(sass({outputStyle: 'expanded'}))
             .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
             .pipe(gulp.dest('src/css'))
             .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('es6', () => {
  return gulp.src('src/js/src/*.js')
             .pipe(babel({
               presets: ['es2015']
             }))
             .pipe(gulp.dest('src/js/dest'));
});

gulp.task('clean', () => {
  return del.sync('dist');
});

gulp.task('clear', () => {
  return cache.clearAll();
});

gulp.task('img', () => {
  return gulp.src('src/img/**/*')
             .pipe(imagemin({ //Сожмем их
               progressive: true,
               svgoPlugins: [{removeViewBox: false}],
               use: [pngquant()],
               interlaced: true
             }))
             .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', ['browser-sync', 'es6', 'sass'], () => {
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/sass/**/*.sass', ['sass']);
  gulp.watch('src/js/src/*.js', ['es6']);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('build', ['clean', 'sass', 'es6', 'img'], () => {
  let buildCss = gulp.src('src/css/*.css')
      .pipe(cssmin())
      .pipe(gulp.dest('dist/css'));

  let buildFonts = gulp.src('src/css/fonts/**/*')
      .pipe(gulp.dest('dist/css/fonts'));

  let buildImg = gulp.src('src/img/*')
      .pipe(gulp.dest('dist/img'));
      
  let buildJs = gulp.src('src/js/dest/*')
      .pipe(gulp.dest('dist/js/dest'));

  let buildLibs = gulp.src('src/js/libs/*')
      .pipe(gulp.dest('dist/js/libs'));

  let buildHtml = gulp.src('src/*.html')
      .pipe(gulp.dest('dist'));
})