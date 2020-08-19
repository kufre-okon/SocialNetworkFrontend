import React from 'react';
import { shallow } from 'enzyme';
import EditPost from './EditPost';

describe('<EditPost />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<EditPost />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
