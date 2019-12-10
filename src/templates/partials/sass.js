const fs = require("fs");
const path = require("path");

const MODULE = {
  require: `sass = require("gulp-sass"),`,
  watch: "gulp.watch(`${srcDir}/styles/**/*.scss`, cssDev);",
  code: fs.readFileSync(path.join(__dirname, "../code/sass.js"), "utf8"),
  package: `"gulp-sass": "^3.1.0"`
};

module.exports = MODULE;
