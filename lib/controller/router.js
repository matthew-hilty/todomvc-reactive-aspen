var $router_hyphen_events, NAMESPACE, connect, getEventStream, getLink, mapping, modes, push, resetMode, router, setModeTo, updateMode, _ref;

_ref = require('../vendor/Controller'), connect = _ref.connect, getEventStream = _ref.getEventStream, push = _ref.push;

mapping = require('../vendor/Pando').transforms.mapping;

NAMESPACE = require('../namespace');

resetMode = require('../model/appState').resetMode;

getLink = function(href) {
  return document.querySelector("[href='" + href + "']");
};

setModeTo = function(type) {
  return function() {
    return push($router_hyphen_events, modes[type]);
  };
};

updateMode = function(capsule) {
  return function(appState) {
    return resetMode(appState, capsule.mode);
  };
};

$router_hyphen_events = getEventStream('$router-events');

$router_hyphen_events.subscribe(function(capsule) {
  var link;
  link = getLink(capsule.href);
  if (link) {
    return link.blur();
  }
});

connect($router_hyphen_events, 'cacher', function() {
  return mapping(updateMode);
});

modes = {
  active: {
    href: '#/active',
    mode: 'active'
  },
  all: {
    href: '#/',
    mode: 'all'
  },
  completed: {
    href: '#/completed',
    mode: 'completed'
  }
};

router = Router({
  '/': setModeTo('all'),
  '/active': setModeTo('active'),
  '/completed': setModeTo('completed')
});

router.init('/');
