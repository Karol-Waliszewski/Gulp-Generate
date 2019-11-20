// Modules
const fs = require("fs");
const path = require("path");

// Partials
const css = require("./templates/partials/css");
const sass = require("./templates/partials/sass");

const GENERATE_CONFIG = function(addons) {
  let config = {};

  // Stylesheets
  if (addons.includes("sass")) {
    config.style = sass;
  } else {
    config.style = css;
  }

  return Object.values(config);
};

const GENERATE_GULPFILE = function(addons) {
  let gulp = GET_GULPFILE();
  let config = GENERATE_CONFIG(addons);
  gulp = REPLACE_FUNCTIONS(gulp, config);
  gulp = REPLACE_REQUIRES(gulp, config);
  gulp = REPLACE_WATCHERS(gulp, config);
  return gulp;
};

const GENERATE_PACKAGE = function(addons) {
  let pckg = GET_PACKAGE();
  let config = GENERATE_CONFIG(addons);
  pckg = REPLACE_PACKAGES(pckg, config);
  return pckg;
};

const REPLACE_FUNCTIONS = function(gulp, config) {
  let functions = "";
  for (let partial of config) {
    functions += partial.code;
  }
  return gulp.replace("FUNCTIONS_REPLACE", functions);
};

const REPLACE_REQUIRES = function(gulp, config) {
  let requires = "";
  for (let partial of config) {
    let req = partial.require;
    if (!req.endsWith(",") && req.length) {
      req += ",";
    }
    if (req.length) {
      requires += req;
      requires += "\n";
    }
  }
  return gulp.replace("REQUIRE_REPLACE", requires);
};

const REPLACE_WATCHERS = function(gulp, config) {
  let watchers = "";
  for (let partial of config) {
    if (partial.watch) {
      watchers += partial.watch;
      watchers += "\n";
    }
  }
  return gulp.replace("WATCH_REPLACE", watchers);
};

const REPLACE_PACKAGES = function(package, config) {
  let packages = "";
  for (let partial of config) {
    if (partial.package) {
      let pckg = partial.package;
      if (pckg.startsWith(",")) {
        pckg = pckg.slice(1, pckg.length);
      }
      if (pckg.endsWith(",")) {
        pckg = pckg.slice(0, pckg.length - 1);
      }
      packages = packages + "," + "\n" + pckg;
    }
  }
  return package.replace("PACKAGES_REPLACE", packages);
};

const GET_GULPFILE = function() {
  return fs.readFileSync(
    path.join(__dirname, "./templates/replaces/gulpfile.js"),
    "utf8"
  );
};

const GET_PACKAGE = function() {
  return fs.readFileSync(
    path.join(__dirname, "./templates/replaces/package.json"),
    "utf8"
  );
};

module.exports = {
  generateGulpfile: GENERATE_GULPFILE,
  generatePackage: GENERATE_PACKAGE
};
