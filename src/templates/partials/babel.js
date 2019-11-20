const fs = require("fs");
const path = require("path");

const MODULE = {
  require: `babel = require("gulp-babel"),`,
  watch: "gulp.watch(`${srcDir}/js/**/*.js`, jsDev);",
  code: fs.readFileSync(path.join(__dirname, "../code/babel.js"), "utf8"),
  package: `"gulp-babel": "^6.1.2",
  "babel-preset-env": "^1.4.0",`
};

module.exports = MODULE;
