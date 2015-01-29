var cookieParser = require('cookie-parser');
var defaultState = require('./lib/default-state');
var express      = require('express');
var fs           = require('fs');
var http         = require('http');
var isObject     = require('./lib/utilities').isObject;
var path         = require('path');
var React        = require('./lib/vendor/React');
var TodoApp      = require('./lib/view/app');

var anchor    = '$TODOAPP$';
var app       = express();
var herokuApp = 'http://todomvc-reactive-aspen.herokuapp.com'
var port      = process.env.PORT || 4000;
var utf8      = { encoding: 'utf8' };
var template  = fs.readFileSync('./index.html', utf8);

function getAppState(req) {
  var cookie = req.cookies.aspenTodoAppState;
  return cookie ? JSON.parse(cookie) : defaultState;
}

function onStart() {
  console.log('Server running on port ' + port + '.');
  preventHerokuSleep();
  console.log('Pinging app to prevent spin-down.');
}

function pingHeroku() {
  http.get(herokuApp);
}

function preventHerokuSleep() {
  var fiveMin = 5 * 60 * 1000;
  setInterval(pingHeroku, fiveMin);
}

function renderReactToHtml(req, res) {
  var appState = getAppState(req);
  var markup = React.renderToString(TodoApp(appState));
  res.send(template.replace(anchor, markup));
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.get('/', renderReactToHtml);
app.get('/index.html', renderReactToHtml);

app.listen(port, onStart);
