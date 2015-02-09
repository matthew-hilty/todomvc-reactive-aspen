var create, extend, reset, resetEditing, resetMode, resetProp, resetTodos, set, _ref, _ref1;

_ref = require('../utilities'), extend = _ref.extend, set = _ref.set;

create = function(props) {
  var editing, mode, todos;
  editing = props.editing, mode = props.mode, todos = props.todos;
  if (editing == null) {
    editing = null;
  }
  if (mode == null) {
    mode = 'all';
  }
  if (todos == null) {
    todos = [];
  }
  return {
    editing: editing,
    mode: mode,
    todos: todos
  };
};

reset = function(appState, newProps) {
  return extend({}, appState, newProps);
};

resetProp = function(propName) {
  return function(appState, newProp) {
    return set(propName, newProp, appState);
  };
};

_ref1 = ['editing', 'mode', 'todos'].map(resetProp), resetEditing = _ref1[0], resetMode = _ref1[1], resetTodos = _ref1[2];

module.exports = {
  create: create,
  reset: reset,
  resetEditing: resetEditing,
  resetMode: resetMode,
  resetTodos: resetTodos
};
