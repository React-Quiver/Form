import React from 'react';
import ReactDOM from 'react-dom';
import Playground from 'component-playground';
import Form from '../src';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const FormExample = require('raw!../src/Form.example');

const Index = () => (
  <div className="component-documentation">
    <Playground codeText={FormExample} scope={{ React, Form }} />
  </div>
);

ReactDOM.render(<Index />, document.getElementById('root'));

if (__ONBUILD_REACT_PERF__) {
  window.Perf = require('react-addons-perf');
}
