var jsDev = () => {
  return gulp
    .src(`${srcDir}/js/**/*.js`)
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(sourcemaps.write(`./maps`))
    .pipe(gulp.dest(`${distDir}/js`));
};

var jsBuild = () => {
  return gulp
    .src(`${srcDir}/js/**/*.js`)
    .pipe(
      babel({
        presets: ["env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(`${distDir}/js`));
};
