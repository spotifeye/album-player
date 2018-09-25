import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/components/App.jsx';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<App album={{albumImage : ""}}/>);
});

it('renders Albums header', () => {
  const wrapper = shallow(<App album={{albumImage : ""}}/>);
  const Albums = <h3>Albums</h3>;
  expect(wrapper).toContainReact(Albums);
});