var cookieParser = require('cookie-parser');
var defaultState = require('./lib/default-state');
var express      = require('express');
var fs           = require('fs');
var path         = require('path');
var React        = require('react/addons');
var TodoApp      = require('./lib/view/app');

var anchor   = '$TODOAPP$';
var app      = express();
var port     = process.env.port || 4000;
var utf8     = { encoding: 'utf8' };
var template = fs.readFileSync('./index.html', utf8);

function getAppState(req) {
  return JSON.parse(req.cookies.aspenTodoAppState) || defaultState;
}

function onStart() {
  console.log('Server running on port ' + port);
}

function renderReactToHtml(req, res) {
  appState = getAppState(req);
  markup = React.renderToString(TodoApp(appState));
  res.send(template.replace(anchor, markup));
}

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.get('/', renderReactToHtml);
app.get('/index.html', renderReactToHtml);

app.listen(port, onStart);
