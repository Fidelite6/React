import React from "react";
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({adapter: new Adapter()});

describe('NavigationItems', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems/>);
  });

  it('should render tho NavigationItem elements if not Authenticated', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render three NavigationItem elements if Authenticated', () => {
    wrapper.setProps({isAuth: true});
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should render log out navigation items if Authenticated', () => {
    wrapper.setProps({isAuth: true});
    expect(wrapper.contains(<NavigationItem link="/logout">Log Out</NavigationItem>)).toEqual(true);
  });
});
