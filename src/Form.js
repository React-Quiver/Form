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

export default class Form extends Component {
  static propTypes = {
    muiTheme: PropTypes.object,
    title: PropTypes.string,
    form: PropTypes.object,
    save: PropTypes.func,
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
        key={item._key}
        value={item.value}
        onChange={(event, index, value) => { save(k, value); }}
        floatingLabelText={item.labelText}
      >
        {JSX}
      </SelectField>
    );
  }

  generateFormFields() {
    const { form, save } = this.props;
    const JSX = [];
    for (const k in form) {
      if (form.hasOwnProperty(k)) {
        const field = form[k];
        if (field.display !== false) {
          switch (field.component) {
            case 'TextField':
              JSX.push(
                <TextField
                  disabled = { field.disabled }
                  key = { field.key }
                  type = { field.type }
                  floatingLabelFixed
                  floatingLabelText = { field.labelText }
                  hintText = { field.hintText }
                  value = { field.value }
                  onChange={
                    (e) => save(k, e.target.value)
                  }
                  errorText = { field.error }
                />
              );
              JSX.push(
                <br />
              );
              break;
            case 'SelectField' :
              JSX.push(
                this.getSelectField(k, field)
              );
              break;
            case 'Checkbox':
              JSX.push(
                <br />
              );
              JSX.push(
                <Checkbox
                  key = { field.key }
                  style={{ width: '100%' }}
                  label={ field.labelText }
                  value={ field.value }
                  onCheck={(e, value) => {
                    save(k, value);
                  }}
                />
              );
              break;
            case 'Toggle':
              JSX.push(
                <br />
              );
              JSX.push(
                <Toggle
                  key = { field.key }
                  label={ field.labelText }
                  disabled={ field.disabled }
                  labelPosition="right"
                  value={ field.value }
                  style={styles.toggle}
                  onToggle={(event, value) => { save(k, value); }}
                />
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
    const { title, muiTheme } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          {title ? <h3>{title}</h3> : null}
          {this.generateFormFields()}
        </div>
      </MuiThemeProvider>
    );
  }
}
