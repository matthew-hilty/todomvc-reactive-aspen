var cacheAppData, compose, composing, connect, editAppState, endEditing, extractNewTodo, filteringEnter, filteringEscape, mapping, nodes, onValue, plugIntoTerminus, removeCompletedTodos, removeTodo, restoreOrigTitle, saveCurrentTitle, storeCookie, storeTitle, toggleAllTodos, toggleTodo, transforms, _ref, _ref1, _ref2;

compose = require('../utilities').compose;

_ref = require('../vendor/Controller'), connect = _ref.connect, onValue = _ref.onValue, plugIntoTerminus = _ref.plugIntoTerminus;

_ref1 = require('../vendor/Pando').transforms, composing = _ref1.composing, mapping = _ref1.mapping;

_ref2 = require('./transforms'), cacheAppData = _ref2.cacheAppData, editAppState = _ref2.editAppState, endEditing = _ref2.endEditing, extractNewTodo = _ref2.extractNewTodo, filteringEnter = _ref2.filteringEnter, filteringEscape = _ref2.filteringEscape, removeCompletedTodos = _ref2.removeCompletedTodos, removeTodo = _ref2.removeTodo, toggleAllTodos = _ref2.toggleAllTodos, toggleTodo = _ref2.toggleTodo, restoreOrigTitle = _ref2.restoreOrigTitle, saveCurrentTitle = _ref2.saveCurrentTitle, storeCookie = _ref2.storeCookie, storeTitle = _ref2.storeTitle;

nodes = ['$clear-clicks', '$delete-clicks', '$new-todo-keydowns', '$toggle-all-clicks', '$toggle-clicks', '$edit-blurs', '$edit-keydowns', '$edit-keydowns'];

transforms = [mapping(removeCompletedTodos), mapping(removeTodo), compose([filteringEnter, mapping(extractNewTodo)]), mapping(toggleAllTodos), mapping(toggleTodo), mapping(endEditing(saveCurrentTitle)), compose([filteringEnter, mapping(endEditing(saveCurrentTitle))]), compose([filteringEscape, mapping(endEditing(restoreOrigTitle))])];

connect(nodes, 'cacher', function() {
  return transforms;
});

connect('cacher', 'cookieManager', function() {
  return composing(cacheAppData);
});

plugIntoTerminus('cookieManager', function() {
  return composing(storeCookie);
});

plugIntoTerminus('$todo-label-doubleclicks', function() {
  return mapping(editAppState);
});

onValue('todo-in-edit', function(capsule) {
  return storeTitle(capsule.event.target.value);
});
