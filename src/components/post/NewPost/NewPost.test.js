import React from 'react';
import { shallow } from 'enzyme';
import NewPost from './NewPost';

describe('<NewPost />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<NewPost />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
