import React from 'react';
import { shallow } from 'enzyme';
import EditProfile from './EditProfile';

describe('<EditProfile />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<EditProfile />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
