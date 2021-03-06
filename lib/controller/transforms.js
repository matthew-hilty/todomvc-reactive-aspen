var add, appStateProperty, changeModeTo, editAppState, editMode, encode, endEditing, extractMode, extractNewTodo, filtering, filteringEnter, filteringEscape, filteringKey, findTodo, getCookie, getPatchConfig, getUrlEncodedTodos, getUserID, host, httpPatch, patchRoute, recaption, remove, removeCompleted, removeCompletedTodos, removeTodo, reset, resetEditing, resetMode, resetTodos, restoreOrigTitle, saveCurrentTitle, setEventTgtValue, storeOrigTitle, storeTitle, synchronizeDb, toggle, toggleAll, toggleAllTodos, toggleTodo, uuid, _endEditing, _extractNewTodo, _ref, _ref1, _ref2, _ref3;

appStateProperty = require('../vendor/Aspen').appStateProperty;

_ref = require('../utilities'), getCookie = _ref.getCookie, httpPatch = _ref.httpPatch, uuid = _ref.uuid;

filtering = require('../vendor/Pando').transforms.filtering;

_ref1 = require('../model/todoList'), add = _ref1.add, recaption = _ref1.recaption, remove = _ref1.remove, removeCompleted = _ref1.removeCompleted, toggle = _ref1.toggle, toggleAll = _ref1.toggleAll;

_ref2 = require('../model/appState'), reset = _ref2.reset, resetEditing = _ref2.resetEditing, resetMode = _ref2.resetMode, resetTodos = _ref2.resetTodos;

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

encode = (function(__i) {
  return encodeURIComponent(JSON.stringify(__i));
});

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

getPatchConfig = function(appState) {
  return {
    data: getUrlEncodedTodos(appState),
    path: patchRoute
  };
};

getUrlEncodedTodos = function(appState) {
  return "todos=" + (encode(appState.todos));
};

getUserID = function() {
  return getCookie('aspenID');
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

synchronizeDb = function(appState) {
  httpPatch(getPatchConfig(appState));
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

host = window.location.host;

patchRoute = "http://" + host + "/users/" + (getUserID()) + "/todos";

module.exports = {
  changeModeTo: changeModeTo,
  editAppState: editAppState,
  editMode: editMode,
  endEditing: endEditing,
  extractNewTodo: extractNewTodo,
  filteringEnter: filteringEnter,
  filteringEscape: filteringEscape,
  removeCompletedTodos: removeCompletedTodos,
  removeTodo: removeTodo,
  restoreOrigTitle: restoreOrigTitle,
  toggleAllTodos: toggleAllTodos,
  toggleTodo: toggleTodo,
  saveCurrentTitle: saveCurrentTitle,
  storeTitle: storeTitle,
  synchronizeDb: synchronizeDb
};
