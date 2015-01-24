var extend, reset, resetEditing, resetMode, resetProp, resetTodos, set, _ref, _ref1;

_ref = require('../utilities'), extend = _ref.extend, set = _ref.set;

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
  reset: reset,
  resetEditing: resetEditing,
  resetMode: resetMode,
  resetTodos: resetTodos
};
