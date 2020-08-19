import React from 'react';
import { shallow } from 'enzyme';
import DeleteUser from './DeleteUser';

describe('<DeleteUser />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<DeleteUser />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
