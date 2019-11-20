// Modules
const inquirer = require("inquirer");
const args = require("./arguments");
const manager = require("./file_manager");

// Questions
const TEMPLATE = {
  type: "list",
  name: "template",
  message: "What template do you want to use?",
  choices: [
    { name: "Classic", value: ["babel"] },
    { name: "Sass", value: ["sass", "babel"] },
    { name: "Clean", value: [] },
    { name: "Custom", value: "custom" }
  ]
};

const ADDONS = {
  type: "checkbox",
  name: "addons",
  message: "Choose what you need:",
  choices: ["sass", "babel"],
  // Executing only if previos template is set on "custom"
  when: response => (response.template == "custom" ? true : false)
};

const PROJECT_NAME = {
  type: "input",
  name: "project_name",
  message: "What's name of your project?",
  default: "",
  validate: function(input) {
    if (/^([A-Za-z\-\_\d])+$/.test(input) && input.length > 0) return true;
    else
      return "Project name may only include letters, numbers, underscores and hashes.";
  },
  when: () => (args.getProjectName() ? false : true)
};

var DIR_EXIST = {
  type: "confirm",
  name: "override",
  message: "Directory already exists. Do you want to override?",
  default: false,

  when: response => {
    let dir = response.project_name || args.getProjectName();
    return manager.dirExists(dir);
  }
};

const QUESTIONS = [TEMPLATE, ADDONS, PROJECT_NAME, DIR_EXIST];

const PROMPT = inquirer.createPromptModule();

module.exports = () => PROMPT(QUESTIONS);
