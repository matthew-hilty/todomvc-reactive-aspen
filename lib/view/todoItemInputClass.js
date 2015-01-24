var $text, UpdatePostFocusMixin, createClass, todoItemInputClass, _todoItemInput;

createClass = require('../vendor/React').createClass;

$text = require('../vendor/adapters').$text;

UpdatePostFocusMixin = require('../mixins/UpdatePostFocusMixin');

_todoItemInput = function(id) {
  return $text({
    id: id,
    label: 'TodoItemInput'
  });
};

todoItemInputClass = createClass({
  mixins: [UpdatePostFocusMixin],
  render: function() {
    var title, uuid, _ref;
    _ref = this.props, title = _ref.title, uuid = _ref.uuid;
    return _todoItemInput(uuid)({
      className: 'edit',
      defaultValue: title,
      onBlur: true,
      onChange: true,
      onKeyDown: true
    });
  }
});

module.exports = todoItemInputClass;
