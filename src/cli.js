const inquirer = require("./inquirer");

const init = function() {
  inquirer().then(answers => {
    console.log(answers);
  });
};

module.exports = {
  init
};
