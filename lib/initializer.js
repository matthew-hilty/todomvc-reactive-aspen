var appNodeId, initialState, initialize, isEmpty, relayEvents, topViewFactory, viewImports, _ref;

_ref = require('./vendor/Aspen'), initialize = _ref.initialize, relayEvents = _ref.relayEvents;

topViewFactory = require('./view/app');

viewImports = require('./view-imports');

isEmpty = function(array) {
  return array.length === 0;
};

appNodeId = 'todoapp';

initialState = JSON.parse(document.getElementById(appNodeId).dataset.appstate);

initialize(appNodeId, topViewFactory, initialState, viewImports);

require('./controller/event-controllers');
