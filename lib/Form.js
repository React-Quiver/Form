'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _MuiThemeProvider = require('material-ui/styles/MuiThemeProvider');

var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);

var _DatePicker = require('material-ui/DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

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
          style: { marginTop: -15, width: '100%' },
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
    key: 'getColorStyle',
    value: function getColorStyle(color) {
      if (color) {
        return {
          hintStyle: { color: color },
          inputStyle: { color: color },
          floatingLabelStyle: { color: color },
          floatingLabelFocusStyle: { color: color },
          style: { color: color },
          textareaStyle: { color: color },
          underlineFocusStyle: { color: color, background: color },
          underlineStyle: { color: color, background: color }
        };
      }

      return {};
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
              case 'DatePicker':
                JSX.push(_react2.default.createElement(
                  'div',
                  { style: _styles2.default.container, key: field.key },
                  _react2.default.createElement(_DatePicker2.default, _extends({}, _this2.getColorStyle(_this2.props.color), {
                    value: field.value,
                    hintText: field.hintText,
                    floatingLabelFixed: true,
                    floatingLabelText: field.labelText,
                    onChange: function onChange(e, date) {
                      return save(k, date);
                    },
                    style: { marginTop: -20, width: '100%', color: 'white' }
                  }))
                ));
                break;
              case 'TextField':
                JSX.push(_react2.default.createElement(
                  'div',
                  { style: _styles2.default.container, key: field.key },
                  _react2.default.createElement(_TextField2.default, _extends({}, _this2.getColorStyle(_this2.props.color), {
                    disabled: field.disabled,
                    type: field.type,
                    floatingLabelFixed: true,
                    floatingLabelText: field.labelText,
                    hintText: field.hintText,
                    value: field.value,
                    style: { marginTop: -20, width: '100%', color: 'white' },
                    onChange: function onChange(e) {
                      return save(k, e.target.value);
                    },
                    errorText: field.error
                  }))
                ));
                break;
              case 'SelectField':
                JSX.push(_react2.default.createElement(
                  'div',
                  { style: _styles2.default.container, key: field.key },
                  _this2.getSelectField(k, field)
                ));
                break;
              case 'Checkbox':
                JSX.push(_react2.default.createElement(
                  'div',
                  { style: _styles2.default.container, key: field.key },
                  _react2.default.createElement(_Checkbox2.default, {
                    key: field.key,
                    style: { width: '100%' },
                    label: field.labelText,
                    value: field.value,
                    onCheck: function onCheck(e, value) {
                      save(k, value);
                    }
                  })
                ));
                break;
              case 'Toggle':
                JSX.push(_react2.default.createElement(
                  'div',
                  { style: _styles2.default.container, key: field.key },
                  _react2.default.createElement(_Toggle2.default, {
                    key: field.key,
                    label: field.labelText,
                    disabled: field.disabled,
                    labelPosition: 'right',
                    value: field.value,
                    style: _styles2.default.toggle,
                    onToggle: function onToggle(event, value) {
                      save(k, value);
                    }
                  })
                ));
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
  save: _react.PropTypes.func,
  color: _react.PropTypes.string
};
Form.contextTypes = {
  muiTheme: _react.PropTypes.object.isRequired
};
exports.default = Form;
module.exports = exports['default'];