import React from 'react';
import { shallow } from 'enzyme';
import SinglePost from './SinglePost';

describe('<SinglePost />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SinglePost />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
