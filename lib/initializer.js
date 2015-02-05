var NAMESPACE, appNodeId, defaultState, initialState, initialize, isEmpty, relayEvents, store, topViewFactory, viewImports, _ref;

defaultState = require('./default-state');

_ref = require('./vendor/Aspen'), initialize = _ref.initialize, relayEvents = _ref.relayEvents;

NAMESPACE = require('./namespace');

store = require('./utilities').store;

topViewFactory = require('./view/app');

viewImports = require('./view-imports');

isEmpty = function(array) {
  return array.length === 0;
};

appNodeId = 'todoapp';

initialState = JSON.parse(document.getElementById(appNodeId).dataset.appstate);

initialize(appNodeId, topViewFactory, initialState, viewImports);

require('./controller/event-controllers');
