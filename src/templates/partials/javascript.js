const fs = require("fs");
const path = require("path");

const MODULE = {
  require: "",
  watch: "gulp.watch(`${srcDir}/js/**/*.js`, jsDev);",
  code: fs.readFileSync(path.join(__dirname, "../code/javascript.js"), "utf8")
};

module.exports = MODULE;
