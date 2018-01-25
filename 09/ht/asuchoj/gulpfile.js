let src = `app`, // папка проекта
  out = `desc`, // папка результат
  css = `${src}/css/*.css`, // все файлы стилей
  script = [`${src}/js/app.js`], // точка входа babel
  scriptDIR = `${src}/js/*.js`, //все скрипты
  html = `${src}/index.html`, // все скрипты
  other = `${src}/img/**`; // остальные файлы

// `npm i -D gulp gulp-newer gulp-sourcemaps gulp-error-notifier gulp-concat-css gulp-clean-css gulp-uglify browser-sync babelify browserify vinyl-source-stream gulp-rename vinyl-buffer gulp-debug gulp-line-ending-corrector del`

const gulp = require(`gulp`),
  newer = require(`gulp-newer`),
  sourcemaps = require(`gulp-sourcemaps`),
  notify = require('gulp-error-notifier').notify,
  concat = require(`gulp-concat-css`),
  cleanCSS = require(`gulp-clean-css`),
  uglify = require('gulp-uglify'),
  browserSync = require(`browser-sync`).create(),
  babelify = require('babelify'),
  browserify = require("browserify"),
  source = require("vinyl-source-stream"),
  rename = require('gulp-rename'),
  buffer = require('vinyl-buffer'),
  lec = require(`gulp-line-ending-corrector`),
  del = require(`del`);

gulp.task(`html`, () => {
  return gulp.src(html)
    .pipe(gulp.dest(out));
});


gulp.task(`copy`, () => {
  return gulp.src(other, {since: gulp.lastRun(`copy`), base: src})
    .pipe(newer(out))
    .pipe(gulp.dest(out));
});



gulp.task(`style`, () => {
  return gulp.src(css)
    .pipe(sourcemaps.init())
    .pipe(concat(`style.css`))
    .pipe(cleanCSS())
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(out));
});

gulp.task(`script`, () => {
  return browserify({
    entries: script
  })
    .transform(babelify.configure({
      presets: [`es2015`]
    }))
    .bundle()
    .on('error', function (err) {
      console.log(err.stack);
      notify(new Error(err));
      this.emit(`end`);
    })
    .pipe(source(`script.js`))
    .pipe(buffer())
    // .pipe(uglify())
    .pipe(lec({verbose:true, eolc: 'CRLF', encoding:'utf8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(out));
});

gulp.task(`clean`, () => del(out));

gulp.task(`render`, gulp.series(`clean`, gulp.parallel(`html`, `copy`, `style`, `script`)));
gulp.task(`watch`, () => {
  gulp.watch(html, gulp.series(`html`));
  gulp.watch(other, gulp.series(`copy`));
  gulp.watch(css, gulp.series(`style`));
  gulp.watch(scriptDIR, gulp.series(`script`));
});

gulp.task(`serve`, () => {
  browserSync.init({
    server: out
  });
  browserSync.watch(out).on(`change`, browserSync.reload);
});

gulp.task(`run`, gulp.series(`render`, gulp.parallel(`watch`, `serve`)));
