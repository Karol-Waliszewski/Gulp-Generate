// NPM Modules
const { install } = require("pkg-install");
const path = require("path");
const fs = require("fs");

const GENERATE_DIR = function(dir) {
  return path.join(process.cwd(), dir);
};

const DOES_DIR_EXISTS = function(dir) {
  return fs.existsSync(GENERATE_DIR(dir));
};

const CREATE_DIR = function(dir) {
  let directory = GENERATE_DIR(dir);
  fs.mkdirSync(directory);
};

const OVERRIDE_DIR = function(dir) {
  let directory = GENERATE_DIR(dir);

  fs.rmdirSync(directory, { recursive: true });
  fs.mkdirSync(directory);
};

const COPY_FILES = function(dir) {
  let directory = GENERATE_DIR(dir);
};

module.exports = {
  dirExists: DOES_DIR_EXISTS,
  createDir: CREATE_DIR,
  overrideDir: OVERRIDE_DIR
};
