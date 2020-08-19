import React from 'react';
import { shallow } from 'enzyme';
import FindPeople from './FindPeople';

describe('<FindPeople />', () => {
  let component;

  beforeEach(() => {
    component = shallow(<FindPeople />);
  });

  test('It should mount', () => {
    expect(component.length).toBe(1);
  });
});
