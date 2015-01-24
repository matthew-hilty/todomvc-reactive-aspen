var activate, active, complete, completed, create, modifyCompletedStatus, recaption, set, toggle, uuid, _ref;

_ref = require('../utilities'), set = _ref.set, uuid = _ref.uuid;

active = function(todo) {
  return !todo.completed;
};

completed = function(todo) {
  return todo.completed;
};

create = function(title) {
  return {
    completed: false,
    id: uuid(),
    title: title
  };
};

modifyCompletedStatus = function(fn) {
  return function(todo) {
    return set('completed', fn(todo), todo);
  };
};

recaption = function(todo, newTitle) {
  return set('title', newTitle, todo);
};

activate = modifyCompletedStatus(function() {
  return false;
});

complete = modifyCompletedStatus(function() {
  return true;
});

toggle = modifyCompletedStatus(function(todo) {
  return !todo.completed;
});

module.exports = {
  active: active,
  activate: activate,
  complete: complete,
  completed: completed,
  create: create,
  recaption: recaption,
  toggle: toggle
};
