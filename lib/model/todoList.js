var activate, active, addTodo, complete, completed, create, getTodosByMode, recaption, recaptionTodo, removeActive, removeCompleted, removeTodo, set, toggle, toggleAll, toggleTodo, _ref;

_ref = require('./todo'), active = _ref.active, activate = _ref.activate, complete = _ref.complete, completed = _ref.completed, create = _ref.create, recaption = _ref.recaption, toggle = _ref.toggle;

set = require('../utilities').set;

addTodo = function(todoList, caption) {
  return todoList.concat(create(caption));
};

getTodosByMode = function(todos, mode) {
  switch (mode) {
    case 'active':
      return removeCompleted(todos);
    case 'all':
      return todos;
    case 'completed':
      return removeActive(todos);
  }
};

recaptionTodo = function(todos, id, caption) {
  return todos.map(function(todo) {
    if (todo.id === id) {
      return recaption(todo, caption);
    } else {
      return todo;
    }
  });
};

removeActive = function(todos) {
  return todos.filter(completed);
};

removeCompleted = function(todos) {
  return todos.filter(active);
};

removeTodo = function(todos, id) {
  return todos.filter(function(todo) {
    return todo.id !== id;
  });
};

toggleTodo = function(todos, id) {
  return todos.map(function(todo) {
    if (todo.id === id) {
      return toggle(todo);
    } else {
      return todo;
    }
  });
};

toggleAll = function(todos) {
  var allCompleted, manage;
  allCompleted = todos.every(completed);
  manage = allCompleted ? activate : complete;
  return todos.map(manage);
};

module.exports = {
  add: addTodo,
  getTodosByMode: getTodosByMode,
  recaption: recaptionTodo,
  removeActive: removeActive,
  removeCompleted: removeCompleted,
  remove: removeTodo,
  toggle: toggleTodo,
  toggleAll: toggleAll
};
