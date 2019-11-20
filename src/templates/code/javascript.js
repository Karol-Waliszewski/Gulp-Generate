var jsDev = () => {
    return gulp
      .src(`${srcDir}/js/**/*.js`)
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write(`./maps`))
      .pipe(gulp.dest(`${distDir}/js`));
  };
  
  var jsBuild = () => {
    return gulp
      .src(`${srcDir}/js/**/*.js`)
      .pipe(uglify())
      .pipe(gulp.dest(`${distDir}/js`));
  };