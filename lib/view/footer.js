var $button, $link, AppFooter, activeFilter, allFilter, classSet, clearButton, completedFilter, countSpan, fields, footer, getFilterClassName, getFilterOption, li, noProps, pluralize, span, strong, ul, _ref, _ref1, _ref2;

_ref = require('../vendor/adapters'), $button = _ref.$button, $link = _ref.$link;

classSet = require('../vendor/classSet');

_ref1 = require('../vendor/DOM'), footer = _ref1.footer, li = _ref1.li, span = _ref1.span, strong = _ref1.strong, ul = _ref1.ul;

pluralize = require('../utilities').pluralize;

noProps = null;

AppFooter = function(mode, count, completedCount) {
  if (!(count > 0)) {
    return null;
  }
  return footer({
    id: 'footer'
  }, countSpan(count - completedCount), ul({
    id: 'filters'
  }, allFilter(mode), activeFilter(mode), completedFilter(mode)), clearButton(completedCount));
};

clearButton = function(completedCount) {
  var label;
  if (!(completedCount > 0)) {
    return null;
  }
  label = "Clear completed (" + completedCount + ")";
  return $button('ClearButton')({
    id: 'clear-completed'
  }, label);
};

countSpan = function(count) {
  var activeTodoWord;
  activeTodoWord = pluralize(count, 'item');
  return span({
    id: 'todo-count'
  }, strong(noProps, count), " " + activeTodoWord + " left");
};

getFilterClassName = function(currentMode, filterMode) {
  return classSet({
    selected: currentMode === filterMode
  });
};

getFilterOption = function(_arg) {
  var busLabel, href, linkLabel, mode;
  busLabel = _arg[0], href = _arg[1], linkLabel = _arg[2], mode = _arg[3];
  return function(currentMode) {
    var linkProps;
    linkProps = {
      href: href,
      className: getFilterClassName(mode, currentMode)
    };
    return li(noProps, $link(busLabel)(linkProps, linkLabel));
  };
};

fields = [['ActiveTodos', '#/active', 'Active ', 'active'], ['AllTodos', '#/', 'All ', 'all'], ['CompletedTodos', '#/completed', 'Completed', 'completed']];

_ref2 = fields.map(getFilterOption), activeFilter = _ref2[0], allFilter = _ref2[1], completedFilter = _ref2[2];

module.exports = AppFooter;
