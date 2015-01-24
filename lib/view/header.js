var $text, AppHeader, h1, header, todoInput, todosCaption, _ref;

_ref = require('../vendor/DOM'), h1 = _ref.h1, header = _ref.header;

$text = require('../vendor/adapters').$text;

todosCaption = function() {
  return h1(null, 'todos');
};

todoInput = $text('NewTodoInput');

AppHeader = function(hasFocus) {
  return header({
    id: 'header'
  }, todosCaption(), todoInput({
    id: 'new-todo',
    placeholder: 'What needs to be done?',
    onKeyDown: true,
    autoFocus: hasFocus
  }));
};

module.exports = AppHeader;
