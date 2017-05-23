var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component, PropTypes } from 'react';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

// styles
import styles from './styles';

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
          JSX.push(React.createElement(MenuItem, {
            key: q,
            value: datum,
            primaryText: datum
          }));
        }
      }

      return React.createElement(
        SelectField,
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
                JSX.push(React.createElement(TextField, {
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
                JSX.push(React.createElement('br', null));
                break;
              case 'SelectField':
                JSX.push(_this2.getSelectField(k, field));
                break;
              case 'Checkbox':
                JSX.push(React.createElement('br', null));
                JSX.push(React.createElement(Checkbox, {
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
                JSX.push(React.createElement('br', null));
                JSX.push(React.createElement(Toggle, {
                  key: field.key,
                  label: field.labelText,
                  disabled: field.disabled,
                  labelPosition: 'right',
                  value: field.value,
                  style: styles.toggle,
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
      var _props2 = this.props,
          title = _props2.title,
          muiTheme = _props2.muiTheme;

      return React.createElement(
        MuiThemeProvider,
        { muiTheme: muiTheme },
        React.createElement(
          'div',
          null,
          title ? React.createElement(
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
}(Component);

Form.propTypes = {
  muiTheme: PropTypes.object,
  title: PropTypes.string,
  form: PropTypes.object,
  save: PropTypes.func
};
export default Form;