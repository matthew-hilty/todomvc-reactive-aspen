var compose, composeReducer, extend, identity, isArray, isObject, pluralize, set, shallowCopy, signposts, store, stringify, uuid, _uuid,
  __slice = [].slice,
  __hasProp = {}.hasOwnProperty,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

compose = function(fns) {
  return fns.reduceRight(composeReducer);
};

composeReducer = function(composedFn, fn) {
  return function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return fn(composedFn.apply(null, args));
  };
};

extend = function() {
  var base, key, obj, objects, _i, _len;
  base = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  for (_i = 0, _len = objects.length; _i < _len; _i++) {
    obj = objects[_i];
    for (key in obj) {
      if (!__hasProp.call(obj, key)) continue;
      base[key] = obj[key];
    }
  }
  return base;
};

identity = function(val) {
  return val;
};

isArray = function(val) {
  if (Array.isArray) {
    return Array.isArray(val);
  } else {
    return val instanceof Array;
  }
};

isObject = function(val) {
  return Object.prototype.toString.call(val) === '[object Object]';
};

pluralize = function(count, word) {
  if (count === 1) {
    return word;
  } else {
    return word + 's';
  }
};

set = function(key, prop, compositeValue) {
  var copy;
  copy = shallowCopy(compositeValue);
  copy[key] = prop;
  return copy;
};

shallowCopy = function(val) {
  var copy, key, prop;
  switch (false) {
    case !isObject(val):
      copy = {};
      for (key in val) {
        if (!__hasProp.call(val, key)) continue;
        prop = val[key];
        copy[key] = prop;
      }
      return copy;
    case !isArray(val):
      return val.map(identity);
    default:
      return val;
  }
};

store = function(namespace, data) {
  if (data) {
    localStorage.setItem(namespace, stringify(data));
    return data;
  }
  data = localStorage.getItem(namespace);
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

_uuid = function(i, j) {
  var nbr;
  nbr = (function() {
    switch (i) {
      case 12:
        return 4;
      case 16:
        return j & 3 | 8;
      default:
        return j;
    }
  })();
  return nbr.toString(16);
};

uuid = function() {
  var i, id, random, _i;
  id = '';
  for (i = _i = 0; _i < 32; i = ++_i) {
    random = Math.random() * 16 | 0;
    if (__indexOf.call(signposts, i) >= 0) {
      id += '-';
    }
    id += _uuid(i, random);
  }
  return id;
};

signposts = [8, 12, 16, 20];

stringify = JSON.stringify;

module.exports = {
  compose: compose,
  extend: extend,
  pluralize: pluralize,
  set: set,
  store: store,
  uuid: uuid
};
