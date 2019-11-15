// Modules
const inquirer = require("./inquirer");
const args = require("./arguments");

const init = function() {
  inquirer().then(answers => {
    // If project's name has been chosen by shortcut
    if (!("project_name" in answers)) {
      answers.project_name = args.getProjectName();
    }
    
    console.log(answers);
  });
};

module.exports = {
  init
};
