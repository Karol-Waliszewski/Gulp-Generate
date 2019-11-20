// NPM Modules
const { install } = require("pkg-install");
const path = require("path");
const chalk = require("chalk");

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

  // Copying static files
  manager.copyDir(
    path.join(__dirname, "./templates/workflow"),
    manager.generateDir(answers.project_name)
  );

  // Generatic dynamic files
  let gulpfile = builder.generateGulpfile();
  let package = builder.generatePackage();

  // Saving dynamic files
  manager.saveFile(path.join(answers.project_name, "gulpfile.js"), gulpfile);
  manager.saveFile(path.join(answers.project_name, "package.json"), package);

  console.log(chalk.bold("Your project has been created successfully!"));
};

module.exports = {
  init
};
