var AppBody, AppFooter, AppHeader, TodoApp, countCompleted, countReducer, div, headerHasFocus;

AppBody = require('./body');

AppFooter = require('./footer');

AppHeader = require('./header');

div = require('../vendor/DOM').div;

countCompleted = function(todos) {
  return todos.reduce(countReducer, 0);
};

countReducer = function(count, todo) {
  if (todo.completed) {
    return count + 1;
  } else {
    return count;
  }
};

headerHasFocus = function(editing) {
  return editing === null;
};

TodoApp = function(appState) {
  var allCompleted, completedCount, editing, fullCount, mode, todos;
  editing = appState.editing, mode = appState.mode, todos = appState.todos;
  completedCount = countCompleted(todos);
  fullCount = todos.length;
  allCompleted = completedCount === fullCount;
  return div(null, AppHeader(headerHasFocus(editing)), AppBody(appState, allCompleted), AppFooter(mode, fullCount, completedCount));
};

module.exports = TodoApp;
