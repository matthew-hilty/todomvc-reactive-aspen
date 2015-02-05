var NAMESPACE, add, appStateProperty, cacheAppData, changeModeTo, editAppState, editMode, endEditing, extractMode, extractNewTodo, filtering, filteringEnter, filteringEscape, filteringKey, findTodo, recaption, remove, removeCompleted, removeCompletedTodos, removeTodo, reset, resetEditing, resetMode, resetTodos, restoreOrigTitle, saveCurrentTitle, setEventTgtValue, store, storeCookie, storeOrigTitle, storeTitle, toggle, toggleAll, toggleAllTodos, toggleTodo, uuid, _endEditing, _extractNewTodo, _ref, _ref1, _ref2, _ref3;

_ref = require('../model/todoList'), add = _ref.add, recaption = _ref.recaption, remove = _ref.remove, removeCompleted = _ref.removeCompleted, toggle = _ref.toggle, toggleAll = _ref.toggleAll;

_ref1 = require('../model/appState'), reset = _ref1.reset, resetEditing = _ref1.resetEditing, resetMode = _ref1.resetMode, resetTodos = _ref1.resetTodos;

appStateProperty = require('../vendor/Aspen').appStateProperty;

_ref2 = require('../utilities'), store = _ref2.store, uuid = _ref2.uuid;

filtering = require('../vendor/Pando').transforms.filtering;

NAMESPACE = require('../namespace');

cacheAppData = function(appState) {
  store(NAMESPACE, appState);
  return appState;
};

changeModeTo = function(mode) {
  return function() {
    return function(appState) {
      return resetMode(appState, mode);
    };
  };
};

editAppState = function(capsule) {
  return function(appState) {
    var todo;
    todo = findTodo(appState.todos, capsule.id);
    storeOrigTitle(todo.title);
    return resetEditing(appState, capsule.id);
  };
};

editMode = function(capsule) {
  return function(appState) {
    var mode;
    mode = extractMode(capsule);
    return resetMode(appState, mode);
  };
};

_endEditing = function(text, id) {
  return function(appState) {
    var manage, newTodos;
    manage = text ? recaption : remove;
    newTodos = manage(appState.todos, id, text);
    return reset(appState, {
      editing: null,
      todos: newTodos
    });
  };
};

endEditing = function(getText) {
  return function(capsule) {
    var text;
    text = getText();
    setEventTgtValue(capsule, text);
    return _endEditing(text, capsule.id);
  };
};

extractMode = function(capsule) {
  var route;
  route = capsule.event;
  switch (route.slice(1)) {
    case 'active':
      return 'active';
    case 'completed':
      return 'completed';
    default:
      return 'all';
  }
};

_extractNewTodo = function(title) {
  return function(appState) {
    if (!title) {
      return appState;
    }
    return resetTodos(appState, add(appState.todos, title));
  };
};

extractNewTodo = function(capsule) {
  var caption;
  caption = capsule.event.target.value.trim();
  setEventTgtValue(capsule, '');
  return _extractNewTodo(caption);
};

filteringKey = function(key) {
  return filtering(function(capsule) {
    return capsule.event.keyCode === key;
  });
};

findTodo = function(todos, id) {
  var index, todo, _i, _len;
  for (index = _i = 0, _len = todos.length; _i < _len; index = ++_i) {
    todo = todos[index];
    if (todo.id === id) {
      return todo;
    }
  }
};

removeCompletedTodos = function(capsule) {
  return function(appState) {
    return resetTodos(appState, removeCompleted(appState.todos));
  };
};

removeTodo = function(capsule) {
  return function(appState) {
    return resetTodos(appState, remove(appState.todos, capsule.id));
  };
};

_ref3 = (function() {
  var editText, originalText, restoreOrigTitle, saveCurrentTitle, storeOrigTitle, storeTitle;
  editText = null;
  originalText = null;
  restoreOrigTitle = function() {
    return editText = originalText;
  };
  saveCurrentTitle = function() {
    if (editText) {
      return editText.trim();
    } else {
      return editText;
    }
  };
  storeOrigTitle = function(title) {
    return editText = originalText = title;
  };
  storeTitle = function(title) {
    return editText = title;
  };
  return [restoreOrigTitle, saveCurrentTitle, storeOrigTitle, storeTitle];
})(), restoreOrigTitle = _ref3[0], saveCurrentTitle = _ref3[1], storeOrigTitle = _ref3[2], storeTitle = _ref3[3];

setEventTgtValue = function(capsule, text) {
  return capsule.event.target.value = text;
};

storeCookie = function(appState) {
  var value;
  value = encodeURIComponent(JSON.stringify(appState));
  document.cookie = "aspenTodoAppState=" + value;
  return appState;
};

toggleAllTodos = function(capsule) {
  return function(appState) {
    return resetTodos(appState, toggleAll(appState.todos));
  };
};

toggleTodo = function(capsule) {
  return function(appState) {
    return resetTodos(appState, toggle(appState.todos, capsule.id));
  };
};

filteringEnter = filteringKey(13);

filteringEscape = filteringKey(27);

module.exports = {
  cacheAppData: cacheAppData,
  changeModeTo: changeModeTo,
  editAppState: editAppState,
  editMode: editMode,
  endEditing: endEditing,
  extractNewTodo: extractNewTodo,
  filteringEnter: filteringEnter,
  filteringEscape: filteringEscape,
  removeCompletedTodos: removeCompletedTodos,
  removeTodo: removeTodo,
  toggleAllTodos: toggleAllTodos,
  toggleTodo: toggleTodo,
  restoreOrigTitle: restoreOrigTitle,
  saveCurrentTitle: saveCurrentTitle,
  storeCookie: storeCookie,
  storeTitle: storeTitle
};
