import React, { Component, PropTypes } from 'react';

// material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Toggle from 'material-ui/Toggle';

// styles
import styles from './styles';

export default class Form extends Component {
  static propTypes = {
    title: PropTypes.string,
    form: PropTypes.object,
    save: PropTypes.func,
    color: PropTypes.string,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  getSelectField(k, item) {
    const { save } = this.props;
    const JSX = [];

    for (const q in item.dataSource) {
      if (item.dataSource.hasOwnProperty(q)) {
        const datum = item.dataSource[q];
        JSX.push(
          <MenuItem
            key={q}
            value={datum}
            primaryText={datum}
          />
        );
      }
    }

    return (
      <SelectField
        style={{ marginTop: -15, width: '100%' }}
        key={item._key}
        value={item.value}
        onChange={(event, index, value) => { save(k, value); }}
        floatingLabelText={item.labelText}
      >
        {JSX}
      </SelectField>
    );
  }

  getColorStyle(color) {
    if (color) {
      return ({
        hintStyle: { color },
        inputStyle: { color },
        floatingLabelStyle: { color },
        floatingLabelFocusStyle: { color },
        style: { color },
        textareaStyle: { color },
        underlineFocusStyle: { color, background: color },
        underlineStyle: { color, background: color },
      });
    }

    return {};
  }

  generateFormFields() {
    const { form, save } = this.props;
    const JSX = [];
    for (const k in form) {
      if (form.hasOwnProperty(k)) {
        const field = form[k];
        if (field.display !== false) {
          switch (field.component) {
            case 'DatePicker':
              JSX.push(
                <div style={styles.container} key = { field.key }>
                  <DatePicker
                    {...this.getColorStyle(this.props.color)}
                    value = { field.value }
                    hintText={field.hintText}
                    floatingLabelFixed
                    floatingLabelText = { field.labelText }
                    onChange={
                      (e, date) => save(k, date)
                    }
                    style={{ marginTop: -20, width: '100%', color: 'white' }}
                  />
                </div>
              );
              break;
            case 'TextField':
              JSX.push(
                <div style={styles.container} key = { field.key }>
                  <TextField
                    {...this.getColorStyle(this.props.color)}
                    disabled = { field.disabled }
                    type = { field.type }
                    floatingLabelFixed
                    floatingLabelText = { field.labelText }
                    hintText = { field.hintText }
                    value = { field.value }
                    style={{ marginTop: -20, width: '100%', color: 'white' }}
                    onChange={
                      (e) => save(k, e.target.value)
                    }
                    errorText = { field.error }
                  />
                </div>
              );
              break;
            case 'SelectField' :
              JSX.push(
                <div style={styles.container} key = { field.key }>
                  {this.getSelectField(k, field)}
                </div>
              );
              break;
            case 'Checkbox':
              JSX.push(
                <div style={styles.container} key = { field.key }>
                  <Checkbox
                    key = { field.key }
                    style={{ width: '100%' }}
                    label={ field.labelText }
                    value={ field.value }
                    onCheck={(e, value) => {
                      save(k, value);
                    }}
                  />
              </div>
              );
              break;
            case 'Toggle':
              JSX.push(
                <div style={styles.container} key = { field.key }>
                  <Toggle
                    key = { field.key }
                    label={ field.labelText }
                    disabled={ field.disabled }
                    labelPosition="right"
                    value={ field.value }
                    style={styles.toggle}
                    onToggle={(event, value) => { save(k, value); }}
                  />
              </div>
              );
              break;
            default:
          }
        }
      }
    }

    return JSX;
  }

  render() {
    const { title } = this.props;
    return (
      <MuiThemeProvider muiTheme={this.context.muiTheme}>
        <div>
          {title ? <h3>{title}</h3> : null}
          {this.generateFormFields()}
        </div>
      </MuiThemeProvider>
    );
  }
}
