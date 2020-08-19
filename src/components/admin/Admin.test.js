import React from 'react';
import { shallow } from 'enzyme';
import Admin from './Admin';

describe('<Admin />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<Admin />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
