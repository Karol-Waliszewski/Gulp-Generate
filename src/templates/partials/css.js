const fs = require("fs");
const path = require("path");

const MODULE = {
  require: "",
  watch: "gulp.watch(`${srcDir}/css/**/*.css`, cssDev);",
  code: fs.readFileSync(path.join(__dirname, "../code/css.js"), "utf8")
};

module.exports = MODULE;
