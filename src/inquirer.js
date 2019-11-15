// Modules
const inquirer = require("inquirer");
const args = require("./arguments");

// Questions
var template = {
  type: "list",
  name: "template",
  message: "What template do you want to use?",
  choices: ["Classic", "Custom"],
  filter: function(val) {
    return val.toLowerCase();
  }
};

var addons = {
  type: "checkbox",
  name: "addons",
  message: "Choose what you need:",
  choices: ["sass", "less", "typescript"],
  // Executing only if previos template is set on "custom"
  when: (response) => (response.template == "custom") ? true : false
};

var project_name = {
  type: "input",
  name: "project_name",
  message: "What's name of your project?",
  default: "",
  validate: function(input) {
    if (/^([A-Za-z\-\_\d])+$/.test(input) && input.length > 0) return true;
    else
      return "Project name may only include letters, numbers, underscores and hashes.";
  },
  when: () => (args.getProjectName()) ? false : true
};

const QUESTIONS = [template, addons, project_name];

const PROMPT = inquirer.createPromptModule();

module.exports = () => PROMPT(QUESTIONS);
