// NPM Modules
const { install } = require("pkg-install");
const path = require("path");
const fs = require("fs");

const DOES_DIR_EXISTS = function(dir) {
  return fs.existsSync(path.join(process.cwd(), dir));
};

const CREATE_DIR = function(dir) {
  let directory = path.join(process.cwd(), dir);
  fs.mkdirSync(directory);
};

const OVERRIDE_DIR = function(dir) {
  let directory = path.join(process.cwd(), dir);

  fs.rmdirSync(directory, { recursive: true });
  fs.mkdirSync(directory);
};

const COPY_FILES = function(dir){
    
}

module.exports = {
  dirExists: DOES_DIR_EXISTS,
  createDir: CREATE_DIR,
  overrideDir: OVERRIDE_DIR
};
