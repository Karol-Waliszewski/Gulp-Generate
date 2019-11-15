const GET_PROJECT_NAME = function() {
  let [, , project_name] = process.argv;
  return project_name ? project_name : false;
};

module.exports = {
  getProjectName: GET_PROJECT_NAME
};
