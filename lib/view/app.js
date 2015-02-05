var AppBody, AppFooter, AppHeader, Route, TodoApp, countCompleted, countReducer, div, getRoute, getRouteElement, headerHasFocus, relayEvents;

AppBody = require('./body');

AppFooter = require('./footer');

AppHeader = require('./header');

div = require('../vendor/DOM').div;

relayEvents = require('../vendor/Aspen').relayEvents;

getRouteElement = require('reactive-aspen-route');

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

getRoute = function(mode) {
  switch (mode) {
    case 'active':
      return '/active';
    case 'completed':
      return '/completed';
    default:
      return '/';
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
  Route({
    hash: getRoute(mode),
    onHashChange: true
  });
  return div(null, AppHeader(headerHasFocus(editing)), AppBody(appState, allCompleted), AppFooter(mode, fullCount, completedCount));
};

Route = getRouteElement(relayEvents);

module.exports = TodoApp;
