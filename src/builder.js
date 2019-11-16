// Modules
const fs = require("fs");
const path = require("path");

// Partials
const css = require("./templates/partials/css");
const sass = require("./templates/partials/sass");

const partials = [css, sass];

const BUILD = function() {
  let config = GET_CONFIG();
  config = REPLACE_FUNCTIONS(config);
  config = REPLACE_REQUIRES(config);
  config = REPLACE_WATCHERS(config);
  console.log(config);
};

const REPLACE_FUNCTIONS = function(config) {
  let functions = "";
  for (let partial of partials) {
    functions += partial.code;
  }
  return config.replace("FUNCTIONS_REPLACE", functions);
};

const REPLACE_REQUIRES = function(config) {
  let requires = "";
  for (let partial of partials) {
    let req = partial.require;
    if (!req.endsWith(",") && req.length) {
      req += ",";
    }
    if (req.length) {
      requires += req;
      requires += "\n";
    }
  }
  return config.replace("REQUIRE_REPLACE", requires);
};

const REPLACE_WATCHERS = function(config) {
  let watchers = "";
  for (let partial of partials) {
    if (partial.watch) {
      watchers += partial.watch;
      watchers += "\n";
    }
  }
  return config.replace("WATCH_REPLACE", watchers);
};

const GET_CONFIG = function() {
  return fs.readFileSync(
    path.join(__dirname, "./templates/workflow/gulpfile.js"),
    "utf8"
  );
};

module.exports = {
  build: BUILD
};
