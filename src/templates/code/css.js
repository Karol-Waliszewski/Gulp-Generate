var cssDev = () => {
    return gulp
      .src(`${srcDir}/sass/**/*.css`)
      .pipe(sourcemaps.init())
      .pipe(sourcemaps.write(`./maps`))
      .pipe(gulp.dest(`${distDir}/css`))
      .pipe(browserSync.stream());
  };
  
  var cssBuild = () => {
    return gulp
      .src(`${srcDir}/css/**/*.css`)
      .pipe(
        purify([`${srcDir}/js/**/*.js`, `${srcDir}/**/*.html`], {
          minify: true
        })
      )
      .pipe(gulp.dest(`${distDir}/css`))
      .pipe(browserSync.stream());
  };
  