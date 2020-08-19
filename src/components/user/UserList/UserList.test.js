import React from 'react';
import { shallow } from 'enzyme';
import UserList from './UserList';

describe('<UserList />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<UserList />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
