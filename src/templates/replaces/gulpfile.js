const gulp = require("gulp"),
  purify = require("gulp-purifycss"),
  sourcemaps = require("gulp-sourcemaps"),
  imagemin = require("gulp-imagemin"),
  mozjpeg = require("imagemin-mozjpeg"),
  optipng = require("imagemin-optipng"),
  uglify = require("gulp-uglify"),
  REQUIRE_REPLACE
  browserSync = require("browser-sync").create();

// ------- EDIT SECTION ------- //

var distDir = "dist",
  buildDir = "docs",
  srcDir = "src",
  assetsDir = "img";

var imageQuality = {
  jpg: 80, // 0 - 100%
  png: 6 // 1 - 7
};

// ----------- END ----------- //

var html = () => {
  return gulp.src(`${srcDir}/**/*.html`).pipe(gulp.dest(distDir));
};

var fonts = () => {
  return gulp.src(`${srcDir}/fonts/**/*.*`).pipe(gulp.dest(`${distDir}/fonts`));
};

var img = () => {
  return gulp
    .src(`${srcDir}/${assetsDir}/**/*.+(jpg|jpeg|png|svg|gif)`)
    .pipe(
      imagemin([
        //svg
        imagemin.svgo({
          plugins: [
            {
              removeViewBox: false
            }
          ]
        }),
        //jpg
        mozjpeg({
          quality: imageQuality.jpg,
          progressive: true
        }),
        //png
        optipng({
          optimizationLevel: imageQuality.png
        })
      ])
    )
    .pipe(gulp.dest(`${distDir}/${assetsDir}`));
};

FUNCTIONS_REPLACE

var server = cb => {
  browserSync.init({
    server: {
      baseDir: distDir
    }
  });
  cb();
};

var watch = () => {
  gulp.watch(`${srcDir}/**/*.html`, html);
  gulp.watch(`${srcDir}/fonts/*.*`, fonts);
  gulp.watch(`${srcDir}/${assetsDir}/**/*.+(jpg|jpeg|png|svg|gif)`, img);
  gulp.watch(`${srcDir}/**/*.+(html|js)`).on("change", browserSync.reload);
  WATCH_REPLACE
};

var setBuild = cb => {
  distDir = buildDir;
  cb();
};

const copy = gulp.parallel(html, fonts, img);
const dev = gulp.series(gulp.parallel(cssDev, jsDev, copy), server, watch);
const build = gulp.series(setBuild, gulp.parallel(cssBuild, jsBuild, copy));
const lite = gulp.series(gulp.parallel(cssDev, jsDev, html,fonts), server, watch);

exports.copy = copy;
exports.dev = dev;
exports.build = build;
exports.lite = lite;

exports.default = dev;
