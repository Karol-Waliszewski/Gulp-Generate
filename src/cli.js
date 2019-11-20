// NPM Modules
const { install } = require("pkg-install");
const path = require("path");
const fs = require("fs");

// My Modules
const inquirer = require("./inquirer");
const args = require("./arguments");
const builder = require("./builder");
const manager = require("./file_manager");

const init = async function() {
  let answers = await inquirer();

  // If project's name has been chosen by shortcut
  if (!("project_name" in answers)) {
    answers.project_name = args.getProjectName();
  }

  switch (answers.override) {
    case false:
      return false;
    case true:
      manager.overrideDir(answers.project_name);
      break;

    // Undefined
    default:
      manager.createDir(answers.project_name);
      break;
  }

  builder.build();
};

module.exports = {
  init
};
