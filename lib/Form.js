'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Checkbox = require('material-ui/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _SelectField = require('material-ui/SelectField');

var _SelectField2 = _interopRequireDefault(_SelectField);

var _MenuItem = require('material-ui/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _Toggle = require('material-ui/Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _styles = require('./styles');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// material-ui


// styles


var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
  }

  _createClass(Form, [{
    key: 'getSelectField',
    value: function getSelectField(k, item) {
      var save = this.props.save;

      var JSX = [];

      for (var q in item.dataSource) {
        if (item.dataSource.hasOwnProperty(q)) {
          var datum = item.dataSource[q];
          JSX.push(_react2.default.createElement(_MenuItem2.default, {
            key: q,
            value: datum,
            primaryText: datum
          }));
        }
      }

      return _react2.default.createElement(
        _SelectField2.default,
        {
          key: item._key,
          value: item.value,
          onChange: function onChange(event, index, value) {
            save(k, value);
          },
          floatingLabelText: item.labelText
        },
        JSX
      );
    }
  }, {
    key: 'generateFormFields',
    value: function generateFormFields() {
      var _this2 = this;

      var _props = this.props,
          form = _props.form,
          save = _props.save;

      var JSX = [];

      var _loop = function _loop(k) {
        if (form.hasOwnProperty(k)) {
          var field = form[k];
          if (field.display !== false) {
            switch (field.component) {
              case 'TextField':
                JSX.push(_react2.default.createElement(_TextField2.default, {
                  disabled: field.disabled,
                  key: field.key,
                  type: field.type,
                  floatingLabelFixed: true,
                  floatingLabelText: field.labelText,
                  hintText: field.hintText,
                  value: field.value,
                  onChange: function onChange(e) {
                    return save(k, e.target.value);
                  },
                  errorText: field.error
                }));
                JSX.push(_react2.default.createElement('br', null));
                break;
              case 'SelectField':
                JSX.push(_this2.getSelectField(k, field));
                break;
              case 'Checkbox':
                JSX.push(_react2.default.createElement('br', null));
                JSX.push(_react2.default.createElement(_Checkbox2.default, {
                  key: field.key,
                  style: { width: '100%' },
                  label: field.labelText,
                  value: field.value,
                  onCheck: function onCheck(e, value) {
                    save(k, value);
                  }
                }));
                break;
              case 'Toggle':
                JSX.push(_react2.default.createElement('br', null));
                JSX.push(_react2.default.createElement(_Toggle2.default, {
                  key: field.key,
                  label: field.labelText,
                  disabled: field.disabled,
                  labelPosition: 'right',
                  value: field.value,
                  style: _styles2.default.toggle,
                  onToggle: function onToggle(event, value) {
                    save(k, value);
                  }
                }));
                break;
              default:
            }
          }
        }
      };

      for (var k in form) {
        _loop(k);
      }

      return JSX;
    }
  }, {
    key: 'render',
    value: function render() {
      var title = this.props.title;

      return _react2.default.createElement(
        _MuiThemeProvider2.default,
        { muiTheme: this.context.muiTheme },
        _react2.default.createElement(
          'div',
          null,
          title ? _react2.default.createElement(
            'h3',
            null,
            title
          ) : null,
          this.generateFormFields()
        )
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  title: _react.PropTypes.string,
  form: _react.PropTypes.object,
  save: _react.PropTypes.func
};
Form.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = Form;
module.exports = exports['default'];