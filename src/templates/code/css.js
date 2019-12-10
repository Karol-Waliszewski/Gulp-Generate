var cssDev = () => {
    return gulp
      .src(`${srcDir}/styles/**/*.css`)
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write(`./maps`))
      .pipe(gulp.dest(`${distDir}/styles`))
      .pipe(browserSync.stream());
  };
  
  var cssBuild = () => {
    return gulp
      .src(`${srcDir}/styles/**/*.css`)
      .pipe(
        purify([`${srcDir}/js/**/*.js`, `${srcDir}/**/*.html`], {
          minify: true
        })
      )
      .pipe(gulp.dest(`${distDir}/styles`))
      .pipe(browserSync.stream());
  };
  