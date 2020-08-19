import React from 'react';
import { shallow } from 'enzyme';
import SocialLogin from './SocialLogin';

describe('<SocialLogin />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<SocialLogin />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
