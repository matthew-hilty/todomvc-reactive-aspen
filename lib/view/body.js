var $checkbox, $mainToggle, AppBody, TodoItem, getTodoView, getTodosByMode, section, ul, _ref;

$checkbox = require('../vendor/adapters').$checkbox;

getTodosByMode = require('../model/todoList').getTodosByMode;

_ref = require('../vendor/DOM'), section = _ref.section, ul = _ref.ul;

TodoItem = require('./todoItem');

AppBody = function(props, checked) {
  var editing, mode, todoItems, todos;
  editing = props.editing, mode = props.mode, todos = props.todos;
  if (!(todos.length > 0)) {
    return null;
  }
  todoItems = getTodosByMode(todos, mode).map(getTodoView(editing));
  return section({
    id: 'main'
  }, $mainToggle({
    id: 'toggle-all',
    checked: checked,
    onChange: true
  }), ul({
    id: 'todo-list'
  }, todoItems));
};

getTodoView = function(editableID) {
  return function(todo) {
    var editing;
    editing = todo.id === editableID;
    return TodoItem(todo, editing);
  };
};

$mainToggle = $checkbox('ToggleAll');

module.exports = AppBody;
