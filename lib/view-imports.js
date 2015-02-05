var blur, blurAndPrevent, todoItemInput;

blur = {
  blur: true
};

blurAndPrevent = {
  blur: true,
  preventDefault: true
};

todoItemInput = 'TodoItemInput';

module.exports = [
  ['$new-todo-keydowns', 'NewTodoInput'], ['$todo-label-doubleclicks', 'TodoItemLabel'], ['$clear-clicks', 'ClearButton'], ['$delete-clicks', 'DeleteButton'], ['$toggle-all-clicks', 'ToggleAll', blur], ['$toggle-clicks', 'Toggle', blur], ['$active-todos', 'ActiveTodos', blurAndPrevent], ['$all-todos', 'AllTodos', blurAndPrevent], ['$completed-todos', 'CompletedTodos', blurAndPrevent], [
    '$hash-events', 'Hash', {
      handler: 'onHashChange'
    }
  ], [
    '$edit-blurs', todoItemInput, {
      handler: 'onBlur'
    }
  ], [
    '$edit-keydowns', todoItemInput, {
      handler: 'onKeyDown'
    }
  ], [
    'todo-in-edit', todoItemInput, {
      handler: 'onChange'
    }
  ]
];
