import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './SignIn';

describe('<SignIn />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SignIn />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
