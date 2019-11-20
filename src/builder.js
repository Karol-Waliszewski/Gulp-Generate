// Modules
const fs = require("fs");
const path = require("path");

// Partials
const css = require("./templates/partials/css");
const sass = require("./templates/partials/sass");

const partials = [css, sass];

const BUILD = function(dirName) {
  let gulpfile = GENERATE_GULPFILE();
  let package = GENERATE_PACKAGE();
};

const GENERATE_GULPFILE = function() {
  let config = GET_CONFIG();
  config = REPLACE_FUNCTIONS(config);
  config = REPLACE_REQUIRES(config);
  config = REPLACE_WATCHERS(config);
  return config;
};

const GENERATE_PACKAGE = function() {
  let pckg = GET_PACKAGE();
  pckg = REPLACE_PACKAGES(pckg);
  return pckg;
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

const REPLACE_PACKAGES = function(package) {
  let packages = "";
  for (let partial of partials) {
    if (partial.package) {
      let pckg = partial.package.replace(",", "");
      packages = packages + "," + pckg;
      packages += "\n";
    }
  }
  return package.replace("PACKAGES_REPLACE", packages);
};

const GET_CONFIG = function() {
  return fs.readFileSync(
    path.join(__dirname, "./templates/workflow/gulpfile.js"),
    "utf8"
  );
};

const GET_PACKAGE = function() {
  return fs.readFileSync(
    path.join(__dirname, "./templates/workflow/package.json"),
    "utf8"
  );
};

module.exports = {
  build: BUILD,
  generateGulpfile: GENERATE_GULPFILE,
  generatePackage: GENERATE_PACKAGE
};
