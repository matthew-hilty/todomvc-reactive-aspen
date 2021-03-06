'use strict';

var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser')();
var createAppState = require('./lib/model/appState').create;
var express        = require('express');
var fs             = require('fs');
var http           = require('http');
var mongodb        = require('mongodb');
var path           = require('path');
var Promise        = require('bluebird');
var React          = require('./lib/vendor/React');
var TodoApp        = require('./lib/view/app');
var uuid           = require('./lib/utilities').uuid;

var app              = express();
var appPlaceholder   = '$TODOAPP$';
var cookie           = { Cookie: 'aspenID=spindown-prevention' };
var herokuHost       = 'todomvc-reactive-aspen.herokuapp.com';
var isProduction     = !!(process.env.NODE_ENV === 'production');
var localDbUri       = 'mongodb://localhost:27017/todoLists';
var port             = process.env.PORT || 4000;
var sevenDays        = 7 * 24 * 60 * 60 * 1000;
var statePlaceholder = '$APPSTATE$';
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var utf8             = { encoding: 'utf8' };

var dbUri    = isProduction ? process.env.MONGOLAB_URI : localDbUri;
var host     = isProduction ? herokuHost : 'localhost';
var template = fs.readFileSync('./templates/app', utf8);

var httpConfig = { headers: cookie, host: host } 

if (!isProduction) {
  httpConfig.port = port;
}

function closeDB() {
  dbPromise.then(function (db) {
    db.close();
  });
}

function closeDbThenExitProcess() {
  closeDB();
  process.exit();
}

function getAppState(mode, req, res) {
  return getTodos(req, res).then(function (todos) {
    return createAppState({ mode: mode, todos: todos });
  });
}

function getDbTodos(userID) {
  return todoLists.findOneAsync({ userid: userID })
  .then(function (record) {
    return record ? record.todos : getDefaultTodos(userID);
  });
}

function getDefaultTodos(userID) {
  var defaultTodos = [];
  todoLists.insertAsync({ userid: userID, todos: defaultTodos });
  return defaultTodos;
}

function getTodos(req, res) {
  var cookieID = req.cookies.aspenID;
  var userID = cookieID ? cookieID : uuid();
  var todos = cookieID ? getDbTodos(userID) : promisifyDefaultTodos(userID);
  storeIdInCookie(res, userID);
  return todos;
}

function onStart() {
  console.log('Server running on port ' + port + '.');
  preventHerokuSleep();
}

function pingHeroku() {
  http.get(httpConfig);
}

function preventHerokuSleep() {
  var fiveMin = 5 * 60 * 1000;
  setInterval(pingHeroku, fiveMin);
  console.log('Pinging app to prevent spin-down.');
}

function promisifyDefaultTodos(userID) {
  return new Promise(function (resolve, reject) {
    resolve(getDefaultTodos(userID));
  });
}

function renderReactToHtml(mode) {
  return function (req, res) {
    getAppState(mode, req, res).then(function (appState) {
      var appStateStr = JSON.stringify(appState);
      var appMarkup = React.renderToString(TodoApp(appState));
      var html = template.replace(appPlaceholder, appMarkup)
        .replace(statePlaceholder, appStateStr);
      res.send(html);
    });
  };
}

function storeIdInCookie(res, userID) {
  res.cookie('aspenID', userID, { maxAge: sevenDays });
}

function updateTodoList(req, res, next) {
  todoLists.updateAsync(
    { userid: req.params.user_id },
    { $set: { todos: JSON.parse(req.body.todos) }}
  );
  res.end();
}

var Collection  = mongodb.Collection;
var MongoClient = mongodb.MongoClient;

Promise.promisifyAll(Collection.prototype);
Promise.promisifyAll(MongoClient);

var dbPromise = MongoClient.connectAsync(dbUri);
var todoLists = null;

dbPromise.then(function (db) {
  todoLists = db.collection('todoLists');
})

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', cookieParser, renderReactToHtml('all'));
app.patch('/users/:user_id/todos', urlencodedParser, updateTodoList);

process.on('SIGINT',  closeDbThenExitProcess);
process.on('SIGTERM', closeDbThenExitProcess);

app.listen(port, onStart);
