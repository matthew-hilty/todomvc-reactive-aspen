'use strict';

var cookieParser = require('cookie-parser');
var express      = require('express');
var fs           = require('fs');
var http         = require('http');
var path         = require('path');
var React        = require('./lib/vendor/React');
var TodoApp      = require('./lib/view/app');

var app          = express();
var appAnchor    = '$TODOAPP$';
var defaultState = '{"editing":null,"mode":"all","todos":[]}';
var herokuApp    = 'http://todomvc-reactive-aspen.herokuapp.com';
var port         = process.env.PORT || 4000;
var stateAnchor  = '$APPSTATE$';
var utf8         = { encoding: 'utf8' };
var template     = fs.readFileSync('./templates/app', utf8);

function getAppStateStr(mode, req) {
  var cookie = req.cookies.aspenTodoAppState;
  var state  = cookie ? cookie : defaultState;
  return resetMode(mode, state);
}

function onStart() {
  console.log('Server running on port ' + port + '.');
  preventHerokuSleep();
}

function pingHeroku() {
  http.get(herokuApp);
}

function preventHerokuSleep() {
  var fiveMin = 5 * 60 * 1000;
  setInterval(pingHeroku, fiveMin);
  console.log('Pinging app to prevent spin-down.');
}

function renderReactToHtml(mode) {
  return function (req, res) {
    var appStateStr = getAppStateStr(mode, req);
    var appState    = JSON.parse(appStateStr);
    var appMarkup   = React.renderToString(TodoApp(appState));

    var html = template.replace(appAnchor,   appMarkup)
                         .replace(stateAnchor, appStateStr);
    res.send(html);
  };
}

function resetMode(mode, state) {
  return state.replace(/"mode":".*?"/, ('"mode":"' + mode + '"'));
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.get('/active',       renderReactToHtml('active'));
app.get('/completed',    renderReactToHtml('completed'));
app.get('*',             renderReactToHtml('all'));

app.listen(port, onStart);
