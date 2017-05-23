jest.unmock('../Form');

import React from 'react';
import { shallow } from 'enzyme';

describe('Form', () => {
  it('should work', () => {
    const Form = require('../Form');
    const wrapper = shallow(
      <Form />
    );
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('div').text()).toContain('Hay.');
  });

  it('should render all the card components', () => {
    const Form = require('../Form');
    const wrapper = shallow(
      <Form text="It works!" />
    );

    expect(wrapper.find('div').length).toEqual(1);
    expect(wrapper.find('div').text()).toContain('It works!');
  });
});
