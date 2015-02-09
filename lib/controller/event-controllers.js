var changeModeTo, compose, composing, connect, editAppState, editMode, endEditing, extractNewTodo, filteringEnter, filteringEscape, mapping, nodes, onValue, penultimateNodes, penultimateTransforms, plugIntoTerminus, removeCompletedTodos, removeTodo, restoreOrigTitle, saveCurrentTitle, storeTitle, synchronizeDb, toggleAllTodos, toggleTodo, transforms, _ref, _ref1, _ref2;

compose = require('../utilities').compose;

_ref = require('../vendor/Controller'), connect = _ref.connect, onValue = _ref.onValue, plugIntoTerminus = _ref.plugIntoTerminus;

_ref1 = require('../vendor/Pando').transforms, composing = _ref1.composing, mapping = _ref1.mapping;

_ref2 = require('./transforms'), changeModeTo = _ref2.changeModeTo, editAppState = _ref2.editAppState, editMode = _ref2.editMode, endEditing = _ref2.endEditing, extractNewTodo = _ref2.extractNewTodo, filteringEnter = _ref2.filteringEnter, filteringEscape = _ref2.filteringEscape, synchronizeDb = _ref2.synchronizeDb, removeCompletedTodos = _ref2.removeCompletedTodos, removeTodo = _ref2.removeTodo, restoreOrigTitle = _ref2.restoreOrigTitle, toggleAllTodos = _ref2.toggleAllTodos, toggleTodo = _ref2.toggleTodo, saveCurrentTitle = _ref2.saveCurrentTitle, storeTitle = _ref2.storeTitle;

nodes = ['$clear-clicks', '$delete-clicks', '$new-todo-keydowns', '$toggle-all-clicks', '$toggle-clicks', '$edit-blurs', '$edit-keydowns', '$edit-keydowns'];

transforms = [mapping(removeCompletedTodos), mapping(removeTodo), compose([filteringEnter, mapping(extractNewTodo)]), mapping(toggleAllTodos), mapping(toggleTodo), mapping(endEditing(saveCurrentTitle)), compose([filteringEnter, mapping(endEditing(saveCurrentTitle))]), compose([filteringEscape, mapping(endEditing(restoreOrigTitle))])];

penultimateNodes = ['$todo-label-doubleclicks', '$hash-events', 'dbSynchronizer', '$active-todos', '$all-todos', '$completed-todos'];

penultimateTransforms = [mapping(editAppState), mapping(editMode), composing(synchronizeDb), mapping(changeModeTo('active')), mapping(changeModeTo('all')), mapping(changeModeTo('completed'))];

connect(nodes, 'dbSynchronizer', function() {
  return transforms;
});

plugIntoTerminus(penultimateNodes, function() {
  return penultimateTransforms;
});

onValue('todo-in-edit', function(capsule) {
  return storeTitle(capsule.event.target.value);
});
