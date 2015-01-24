var DOM, getBridge;

DOM = require('./DOM');

getBridge = require('react-bridge');

module.exports = getBridge(DOM);
