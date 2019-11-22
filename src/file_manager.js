// NPM Modules
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

const COPY_DIR = function(source, target) {
  // Creating folder
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }
  // Copying files
  if (fs.lstatSync(source).isDirectory()) {
    let files = fs.readdirSync(source);
    files.forEach(file => {
      let subDir = path.join(source, file);
      if (fs.lstatSync(subDir).isDirectory()) {
        COPY_DIR(subDir, path.join(target, file));
      } else {
        fs.copyFileSync(subDir, path.join(target, file));
      }
    });
  }
};

const SAVE_DYNAMIC_FILE = function(dir, content) {
  fs.writeFileSync(GENERATE_DIR(dir), content);
};

module.exports = {
  dirExists: DOES_DIR_EXISTS,
  createDir: CREATE_DIR,
  overrideDir: OVERRIDE_DIR,
  copyDir: COPY_DIR,
  generateDir: GENERATE_DIR,
  saveFile: SAVE_DYNAMIC_FILE
};
