var NAMESPACE, appNodeId, cachedState, defaultState, initialState, initialize, isEmpty, store, topViewFactory, viewImports;

defaultState = require('./default-state');

initialize = require('./vendor/Aspen').initialize;

NAMESPACE = require('./namespace');

topViewFactory = require('./view/app');

store = require('./utilities').store;

viewImports = require('./view-imports');

isEmpty = function(array) {
  return array.length === 0;
};

appNodeId = 'todoapp';

cachedState = store(NAMESPACE);

initialState = isEmpty(cachedState) ? defaultState : cachedState;

initialize(appNodeId, topViewFactory, initialState, viewImports);

require('./controller/event-controllers');

require('./controller/router');
