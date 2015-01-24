var $button, $checkbox, $label, IDifyAdapter, TodoItem, applyId, classSet, createFactory, div, factories, li, todoItemInputClass, todoItemInputFactory, _ref, _ref1;

_ref = require('../vendor/adapters'), $button = _ref.$button, $checkbox = _ref.$checkbox, $label = _ref.$label;

classSet = require('../vendor/classSet');

createFactory = require('../vendor/React').createFactory;

_ref1 = require('../vendor/DOM'), div = _ref1.div, li = _ref1.li;

todoItemInputClass = require('./todoItemInputClass');

applyId = function(id) {
  return function(adapter) {
    return adapter(id);
  };
};

IDifyAdapter = function(_arg) {
  var adapter, label;
  adapter = _arg[0], label = _arg[1];
  return function(id) {
    return adapter({
      id: id,
      label: label
    });
  };
};

TodoItem = function(todoProps, editing) {
  var $completionToggle, $deleteButton, $todoItemLabel, className, completed, id, title, _ref2;
  completed = todoProps.completed, id = todoProps.id, title = todoProps.title;
  className = classSet({
    completed: completed,
    editing: editing
  });
  _ref2 = factories.map(applyId(id)), $completionToggle = _ref2[0], $deleteButton = _ref2[1], $todoItemLabel = _ref2[2];
  return li({
    key: id,
    className: className
  }, div({
    className: 'view'
  }, $completionToggle({
    className: 'toggle',
    checked: completed,
    onChange: true
  }), $todoItemLabel({
    onDoubleClick: true
  }, title), $deleteButton({
    className: 'destroy',
    onClick: true
  })), todoItemInputFactory({
    autoPostFocus: editing,
    title: title,
    uuid: id
  }));
};

factories = [[$checkbox, 'Toggle'], [$button, 'DeleteButton'], [$label, 'TodoItemLabel']].map(IDifyAdapter);

todoItemInputFactory = createFactory(todoItemInputClass);

module.exports = TodoItem;
